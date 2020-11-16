/* eslint-disable prettier/prettier */
export default function getArrayToSolve(array, boardSize, emptyTile) {
  const arr = array.slice(0, array.length);
  const emptyIndex = emptyTile.posicionY * boardSize + emptyTile.posicionX;
  arr.splice(emptyIndex, 0, emptyTile);
  const resArr = [];
  for (let i = 0; i < arr.length; i += boardSize) {
    resArr.push(arr.slice(i, i + boardSize).map((elem) => (elem.value === 0 ? '' : elem.value)));
  }
  return resArr;
}
