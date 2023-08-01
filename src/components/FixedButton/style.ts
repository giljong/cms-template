import { Button as AntdButton } from 'antd';
import styled from 'styled-components';

export const Wrap = styled.div`
  position: fixed;
  bottom: 50px;
  right: 25px;
  z-index: 50;
`;

export const Button = styled(AntdButton)`
  border-radius: 100%;
  padding: 0;
  line-height: 0;
  max-width: 50px;
  max-height: 50px;
  width: 10vw;
  height: 10vw;
  font-size: 20px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 0;
`;
