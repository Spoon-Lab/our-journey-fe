export const setInputWidth = (input: HTMLInputElement, text: string) => {
  const tmp = document.createElement('span');
  tmp.style.font = getComputedStyle(input).font;
  tmp.style.visibility = 'hidden';
  tmp.style.position = 'absolute';
  tmp.textContent = text;

  document.body.appendChild(tmp);

  const width = tmp.getBoundingClientRect().width + 20;

  const inputElement = input;
  inputElement.style.width = `${width}px`;

  document.body.removeChild(tmp);
};
