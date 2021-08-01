import * as _ from "lodash";

function convertKeysToSnakeCase(object: any): any {
  if(typeof object !== 'object')
    return object;

  if(object instanceof Array)
    return object.map(x => convertKeysToSnakeCase(x));

  const clone = _.cloneDeep(object);
  const result = {};

  for (const key in clone)
    result[_.snakeCase(key)] = convertKeysToSnakeCase(clone[key]);

  return result;
}

export default convertKeysToSnakeCase;
