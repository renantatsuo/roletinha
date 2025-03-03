export const randomPastelColor = (() => {
  const tracking = {
    red: 0,
    green: 0,
    blue: 0,
  };
  return () => {
    const red = (Math.round(Math.random() * 127) + 100 - tracking.red * 10)
      .toString(16)
      .padStart(2, "0");
    const green = (Math.round(Math.random() * 127) + 100 - tracking.green * 10)
      .toString(16)
      .padStart(2, "0");
    const blue = (Math.round(Math.random() * 127) + 100 - tracking.blue * 10)
      .toString(16)
      .padStart(2, "0");

    if (red > green && red > blue) {
      tracking.red++;
    } else if (green > red && green > blue) {
      tracking.green++;
    } else {
      tracking.blue++;
    }

    return `#${red}${green}${blue}`;
  };
})();

export const getContrastingTextColor = (background: string) => {
  const r = parseInt(background.slice(1, 3), 16);
  const g = parseInt(background.slice(3, 5), 16);
  const b = parseInt(background.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 125 ? "black" : "white";
};
