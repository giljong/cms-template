import {
  CustomerServiceOutlined,
  SecurityScanOutlined,
  LineChartOutlined,
  FormOutlined,
  UserOutlined,
  LogoutOutlined,
  LockOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { checkRole } from './checkRole';
import React from 'react';

type ItemType = {
  label: string;
  key: string;
  icon?: React.ReactNode;
  role?: string | null;
};

type MenuType = {
  children?: ItemType[];
} & ItemType;

const menuItem: MenuType[] = [
  {
    label: '대시보드',
    key: 'dashboard',
    icon: <LineChartOutlined />,
    role: null,
  },
  {
    label: '관리자 계정',
    key: 'admin',
    icon: <SecurityScanOutlined />,
    role: 'READ_ADMIN',
  },
  {
    label: '회원',
    key: 'users',
    icon: <UserOutlined />,
    role: 'READ_USER',
  },
  {
    label: '게시글 관리',
    key: 'post',
    icon: <MailOutlined />,
    children: [
      {
        key: 'post-popup',
        label: '팝업 관리',
        role: 'READ_BANNER',
      },
      {
        key: 'post-banner',
        label: '배너 관리',
        role: 'READ_BANNER',
      },
    ],
  },
  {
    label: '고객센터 관리',
    key: 'customer',
    icon: <CustomerServiceOutlined />,
    children: [
      {
        label: '1:1 문의',
        key: 'customer-inquiry',
        role: 'READ_INQUIRY',
      },
      {
        label: 'FAQ',
        key: 'customer-faq',
        role: 'READ_FAQ',
      },
      {
        label: '공지사항',
        key: 'customer-notice',
        role: 'READ_NOTICE',
      },
    ],
  },
  {
    label: '약관 관리',
    key: 'policy',
    icon: <FormOutlined />,
    role: 'READ_POLICY',
  },
  {
    label: '비밀번호 변경',
    key: 'password',
    icon: <LockOutlined />,
  },

  {
    label: '로그아웃',
    key: 'logout',
    icon: <LogoutOutlined />,
  },
];

export const getMenuItem = (roles: string[]): ItemType[] =>
  menuItem
    .filter((item) => {
      if (!item.children && !item.role) return true;
      const neededRole = item.children
        ? item.children.map((v) => v.role ?? '')
        : [item.role ?? ''];
      return checkRole(
        roles,
        neededRole.filter((v) => v.length),
      );
    }) // 단일메뉴 및 서브메뉴 권한 분리
    .map((item) => {
      if (!item.children)
        return { key: item.key, icon: item.icon, label: item.label };
      else
        return {
          ...item,
          children: item.children
            .filter((child) => checkRole(roles, child.role ? [child.role] : []))
            .map((child) => ({ key: child.key, label: child.label })),
        };
    }); // 서브메뉴 하위메뉴 권한 분리 및 데이터 형식 정리
