import styled from 'styled-components';
import { PRIMARY } from '../../styles/colors';

export const Container = styled.main`
  min-height: 100vh;
  width: 100%;
  max-height: 100vh;
  background: ${PRIMARY};
  display: flex;
  justify-content: center;
  @media ${(props) => props.theme.mobile} {
    background: #fff;
    padding: 20px;
  }
`;

export const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;

  @media ${(props) => props.theme.mobile} {
  }
`;

export const Button = styled.button`
  width: 100%;
  background-color: ${PRIMARY};
  border: 0;
  height: 60px;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  border-radius: 10px;
  margin-top: 10px;
  @media ${(props) => props.theme.mobile} {
    border: 0;
    height: 46px;
  }
`;

export const ImageWrap = styled.div`
  width: 100%;
  margin-bottom: 2em;
  text-align: center;
`;

export const Image = styled.img`
  width: 100%;

  object-fit: contain;
  @media ${(props) => props.theme.mobile} {
    width: 70%;
  }
`;

export const FormWrap = styled.div`
  border: 1px solid #dcdcdc;
  background: #fff;
  padding: 30px;
  min-width: 500px;
  width: 30vw;
  border-radius: 10px;
  @media ${(props) => props.theme.mobile} {
    min-width: 0;
    width: 100%;
    max-width: 500px;
  }
`;
