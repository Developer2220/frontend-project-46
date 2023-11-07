import _ from 'lodash';

const makeAstTree = (obj1, obj2) => {
  const allKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedAllKeys = _.sortBy(allKeys);

  const result = sortedAllKeys.map((key) => {
    const oldValue = obj1[key];
    const newValue = obj2[key];

    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (_.isEqual(oldValue, newValue)) {
        return {
          status: "unchanged",
          key,
          value: newValue,
        };
      } else {
        return {
          status: "changed",
          key,
          oldValue,
          newValue,
        };
      }
    } else if (_.has(obj1, key)) {
      return {
        status: "deleted",
        key,
        value: oldValue,
      };
    } else {
      return {
        status: "added",
        key,
        value: newValue,
      };
    }
  });
  return result;
};

export {makeAstTree};
