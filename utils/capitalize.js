export default (string) => {
  return string
    .split(" ")
    .map((el) => {
      return el.replace(el.charAt(0), el.charAt(0).toUpperCase());
    })
    .join(" ");
};
