import styled from 'styled-components';

export const QRWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

export const KeyWrap = styled.div`
  text-align: center;
  @media ${(props) => props.theme.mobile} {
    font-size: 12px;
  }
`;
