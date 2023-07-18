import { useLazyQuery } from '@apollo/client';
import { Divider, Form, Input } from 'antd';
import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import { InquiryDetailModal } from '../../components/InquiryDetailModal';
import { UserDetailModal } from '../../components/UserDetailModal';
import { customerInquiryColumns } from '../../utils/columns/customer.inquiry';
import { CustomTable } from '../../components/CustomTable';
import { pageOptionState } from '../../recoil/atoms/pageOptions';

export function Inquiry() {
  const [open, setOpen] = useState(false);
  const [detailModalopen, setDetailModalopen] = useState(false);
  const [modalData, setModalData] = useState<any>();
  const [inquiryData, setInquiryData] = useState<any[]>([]);
  const [searchWord, setSearchWord] = useState('');

  const [pageOption, setPageOption] = useRecoilState(pageOptionState);

  const handleClickName = (record: any) => {
    setOpen(true);
    setModalData(record);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleRow = (data: any) => {
    setDetailModalopen(true);
    setModalData(data);
  };

  const handleCancelDetail = () => {
    setDetailModalopen(false);
  };

  const handleSearch = (values: { searchWord?: string }) => {
    setSearchWord(values.searchWord ?? '');
    setPageOption({ ...pageOption, skip: 0, current: 1 });
  };

  // pagination
  useEffect(() => {}, [pageOption.take, pageOption.skip]);

  return (
    <>
      <UserDetailModal
        handleCancel={handleCancel}
        open={open}
        email={modalData?.user?.email ?? ''}
      />
      <InquiryDetailModal
        data={modalData}
        open={detailModalopen}
        handleCancel={handleCancelDetail}
        refetch={() => {}}
      />
      <Divider>1:1 문의</Divider>
      <Form layout="inline" onFinish={handleSearch}>
        <Form.Item name="searchWord">
          <Input.Search enterButton placeholder="검색어(문의내용, 닉네임)" />
        </Form.Item>
      </Form>
      <CustomTable
        columns={customerInquiryColumns({ handleClickName })}
        dataSource={inquiryData}
        marginTop={30}
        onRow={(record) => {
          return {
            onClick: () => handleRow(record),
          };
        }}
        // loading={loading}
      />
    </>
  );
}
