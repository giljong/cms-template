import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { deleteTag } from '../deleteTag';
import { Link } from 'react-router-dom';

export type PolicyType = {
  id: number;
  policyKind: {
    name: string;
    id: number;
  };
  content: string;
  admin: {
    name: string;
  };
  createdAt: string;
};

export const policyColumns: ColumnsType<PolicyType> = [
  {
    title: 'no',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: <Link to={'/policy/category'}>약관 종류</Link>,
    key: 'policyCategory',
    dataIndex: 'policyCategory',
    align: 'center',
    render: (val: { name: string }) => {
      return val.name;
    },
  },
  {
    title: '약관 내용',
    key: 'content',
    dataIndex: 'content',
    align: 'center',
    render: (val: string) => {
      return deleteTag(val).length > 40
        ? deleteTag(val).slice(0, 40) + '...'
        : deleteTag(val);
    },
  },
  {
    title: '작성자',
    key: 'admin',
    dataIndex: 'admin',
    align: 'center',
    render: (val) => {
      return val.name;
    },
  },
  {
    title: '생성 일자',
    key: 'createdAt',
    dataIndex: 'createdAt',
    align: 'center',
    render: (val) => {
      return moment(val).format('YYYY-MM-DD HH:mm:ss');
    },
  },
];
