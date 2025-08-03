import { JSONParse } from './json-parse';

describe('JSONParse', () => {
  it('should parse valid JSON string', () => {
    const jsonString = '{"name": "John", "age": 30, "active": true}';
    const result = JSONParse(jsonString);

    expect(result).toEqual({
      name: 'John',
      age: 30,
      active: true
    });
  });

  it('should parse JSON with nested objects', () => {
    const jsonString = '{"user": {"name": "John", "profile": {"email": "john@example.com"}}, "settings": {"theme": "dark"}}';
    const result = JSONParse(jsonString);

    expect(result).toEqual({
      user: {
        name: 'John',
        profile: {
          email: 'john@example.com'
        }
      },
      settings: {
        theme: 'dark'
      }
    });
  });

  it('should return null for invalid JSON string', () => {
    const invalidJson = '{"name": "John", "age": 30,}'; // Missing value after comma
    const result = JSONParse(invalidJson);

    expect(result).toBeNull();
  });

  it('should return null for empty string', () => {
    const result = JSONParse('');
    expect(result).toBeNull();
  });

  it('should return null for malformed JSON with unclosed quotes', () => {
    const invalidJson = '{"name": "John", "message": "Hello world}'; // Unclosed quote
    const result = JSONParse(invalidJson);
    expect(result).toBeNull();
  });

  it('should handle JSON with arrays', () => {
    const jsonString = '{"items": ["apple", "banana", "orange"], "numbers": [1, 2, 3, 4, 5]}';
    const result = JSONParse(jsonString);

    expect(result).toEqual({
      items: ['apple', 'banana', 'orange'],
      numbers: [1, 2, 3, 4, 5]
    });
  });
});
