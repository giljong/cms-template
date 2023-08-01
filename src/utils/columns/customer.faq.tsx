import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { deleteTag } from '../deleteTag';

export const faqColumns: ColumnsType<any> = [
  {
    title: 'no',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: 'FAQ 종류',
    key: 'faqKind',
    dataIndex: 'faqKind',
    align: 'center',
    render: (val) => {
      return val.name;
    },
  },
  {
    title: '질문',
    key: 'question',
    dataIndex: 'question',
    align: 'center',
  },
  {
    title: '답변',
    key: 'answer',
    dataIndex: 'answer',
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
