import Taro from '@tarojs/taro';

export function getNavBarInfo() {
  const {statusBarHeight, windowWidth, windowHeight, safeArea} = Taro.getSystemInfoSync();
  const {height, top, right} = Taro.getMenuButtonBoundingClientRect();

  const navBarHeight = height + (top - statusBarHeight) * 2;
  const pw = windowWidth - right;
  const isIphoneXOrNewer = safeArea?.top > 40;
  const viewportHeight =
    windowHeight - statusBarHeight - navBarHeight - (isIphoneXOrNewer ? 24 : 0);

  return {
    navBarHeight,
    statusBarHeight,
    windowWidth,
    windowHeight,
    viewportHeight,
    pw,
    isIphoneXOrNewer,
  };
}
