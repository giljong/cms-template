import { Button, Divider, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { PolicyDetailModal } from '../../components/PolicyDetailModal';
import TransformBox from '../../components/TransformBox';
import { policyColumns } from '../../utils/columns';
import { pageOptionState } from '../../recoil/atoms/pageOptions';
import { CustomTable } from '../../components/CustomTable';

export function Policy() {
  const [policyData, setPolicyData] = useState<any[]>([]);
  const [policyKind, setPolicyKind] = useState<KindType[]>([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modalData, setModalData] = useState<any>();
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

  const handleSearch = (value: { searchWord?: string }) => {
    setPageOption({ ...pageOption, current: 1, skip: 0 });
    setSearchWord(value.searchWord ?? '');
  };

  // pagination
  useEffect(() => {}, [pageOption.take, pageOption.skip]);

  return (
    <>
      <PolicyDetailModal
        data={modalData}
        handleCancel={handleCancel}
        open={open}
        isEdit={isEdit}
        refetch={() => {}}
        policyKind={policyKind}
      />
      <Divider>약관 관리</Divider>
      <Form layout="inline" onFinish={handleSearch}>
        <Form.Item name="searchWord">
          <Input.Search
            enterButton
            placeholder="검색어(종류, 내용)"
            onSearch={(e) => {
              handleSearch({ searchWord: e });
            }}
          />
        </Form.Item>
      </Form>

      <TransformBox justifyContent="flex-end">
        <Button type="primary" onClick={handleClick}>
          약관 등록
        </Button>
      </TransformBox>

      <CustomTable
        columns={policyColumns}
        dataSource={policyData}
        onRow={(rec) => {
          return {
            onClick: () => handleRow(rec),
          };
        }}
        // loading={loading}
        rowKey={(rec) => rec.id}
        scroll={{ x: 800 }}
        style={{
          marginTop: '30px',
        }}
      />
    </>
  );
}
