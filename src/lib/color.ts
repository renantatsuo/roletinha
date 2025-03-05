export const randomColor = (() => {
  const lastColor = {
    r: 0,
    g: 0,
    b: 0,
  };

  return (): string => {
    const r = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
    const g = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
    const b = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");

    const distance = Math.sqrt(
      Math.pow(Number(r) - lastColor.r, 2) +
        Math.pow(Number(g) - lastColor.g, 2) +
        Math.pow(Number(b) - lastColor.b, 2)
    );

    if (distance < 100) {
      return randomColor();
    }

    lastColor.r = Number(r);
    lastColor.g = Number(g);
    lastColor.b = Number(b);
    return `#${r}${g}${b}`;
  };
})();

export const getContrastingTextColor = (background: string) => {
  const r = parseInt(background.slice(1, 3), 16);
  const g = parseInt(background.slice(3, 5), 16);
  const b = parseInt(background.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 125 ? "black" : "white";
};
