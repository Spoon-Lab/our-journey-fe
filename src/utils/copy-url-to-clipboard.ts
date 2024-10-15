export const copyUrlToClipboard = async (): Promise<boolean> => {
  const currentUrl = window.location.href;
  try {
    await navigator.clipboard.writeText(currentUrl);
    return true;
  } catch (err) {
    return false;
  }
};
