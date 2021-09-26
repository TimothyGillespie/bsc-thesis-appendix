const objectToMap = (input: {[key: string]: string}) => {
  const result = new Map();
  for(const key in input) {
    result.set(key, input[key]);
  }

  return result;
}

export default objectToMap;
