import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  
  return String(value);
};

const buildPath = (currentPath, key) => (currentPath ? `${currentPath}.${key}` : key);

const formatDiff = (diff, currentPath = '') => {
  const lines = diff.flatMap((node) => {
    const { key, type } = node;
    const propertyPath = buildPath(currentPath, key);
    
    switch (type) {
      case 'added':
        return `Property '${propertyPath}' was added with value: ${stringify(node.value)}`;
      case 'removed':
        return `Property '${propertyPath}' was removed`;
      case 'unchanged':
        return [];
      case 'changed':
        return `Property '${propertyPath}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
      case 'nested':
        return formatDiff(node.children, propertyPath);
      default:
        return [];
    }
  });
  
  return lines.filter((line) => line !== '').join('\n');
};

export default formatDiff;