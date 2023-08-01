import { useMutation } from '@apollo/client';
import { DatePicker, Modal, Input, Button, message, Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { replaceInputMoney } from '../../utils/replaceInputMoney';
import Loader from '../Loader';
import TransformBox from '../TransformBox';
import { UploadBox } from '../UploadBox/UploadBox';

type Props = {
  visible: boolean;
  handleCancel: () => void;
  refetch: () => void;
  isPopup?: boolean;
};

const InputStyle = {
  width: 250,
};

const BANNEER_POSITION = [
  {
    label: '홈 - 상단 배너',
    value: 'TOP',
  },
  {
    label: '홈 - 하단 배너',
    value: 'BOTTOM',
  },
];

type Variables = {
  [index: string]: any;
  endedAt: moment.Moment | null;
  file: any;
  mobileFile: any;
  price: string;
  startedAt: moment.Moment | null;
  url?: string;
  position: string;
};

export default function BannerAddModal({
  handleCancel,
  visible,
  refetch,
  isPopup,
}: Props) {
  const [variables, setVariables] = useState<Variables>({
    endedAt: null,
    file: null,
    mobileFile: null,
    price: '',
    startedAt: null,
    url: '',
    position: 'TOP',
  });

  const handleChangeDate = (e: moment.Moment | null, keyword: string) => {
    setVariables((prev) => {
      if (prev) {
        prev[keyword] = e;
      }
      return { ...prev };
    });
  };

  const handleChangeText = (
    e: React.ChangeEvent<HTMLInputElement>,
    keyword: string,
  ) => {
    setVariables((prev) => {
      if (prev) {
        if (keyword === 'price') {
          prev[keyword] = e.target.value.replace(/\D/g, '');
        } else {
          prev[keyword] = e.target.value;
        }
      }
      return { ...prev };
    });
  };

  const handleChangeBanner = (position: string) =>
    setVariables({ ...variables, position });

  const handleAdd = () => {
    if (!variables.startedAt) {
      return message.error('시작일을 입력해주세요.');
    }
    if (!variables.endedAt) {
      return message.error('종료일을 입력해주세요.');
    }
    if (variables.startedAt.isAfter(variables.endedAt)) {
      return message.error('시작일은 종료일보다 이후일 수 없습니다.');
    }
    if (!variables.price.length) {
      return message.error('가격을 입력해주세요.');
    }
    if (variables.price.split('')[0] === '0') {
      return message.error('올바른 가격을 입력해주세요.');
    }
    if (!variables.file) {
      return message.error(
        `${isPopup ? '팝업' : '배너'} 이미지를 추가해주세요.`,
      );
    }

    if (!variables.mobileFile) {
      return message.error(
        `${isPopup ? '팝업' : '배너'} 모바일 이미지를 추가해주세요.`,
      );
    }
    // 배너 생성 로직
  };

  useEffect(() => {
    if (visible) {
      setVariables({
        endedAt: null,
        file: null,
        mobileFile: null,
        price: '',
        startedAt: null,
        url: '',
        position: '',
      });
    }
  }, [visible, isPopup]);

  return (
    <Modal
      title={`${isPopup ? '팝업' : '배너'} 추가`}
      footer={false}
      width={800}
      open={visible}
      onCancel={handleCancel}
      centered
      bodyStyle={{
        maxHeight: '90vh',
        overflowY: 'auto',
      }}
    >
      {!isPopup && (
        <TransformBox flexDirection="column">
          <h3>배너 위치</h3>
          <Select
            options={BANNEER_POSITION}
            style={InputStyle}
            value={variables.position}
            onChange={handleChangeBanner}
          />
        </TransformBox>
      )}
      <TransformBox flexDirection="column" marginTop="30px">
        <h3>시작일</h3>
        <DatePicker
          style={InputStyle}
          onChange={(e) => handleChangeDate(e, 'startedAt')}
          value={variables.startedAt}
          disabledDate={(date) => date.isBefore(moment().add(-1, 'd'))}
        />
      </TransformBox>
      <TransformBox flexDirection="column" marginTop="30px">
        <h3>종료일</h3>
        <DatePicker
          style={InputStyle}
          onChange={(e) => handleChangeDate(e, 'endedAt')}
          value={variables.endedAt}
          disabledDate={(date) => date.isBefore(moment().add(-1, 'd'))}
        />
      </TransformBox>
      <TransformBox flexDirection="column" marginTop="30px">
        <h3>가격</h3>
        <Input
          style={InputStyle}
          onChange={(e) => handleChangeText(e, 'price')}
          value={replaceInputMoney(variables.price)}
        />
      </TransformBox>
      <TransformBox flexDirection="column" marginTop="30px">
        <h3>url 주소</h3>
        <Input
          style={InputStyle}
          onChange={(e) => handleChangeText(e, 'url')}
          value={variables.url ?? ''}
        />
      </TransformBox>
      <TransformBox flexDirection="column" marginTop="30px">
        <h3>{isPopup ? '팝업' : '배너'} 이미지</h3>
        <UploadBox />
      </TransformBox>

      {!isPopup && (
        <TransformBox flexDirection="column" marginTop="30px">
          <h3>{isPopup ? '팝업' : '배너'} 모바일 이미지</h3>
          <UploadBox />
        </TransformBox>
      )}
      <TransformBox justifyContent="flex-end">
        <Button type="primary" onClick={handleAdd}>
          추가
        </Button>
      </TransformBox>
    </Modal>
  );
}
