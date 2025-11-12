import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  
  if (typeof value === 'string') {
    return value;
  }
  
  return String(value);
};

const formatDiff = (diff) => {
  const lines = diff.map((item) => {
    switch (item.type) {
      case 'added':
        return `  + ${item.key}: ${formatValue(item.value)}`;
      case 'removed':
        return `  - ${item.key}: ${formatValue(item.value)}`;
      case 'unchanged':
        return `    ${item.key}: ${formatValue(item.value)}`;
      case 'changed':
        return [
          `  - ${item.key}: ${formatValue(item.oldValue)}`,
          `  + ${item.key}: ${formatValue(item.newValue)}`
        ].join('\n');
      default:
        return '';
    }
  });
  
  return `{\n${lines.join('\n')}\n}`;
};

export default formatDiff;