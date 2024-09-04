export function dataListSliceHalf(dataList) {
  let maxCount = dataList.length;
  let halfCount = maxCount / 2;
  const resultArray = [];

  for (let i = 0; i < maxCount; i += halfCount) {
    resultArray.push(dataList.slice(i, i + halfCount));
  }

  return resultArray;
}

export default dataListSliceHalf;
