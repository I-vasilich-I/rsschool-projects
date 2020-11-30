export default function getRandomIntArray(number) {
  return [...Array(number).keys()].sort(() => Math.random() - 0.5);
}