import { useLazyQuery } from '@apollo/client';
import { Divider, Form, Input } from 'antd';
import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import { UserDetailModal } from '../../components/UserDetailModal';
import { userListColumns } from '../../utils/columns';
import { CustomTable } from '../../components/CustomTable';
import { pageOptionState } from '../../recoil/atoms/pageOptions';

export function Users() {
  const [userData, setUserData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<any>();
  const [searchWord, setSearchWord] = useState('');

  const [pageOption, setPageOption] = useRecoilState(pageOptionState);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClickRow = (rec: any) => {
    setModalData(rec);
    setOpen(true);
  };

  const handleSearch = (value: { searchWord?: string }) => {
    // TODO: 검색 로직
    setPageOption({
      ...pageOption,
      current: 1,
      skip: 0,
    });
    setSearchWord(value.searchWord ?? '');
  };

  // pagination
  useEffect(() => {}, [pageOption.skip, pageOption.take]);

  return (
    <>
      <UserDetailModal
        open={open}
        handleCancel={handleCancel}
        email={modalData?.email ?? ''}
      />
      <Divider>회원</Divider>
      <Form layout="inline" onFinish={handleSearch}>
        <Form.Item name="searchWord">
          <Input.Search
            enterButton
            placeholder="검색어(아이디(이메일), 닉네임, 이름, 휴대폰)"
            onSearch={(e) => {
              handleSearch({ searchWord: e });
            }}
          />
        </Form.Item>
      </Form>
      <CustomTable
        marginTop={30}
        columns={userListColumns}
        dataSource={userData}
        // loading={loading}
        onRow={(rec) => {
          return {
            onClick: () => handleClickRow(rec),
          };
        }}
        rowKey={(rec) => rec.email}
      />
    </>
  );
}
