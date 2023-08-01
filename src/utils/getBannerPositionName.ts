export const getBannerPositionName = (name: string) => {
  switch (name) {
    case 'HOME_POPUP':
      return '홈 - 팝업';
    case 'TOP':
      return '홈 - 상단 배너';
    case 'BOTTOM':
      return '홈 - 하단 배너';
    default:
      return '';
  }
};
