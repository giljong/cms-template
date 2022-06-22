import { ItemType } from 'antd/lib/menu/hooks/useItems';
import {
  CustomerServiceOutlined,
  SecurityScanOutlined,
  LineChartOutlined,
  FormOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

export const menuItems: ItemType[] = [
  {
    label: '대시보드',
    key: 'dashboard',
    icon: <LineChartOutlined />,
  },
  {
    label: '관리자 계정',
    key: 'admin',
    icon: <SecurityScanOutlined />,
  },
  {
    label: '회원',
    key: 'users',
    icon: <UserOutlined />,
  },

  {
    label: '고객센터 관리',
    key: 'customer',
    icon: <CustomerServiceOutlined />,
    children: [
      {
        label: '1:1 문의',
        key: 'customer-inquiry',
      },
      {
        label: 'FAQ',
        key: 'customer-faq',
      },
      {
        label: '공지사항',
        key: 'customer-notice',
      },
    ],
  },
  {
    label: '약관 관리',
    key: 'policy',
    icon: <FormOutlined />,
  },

  {
    label: '로그아웃',
    key: 'logout',
    icon: <LogoutOutlined />,
  },
];
