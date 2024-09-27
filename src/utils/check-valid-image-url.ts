/* eslint-disable no-new */
export const checkValidImgUrl = (imgUrl: string) => {
  try {
    new URL(imgUrl);
    return imgUrl;
  } catch (e) {
    return '';
  }
};
