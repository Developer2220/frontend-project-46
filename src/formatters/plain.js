import _ from 'lodash';

const makeStringValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : String(value);
};

const plain = (tree, key = '') => {
  const result = tree
    .filter((node) => node.status !== 'unchanged')
    .flatMap((node) => {
      const keys = [...key, node.key];
      const path = keys.join('.');
      switch (node.status) {
        case 'nested':
          return plain(node.children, keys);
        case 'deleted':
          return `Property '${path}' was removed`;
        case 'added':
          return `Property '${path}' was added with value: ${makeStringValue(node.value)}`;
        case 'changed':
          return `Property '${path}' was updated. From ${makeStringValue(node.oldValue)} to ${makeStringValue(node.newValue)}`;
        default:
          throw new Error(`Unknown node status: ${node.status}`);
      }
    });
  return result.join('\n');
};

export default plain;
