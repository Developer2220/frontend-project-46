import _ from 'lodash';

const makeAstTree = (obj1, obj2) => {
  const allKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedAllKeys = _.sortBy(allKeys);

  return sortedAllKeys.map((key) => {
    const oldValue = obj1[key];
    const newValue = obj2[key];

    if (_.isObject(oldValue) && _.isObject(newValue)) {
      return {
        status: 'nested',
        key,
        children: makeAstTree(oldValue, newValue),
      };
    } if (_.has(obj1, key) && _.has(obj2, key)) {
      if (_.isEqual(oldValue, newValue)) {
        return {
          status: 'unchanged',
          key,
          value: newValue,
        };
      }
      return {
        status: 'changed',
        key,
        oldValue,
        newValue,
      };
    } if (_.has(obj1, key)) {
      return {
        status: 'deleted',
        key,
        value: oldValue,
      };
    }
    return {
      status: 'added',
      key,
      value: newValue,
    };
  });
};

export default makeAstTree;
