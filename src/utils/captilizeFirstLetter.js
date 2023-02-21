export const capitalizeText = (text) => {
  const texts = text.split(' ');
  const textUpper = [];

  for (const n of texts) {
    textUpper.push(n.replace(n[0], n[0]?.toUpperCase()));
  }

  return textUpper.join(' ');
};
