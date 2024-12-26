export function hideImportantInformation(data: any, keys: string[]) {
  const result = JSON.parse(JSON.stringify(data));
  keys.forEach((key) => {
    if (result.hasOwnProperty(key)) {
      result[key] = '************************';
    }
  });

  return result;
}

export function formatDataToObject(data: any[], key: string) {
  if (!data.length) return {};
  const result = data.reduce((acc, cur) => {
    acc[cur[key]] = cur;
    return acc;
  }, {});
  return result;
}

export function getRandomNumber(num: number): string {
  const length = num ? num : 6;
  let result = '';
  const number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * number.length);
    result += number[randomIndex];
  }
  return result;
}
