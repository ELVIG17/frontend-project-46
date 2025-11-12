import { parseFile } from './parsers.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  
  // Временная заглушка - просто выводим оба объекта
  // На следующих шагах здесь будет реализовано сравнение
  return `File 1: ${JSON.stringify(data1)}\nFile 2: ${JSON.stringify(data2)}\nFormat: ${format}`;
};

export default genDiff;