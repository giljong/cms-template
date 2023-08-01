import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import * as S from './style';

type Props = {
  onClick: () => void;
  children?: React.ReactNode;
};

export function FixedButton({ onClick, children }: Props) {
  return (
    <S.Wrap>
      <S.Button onClick={onClick} type="primary">
        {children ?? <EditOutlined />}
      </S.Button>
    </S.Wrap>
  );
}
