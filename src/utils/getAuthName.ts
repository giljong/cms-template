export const getAuthName = (name: string) => {
  switch (name) {
    case 'DASHBOARD':
      return '대시보드';
    case 'ADMIN':
      return '관리자 계정';
    case 'USER':
      return '회원';
    case 'INQUIRY':
      return '1:1문의';
    case 'FAQ':
      return 'FAQ';
    case 'NOTICE':
      return '공지사항';
    case 'POLICY':
      return '약관 관리';

    default:
      return '마스터';
  }
};
