import styled from 'styled-components';
import { Layout as AntdLayout } from 'antd';

const {
  Sider: AntdSider,
  Content: AntdContent,
  Footer: AntdFooter,
} = AntdLayout;

export const Container = styled.section`
  height: 100vh;
`;

export const ImageWrap = styled.div`
  width: 100%;
  margin: 1.25em auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media ${(props) => props.theme.mobile} {
    margin: 20px;
    margin-left: 20px;
    justify-content: flex-start;
    align-items: flex-start;
    width: auto;
  }
`;

export const Image = styled.img`
  width: 60%;
  height: 60%;
  /* object-fit: cover; */
`;

type LayoutProps = {
  $marginLeft?: number;
};
export const Layout = styled(AntdLayout)<LayoutProps>`
  margin-left: ${(props) => (props.$marginLeft ? props.$marginLeft : 0)}px;
  min-height: 100vh;
`;

export const Sider = styled(AntdSider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  @media ${(props) => props.theme.mobile} {
    background: #fff;
    z-index: 10001;
  }
`;

export const Content = styled(AntdContent)`
  margin: 24px 16px 0px;
  overflow: initial;
`;

export const Footer = styled(AntdFooter)`
  text-align: center;
`;

type NavProps = {
  isOpen?: boolean;
};

export const NavTop = styled.div<NavProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);

  position: fixed;
  top: 0;
  z-index: 99;
  height: 60px;
  padding: 15px;
  background: #fff;
`;

export const Mask = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.5;
  z-index: 999;
`;

export const MenuIcon = styled.div`
  position: absolute;
  left: 15px;
`;
