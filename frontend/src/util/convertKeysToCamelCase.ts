import * as _ from "lodash";

function convertKeysToCamelCase(object: any): any {
  if(typeof object !== 'object')
    return object;

  if(object instanceof Array)
    return object.map(x => convertKeysToCamelCase(x));

  const clone = _.cloneDeep(object);
  const result = {};

  for (const key in clone)
    result[_.camelCase(key)] = convertKeysToCamelCase(clone[key]);

  return result;
}

export default convertKeysToCamelCase;
