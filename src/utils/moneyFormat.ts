export const moneyFormat = (money: string) => {
  return `${Number(money).toLocaleString('ko-KR', {
    currency: 'KRW',
  })}원`;
};
