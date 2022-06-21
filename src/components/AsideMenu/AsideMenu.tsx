import { useLayoutEffect, useState } from 'react';
import { Menu } from 'antd';
import {
  CustomerServiceOutlined,
  SecurityScanOutlined,
  LineChartOutlined,
  FormOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './style';

type MenuInfo = {
  key: string;
  keyPath: string[];
};

type MenuData = {
  subMenu?: string;
  item: string;
};

const { SubMenu } = Menu;

export function AsideMenu() {
  const handleLogout = () => {
    localStorage.setItem('accessToken', '');
  };

  const [menu, setMenu] = useState<MenuData>({
    subMenu: '',
    item: '',
  });

  const navigator = useNavigate();
  const { pathname } = useLocation();

  const handleMoveHome = () => {
    navigator('/');
  };

  const handleClickMenu = (e: MenuInfo) => {
    const [item, subMenu] = e.keyPath;
    if (subMenu) {
      const [, path] = item.split('-');
      setMenu({
        item,
        subMenu,
      });
      return navigator(`/${subMenu}/${path}`);
    } else {
      if (item === 'dashboard') {
        return handleMoveHome();
      }

      setMenu({
        item,
        subMenu: '',
      });
      return navigator(`/${item}`);
    }
  };

  const handleChangeSubMenu = (openKeys: string[]) => {
    if (openKeys.length < 1) {
      return setMenu((prev) => ({ ...prev, subMenu: '' }));
    }

    const [, subMenu] = openKeys;
    setMenu((prev) => ({ ...prev, subMenu }));
  };

  useLayoutEffect(() => {
    const [, subMenu, item] = pathname.split('/');
    if (!subMenu.length) {
      return setMenu({ item: 'dashboard', subMenu: '' });
    }
    if (!item) {
      return setMenu({ item: subMenu, subMenu: '' });
    }

    setMenu({ item: `${subMenu}-${item}`, subMenu });
  }, [pathname]);

  return (
    <S.Sider>
      <S.ImageWrap onClick={handleMoveHome}>
        <S.Image alt="logo" src={''} />
      </S.ImageWrap>

      <Menu
        theme="dark"
        mode="inline"
        onClick={handleClickMenu}
        onOpenChange={handleChangeSubMenu}
        openKeys={[menu.subMenu ?? '']}
        selectedKeys={[menu.item]}
      >
        <Menu.Item key="dashboard" icon={<LineChartOutlined />}>
          대시보드
        </Menu.Item>

        <Menu.Item key="admin" icon={<SecurityScanOutlined />}>
          관리자 계정
        </Menu.Item>

        <Menu.Item key="users" icon={<UserOutlined />}>
          회원
        </Menu.Item>

        <SubMenu
          key="customer"
          icon={<CustomerServiceOutlined />}
          title="고객센터 관리"
        >
          <Menu.Item key="customer-inquiry">1:1 문의</Menu.Item>

          <Menu.Item key="customer-faq">FAQ</Menu.Item>

          <Menu.Item key="customer-notice">공지사항</Menu.Item>
        </SubMenu>

        <Menu.Item key="policy" icon={<FormOutlined />}>
          약관 관리
        </Menu.Item>

        <Menu.Item onClick={handleLogout} icon={<LogoutOutlined />}>
          로그아웃
        </Menu.Item>
      </Menu>
    </S.Sider>
  );
}
