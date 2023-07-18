import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input } from 'antd';
import { useRecoilState } from 'recoil';
import { useLazyQuery } from '@apollo/client';
import { NoticeDetailModal } from '../../components/NoticeDetailModal';
import TransformBox from '../../components/TransformBox';
import { noticeColumns } from '../../utils/columns';
import { pageOptionState } from '../../recoil/atoms/pageOptions';
import { CustomTable } from '../../components/CustomTable';

export function Notice() {
  const [noticeData, setNoticeData] = useState<any[]>([]);
  const [modalData, setModalData] = useState<any>();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [searchWord, setSearchWord] = useState('');

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

  const handleRefetch = () => {};

  const handleSearch = (value: { searchWord?: string }) => {
    setPageOption({ ...pageOption, skip: 0, current: 1 });
    setSearchWord(value.searchWord ?? '');
  };

  // pagination
  useEffect(() => {}, [pageOption.take, pageOption.skip]);

  return (
    <>
      <NoticeDetailModal
        data={modalData}
        open={open}
        handleCancel={handleCancel}
        isEdit={isEdit}
        refetch={handleRefetch}
      />
      <Divider>공지사항</Divider>
      <Form layout="inline" onFinish={handleSearch}>
        <Form.Item name="searchWord">
          <Input.Search
            enterButton
            placeholder="검색어(제목, 내용)"
            onSearch={(e) => {
              handleSearch({ searchWord: e });
            }}
          />
        </Form.Item>
      </Form>

      <TransformBox justifyContent="flex-end">
        <Button type="primary" onClick={handleClick}>
          공지사항 등록
        </Button>
      </TransformBox>

      <CustomTable
        columns={noticeColumns}
        dataSource={noticeData}
        onRow={(rec) => {
          return {
            onClick: () => handleRow(rec),
          };
        }}
        marginTop={30}
        rowKey={(rec) => rec.id}
        // loading={loading}
      />
    </>
  );
}
