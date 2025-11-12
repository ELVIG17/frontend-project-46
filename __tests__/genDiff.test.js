import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import os from 'os';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  describe('flat files', () => {
    test('should compare flat JSON files correctly in stylish format', () => {
      const filepath1 = getFixturePath('file1.json');
      const filepath2 = getFixturePath('file2.json');
      const expected = readFile('expected.txt').trim();

      const result = genDiff(filepath1, filepath2);
      expect(result).toEqual(expected);
    });

    test('should compare flat JSON files correctly in plain format', () => {
      const filepath1 = getFixturePath('file1.json');
      const filepath2 = getFixturePath('file2.json');
      const expected = [
        "Property 'follow' was removed",
        "Property 'proxy' was removed",
        "Property 'timeout' was updated. From 50 to 20",
        "Property 'verbose' was added with value: true",
      ].join('\n');

      const result = genDiff(filepath1, filepath2, 'plain');
      expect(result).toEqual(expected);
    });

    test('should compare flat JSON files correctly in json format', () => {
      const filepath1 = getFixturePath('file1.json');
      const filepath2 = getFixturePath('file2.json');

      const result = genDiff(filepath1, filepath2, 'json');
      expect(() => JSON.parse(result)).not.toThrow();

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
      expect(parsedResult).toHaveLength(5); // Все 5 свойств, включая unchanged
    });
  });

  describe('nested files', () => {
    test('should compare nested JSON files correctly in stylish format', () => {
      const filepath1 = getFixturePath('nested1.json');
      const filepath2 = getFixturePath('nested2.json');
      const expected = readFile('nested_expected.txt').trim();

      const result = genDiff(filepath1, filepath2);
      expect(result).toEqual(expected);
    });

    test('should compare nested JSON files correctly in plain format', () => {
      const filepath1 = getFixturePath('nested1.json');
      const filepath2 = getFixturePath('nested2.json');
      const expected = readFile('plain_expected.txt').trim();

      const result = genDiff(filepath1, filepath2, 'plain');
      expect(result).toEqual(expected);
    });

    test('should compare nested JSON files correctly in json format', () => {
      const filepath1 = getFixturePath('nested1.json');
      const filepath2 = getFixturePath('nested2.json');

      const result = genDiff(filepath1, filepath2, 'json');
      expect(() => JSON.parse(result)).not.toThrow();

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);

      // Проверяем структуру JSON вывода
      const hasNestedStructure = parsedResult.some((node) => node.type === 'nested' && Array.isArray(node.children));
      expect(hasNestedStructure).toBe(true);
    });

    test('should compare nested YAML files correctly in json format', () => {
      const filepath1 = getFixturePath('nested1.yaml');
      const filepath2 = getFixturePath('nested2.yaml');

      const result = genDiff(filepath1, filepath2, 'json');
      expect(() => JSON.parse(result)).not.toThrow();

      const parsedResult = JSON.parse(result);
      expect(Array.isArray(parsedResult)).toBe(true);
    });
  });

  test('should handle non-existent files', () => {
    expect(() => {
      genDiff('nonexistent1.json', 'nonexistent2.json');
    }).toThrow('File not found: nonexistent1.json');
  });

  test('should handle unsupported file formats', () => {
    // Создаем временный файл с неподдерживаемым расширением для теста
    const tempDir = os.tmpdir();
    const tempFile1 = path.join(tempDir, 'test1.txt');
    const tempFile2 = path.join(tempDir, 'test2.txt');

    // Создаем временные файлы
    writeFileSync(tempFile1, 'test content 1');
    writeFileSync(tempFile2, 'test content 2');

    expect(() => {
      genDiff(tempFile1, tempFile2);
    }).toThrow('Unsupported file format: .txt');

    // Удаляем временные файлы
    unlinkSync(tempFile1);
    unlinkSync(tempFile2);
  });

  test('should handle unknown format', () => {
    expect(() => {
      genDiff('file1.json', 'file2.json', 'unknown');
    }).toThrow('Unknown format: unknown');
  });
});
