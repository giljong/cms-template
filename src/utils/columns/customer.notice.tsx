import { Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { deleteTag } from '../deleteTag';

export const noticeColumns: ColumnsType<any> = [
  {
    title: 'no',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '제목',
    key: 'title',
    dataIndex: 'title',
    align: 'center',
  },
  {
    title: '내용',
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
    title: '고정',
    key: 'isFix',
    dataIndex: 'isFix',
    align: 'center',
    render: (val) => {
      return val ? <Tag color="blue">O</Tag> : <Tag color="error">X</Tag>;
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
