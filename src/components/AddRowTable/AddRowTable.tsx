import { Button, Input, Select } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';

import React from 'react';
import TransformBox from '../TransformBox';
import { PRIMARY } from '../../styles/colors';

type Props = {
  data: any[];
  setData: (value: React.SetStateAction<any[]>) => void;
  loading: boolean;

  handleSave: (idx: number) => () => void;
  handleDelete: (idx: number) => () => void;
};

export function AddRowTable({
  setData,
  data,
  handleDelete,
  loading,
  handleSave,
}: Props) {
  const columns: ColumnsType<any> = [
    {
      title: 'no',
      key: 'id',
      dataIndex: 'id',
      align: 'center',
      render: (_v, _r, idx) => idx + 1,
    },
    {
      title: '종류 이름',
      key: 'name',
      dataIndex: 'name',
      align: 'center',
      render: (val, _record, idx) => {
        return (
          <Input
            value={val}
            onChange={(e) => {
              setData((prev) => {
                prev[idx].name = e.target.value;
                return [...prev];
              });
            }}
            placeholder={
              idx === data.length - 1
                ? '추가하려는 약관 종류를 입력해주세요.'
                : ''
            }
          />
        );
      },
    },

    {
      title: '관리',
      key: 'id',
      dataIndex: 'id',
      align: 'center',
      render: (_v, record, idx) => (
        <TransformBox justifyContent="center">
          <Button type="primary" onClick={handleSave(idx)}>
            저장
          </Button>
          <Button
            style={{
              color: PRIMARY,
              borderColor: PRIMARY,
              marginLeft: 10,
            }}
            onClick={handleDelete(idx)}
          >
            삭제
          </Button>
        </TransformBox>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      loading={loading}
      rowKey={(rec) => rec.id}
    />
  );
}
