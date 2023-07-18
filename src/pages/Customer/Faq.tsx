import { useLazyQuery, useQuery } from '@apollo/client';
import { Button, Divider, Form, Input, Table } from 'antd';
import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import { FaqDetailModal } from '../../components/FaqDetailModal';
import TransformBox from '../../components/TransformBox';
import { faqColumns } from '../../utils/columns';
import { pageOptionState } from '../../recoil/atoms/pageOptions';
import { CustomTable } from '../../components/CustomTable';

export function Faq() {
  const [faqData, setFaqData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modalData, setModalData] = useState<any>();
  const [searchWord, setSearchWord] = useState('');
  const [faqKind, setFaqKind] = useState<KindType[]>([]);

  const [pageOption, setPageOption] = useRecoilState(pageOptionState);

  const handleClick = () => {
    setOpen(true);
    setIsEdit(false);
  };

  const handleRow = (record: any) => {
    setOpen(true);
    setIsEdit(true);
    setModalData(record);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleRefetch = () => {
    // if (refetch) {
    //   refetch({ searchWord, skip, take })
    //     .then((data) => {
    //       setFaqData(data.data.seeFaqHistoryByAdmin.faqs);
    //       setTotalCount(data.data.seeFaqHistoryByAdmin.totalCount);
    //       if (
    //         data.data.seeFaqHistoryByAdmin.faqs.length === 0 &&
    //         data.data.seeFaqHistoryByAdmin.totalCount > 0
    //       ) {
    //         setSkip(skip - take);
    //       }
    //     })
    //     .catch((e) => {
    //       notification.error({ message: e.message });
    //     });
    // }
  };

  const handleSearch = (value: { searchWord?: string }) => {
    // getFaqs({
    //   variables: {
    //     take,
    //     skip: 0,
    //     ...value,
    //   },
    // });
    setPageOption({
      ...pageOption,
      current: 1,
      skip: 0,
    });
    setSearchWord(value.searchWord ?? '');
  };

  // get faq list
  // const [getFaqs, { loading, refetch }] = useLazyQuery<
  //   SeeFaqHistoryByAdminResponse,
  //   SeeFaqHistoryByAdminParams
  // >(SEE_FAQ_HISTORY_BY_ADMIN, {
  //   onCompleted: (data) => {
  //     setFaqData(data.seeFaqHistoryByAdmin.faqs);
  //     setTotalCount(data.seeFaqHistoryByAdmin.totalCount);
  //   },
  //   onError: (e) => {
  //     notification.error({ message: e.message });
  //   },
  //   fetchPolicy: 'no-cache',
  // });

  // get faq kind list
  // useQuery<SeeFaqKindResponse>(SEE_FAQ_KIND, {
  //   onCompleted: (data) => {
  //     setFaqKind(data.seeFaqKind);
  //   },
  //   onError: (e) => {
  //     notification.error({ message: e.message });
  //   },
  //   fetchPolicy: 'no-cache',
  // });

  // pagination
  // useEffect(() => {
  //   getFaqs({
  //     variables: {
  //       skip,
  //       take,
  //       searchWord,
  //     },
  //   });
  // }, [skip, take]);

  return (
    <>
      <FaqDetailModal
        open={open}
        data={modalData}
        handleCancel={handleCancel}
        isEdit={isEdit}
        refetch={handleRefetch}
        faqKind={faqKind}
      />
      <Divider>FAQ</Divider>
      <Form layout="inline" onFinish={handleSearch}>
        <Form.Item name="searchWord">
          <Input.Search
            enterButton
            placeholder="검색어(질문)"
            onSearch={(e) => {
              handleSearch({
                searchWord: e,
              });
            }}
          />
        </Form.Item>
      </Form>
      <TransformBox justifyContent="flex-end">
        <Button type="primary" onClick={handleClick}>
          FAQ 등록
        </Button>
      </TransformBox>
      <CustomTable
        columns={faqColumns}
        dataSource={faqData}
        marginTop={30}
        onRow={(record) => {
          return {
            onClick: () => handleRow(record),
          };
        }}
        // loading={loading}
        rowKey={(rec) => rec.id}
      />
    </>
  );
}
