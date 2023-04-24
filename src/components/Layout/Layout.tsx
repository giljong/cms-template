import React from 'react';

import * as S from './style';
import Main from '../Main';
import { AsideMenu } from '../AsideMenu';
import { PRIMARY } from '../../styles/colors';

export type BadgeType = {
  [index: string]: number;
  inquiryCount: number;
  partnerCount: number;
};

function Layout() {
  return (
    <S.Layout>
      <AsideMenu />

      <S.Layout $marginLeft={200}>
        <S.Content>
          <S.StatusBar></S.StatusBar>
          <Main />
        </S.Content>
        <S.Footer>projectName ©2022 Created by Lawdians</S.Footer>
      </S.Layout>
    </S.Layout>
  );
}

export default Layout;
