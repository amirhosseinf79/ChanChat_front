function compareArrays(arr1: any, arr2: any) {
  if (!arr1 || !arr2) return false;
  if (arr1.length != arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i]) return false;
  }

  return true;
}

function isEdited(dt1: string, dt2: string) {
  const date1 = new Date(dt1);
  const date2 = new Date(dt2);

  if (Math.round(date1.getTime() / 1000) != Math.round(date2.getTime() / 1000))
    return true;
  return false;
}

export { compareArrays, isEdited };
