export const colorSystem = () => {
  if (window.matchMedia) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    } else {
      return "light";
    }
  }
  return "light";
};
