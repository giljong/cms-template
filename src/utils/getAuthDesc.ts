import { getAuthName } from './getAuthName';

export const getAdminAuthDesc = (adminAuths: any[]) => {
  const arr = adminAuths.map((v) => {
    return {
      ...v,

      desc: `[${getAuthName(v.name.split('_')[1])}] ${
        v.name.split('_')[0] === 'READ' ? '조회 가능' : '버튼 사용 가능'
      }`,
    };
  });

  return arr;
};
