import { Divider, message } from 'antd';
import { useState } from 'react';
import * as S from './style';
import { AddRowTable } from '../../components/AddRowTable';

export type CategoryType = {
  id: number;
  name: string;
};

export function PolicyCategory() {
  const [categories, setCategories] = useState<any[]>([]);

  const handleSave = (idx: number) => () => {
    if (categories[idx].name.length < 1) {
      return message.error('종류 이름을 입력해주세요');
    }
    if (idx === categories.length - 1) {
    } else {
    }
  };

  const handleDelete = (idx: number) => () => {};

  return (
    <>
      <Divider>약관 종류 관리</Divider>
      <S.SmallTableContainer>
        <AddRowTable
          data={categories}
          setData={setCategories}
          handleSave={handleSave}
          handleDelete={handleDelete}
          loading={false}
        />
      </S.SmallTableContainer>
    </>
  );
}
