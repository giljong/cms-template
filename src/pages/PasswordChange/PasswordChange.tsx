import { useMutation } from '@apollo/client';
import { Divider, Input, message } from 'antd';

import React, { useState } from 'react';
import { isDesktop } from 'react-device-detect';
import * as S from './style';
import TransformBox from '../../components/TransformBox';

type VariablesType = {
  currentPassword: string;
  newPassword: string;
  [index: string]: string;
};

export function PasswordChange() {
  const [variables, setVariables] = useState<VariablesType>({
    currentPassword: '',
    newPassword: '',
  });
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleChange =
    (keyword: keyof VariablesType) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVariables((prev) => {
        prev[keyword] = e.target.value;
        return { ...prev };
      });
    };

  const handleClick = () => {
    if (!variables.currentPassword.length) {
      return message.error('현재 비밀번호를 입력해주세요.');
    }
    if (!variables.newPassword.length) {
      return message.error('새로운 비밀번호를 입력해주세요.');
    }
    if (!passwordConfirm.length) {
      return message.error('새로운 비밀번호 확인을 입력해주세요.');
    }
    if (passwordConfirm !== variables.newPassword) {
      return message.error(
        '새로운 비밀번호와 새로운 비밀번호 확인이 일치하지 않습니다.',
      );
    }
  };

  return (
    <>
      <Divider>비밀번호 변경</Divider>
      <TransformBox
        flexDirection="column"
        marginTop="50px"
        width={isDesktop ? '30%' : '100%'}
      >
        <TransformBox flexDirection="column">
          <h3>현재 비밀번호</h3>
          <Input.Password
            onChange={handleChange('currentPassword')}
            value={variables.currentPassword}
          />
        </TransformBox>
        <TransformBox flexDirection="column" marginTop="20px">
          <h3>새로운 비밀번호</h3>
          <Input.Password
            onChange={handleChange('newPassword')}
            value={variables.newPassword}
          />
        </TransformBox>
        <TransformBox flexDirection="column" marginTop="20px">
          <h3>새로운 비밀번호 확인</h3>
          <Input.Password
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
          />
        </TransformBox>
        <TransformBox marginTop="30px" justifyContent="center">
          <S.SubmitBtn type="primary" onClick={handleClick}>
            변경하기
          </S.SubmitBtn>
        </TransformBox>
      </TransformBox>
    </>
  );
}
