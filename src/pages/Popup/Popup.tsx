import { Button, DatePicker, Divider, Input, message, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { replaceInputMoney } from '../../utils/replaceInputMoney';
import { UploadBox } from '../../components/UploadBox/UploadBox';
import TransformBox from '../../components/TransformBox';
import { useEffect, useState } from 'react';
import { getBannerPositionName } from '../../utils/getBannerPositionName';
import { checkRole } from '../../utils/checkRole';
import { isDesktop } from 'react-device-detect';
import BannerAddModal from '../../components/BannerAddModal/BannerAddModal';
import { FixedButton } from '../../components/FixedButton/FixedButton';
import { CustomTable } from '../../components/CustomTable';

export function Popup() {
  const [bannerData, setBannerData] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);

  const columns: ColumnsType<any> = [
    {
      title: 'no',
      key: 'id',
      dataIndex: 'id',
      align: 'center',
      render: (_v, _r, idx) => idx + 1,
    },
    {
      title: '위치',
      key: 'position',
      dataIndex: 'position',
      align: 'center',
      render: (val) => getBannerPositionName(val),
    },
    {
      title: '기간',
      key: 'period',
      align: 'center',
      render: (_val, record, idx) => {
        return (
          <DatePicker.RangePicker
            value={[record.startedAt, record.endedAt]}
            onChange={(e) => {
              setBannerData((prev: any) => {
                prev[idx].startedAt = e ? moment(e?.[0]) : null;
                prev[idx].endedAt = e ? moment(e?.[1]) : null;
                return [...prev];
              });
            }}
            disabledDate={(date) => date.isBefore(moment().add(-1, 'd'))}
          />
        );
      },
    },
    // {
    //   title: '가격',
    //   key: 'price',
    //   dataIndex: 'price',
    //   align: 'center',
    //   render: (val, _record, idx) => {
    //     return (
    //       <Input
    //         value={replaceInputMoney(val)}
    //         onChange={(e) => {
    //           setBannerData((prev) => {
    //             prev[idx].price = e.target.value.replace(/\D/g, '');
    //             return [...prev];
    //           });
    //         }}
    //       />
    //     );
    //   },
    // },

    {
      title: 'url 주소',
      key: 'url',
      dataIndex: 'url',
      align: 'center',
      render: (val, _record, idx) => {
        return (
          <Input.TextArea
            value={val}
            onChange={(e) => {
              setBannerData((prev: any) => {
                prev[idx].url = e.target.value.replace(/\r?\n|\r/g, '');
                return [...prev];
              });
            }}
            style={{
              height: 100,
              resize: 'none',
            }}
          />
        );
      },
    },
    {
      title: '이미지',
      key: 'image',
      align: 'center',

      render: (val, record, idx) => {
        return (
          <TransformBox flexDirection="column">
            <UploadBox image={bannerData[idx].image} />
          </TransformBox>
        );
      },
    },
    checkRole(['MASTER'], ['WRITE_BANNER'])
      ? {
          title: '관리',
          key: 'save',
          dataIndex: 'id',
          align: 'center',
          render: (_val, _record, idx) => {
            return (
              <TransformBox justifyContent="center">
                <Button
                  type="primary"
                  onClick={handleSave(idx)}
                  style={{
                    marginRight: 10,
                  }}
                >
                  저장
                </Button>
                <Popconfirm
                  okText="삭제"
                  placement="topRight"
                  title="정말 삭제하시겠습니까?"
                  onConfirm={handleDelete(_val)}
                >
                  <Button danger type="primary">
                    삭제
                  </Button>
                </Popconfirm>
              </TransformBox>
            );
          },
        }
      : {},
  ];

  const handleClickAdd = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleRefetch = () => {};

  const handleDelete = (id: number) => () => {
    // 팝업 삭제 로직
  };

  const handleSave = (idx: number) => () => {
    if (!bannerData[idx].startedAt) {
      return message.error('시작일을 설정해주세요.');
    }
    if (!bannerData[idx].endedAt) {
      return message.error('종료일을 설정해주세요.');
    }
    if (!bannerData[idx].price.toString().length) {
      return message.error('가격을 입력해주세요.');
    }
    if (bannerData[idx].price.split('')[0] === '0') {
      return message.error('올바른 가격을 입력해주세요.');
    }
    // 배너 수정 로직
  };

  useEffect(() => {
    // 배너 조회
  }, []);

  return (
    <>
      <BannerAddModal
        visible={visible}
        handleCancel={handleCancel}
        refetch={handleRefetch}
        isPopup
      />
      <Divider>팝업 관리</Divider>
      {checkRole(['MASTER'], ['WRITE_BANNER']) && (
        <>
          {isDesktop ? (
            <TransformBox justifyContent="flex-end">
              <Button type="primary" onClick={handleClickAdd}>
                팝업 추가
              </Button>
            </TransformBox>
          ) : (
            <FixedButton onClick={handleClickAdd} />
          )}
        </>
      )}
      <CustomTable
        columns={columns}
        dataSource={bannerData}
        pagination={false}
        rowKey={(rec) => rec.id}
        scrollWidth={1400}
      />
    </>
  );
}
