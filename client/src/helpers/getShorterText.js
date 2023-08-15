export const getShorterText = (text, requiredWords) => {
  const words = text.split(' ');
  const firstFiveWords = words.slice(0, requiredWords);
  const result = `${firstFiveWords.join(' ')} . . .`;

  return result
};