const genDiff = (filepath1, filepath2, format = 'stylish') => {
  // Здесь будет реализация сравнения файлов
  // Пока возвращаем заглушку для демонстрации
  return `Comparing ${filepath1} and ${filepath2}${format ? ` with format: ${format}` : ''}`;
};

export default genDiff;