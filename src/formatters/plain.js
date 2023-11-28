import _ from 'lodash'

const plain = (tree, key = '') => {
    const result =  tree
    .filter((node)=> node.status !== 'unchanged')
    .flatMap((node) => {
      const keys = [...key, node.key];
      const path = keys.join('.');
      if (node.status === 'nested') {
        return plain(node.children, keys);
      }
      if (node.status === 'deleted') {
        return `Property '${path}' was removed`;
      }
      if (node.status === 'added') {
        return `Property '${path}' was added with value: ${makeStringValue(node.value)}`;
      }
      if (node.status === 'changed') {
        return `Property '${path}' was updated. From ${makeStringValue(node.oldValue)} to ${makeStringValue(node.newValue)}`
      }
        throw new Error(`Unknown node type: ${node.status}`);
    });
    return result.join('\n')
  };


const makeStringValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : String(value);
};

export default plain;