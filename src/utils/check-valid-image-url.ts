/* eslint-disable no-new */
export const checkValidImgUrl = (imgUrl: string) => {
  try {
    const url = new URL(imgUrl);
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const hasValidExtension = validExtensions.some((ext) => url.pathname.endsWith(ext));
    return hasValidExtension ? imgUrl : '';
  } catch (e) {
    return '';
  }
};
