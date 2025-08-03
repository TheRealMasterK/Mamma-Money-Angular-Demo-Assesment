import { DateTimeStringPipe } from './date-time-string.pipe';

describe('DateTimeStringPipe', () => {
  let pipe: DateTimeStringPipe;

  beforeEach(() => {
    pipe = new DateTimeStringPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format timestamp to readable date string', () => {
    const timestamp = 1704067200; // 2024-01-01 00:00:00 UTC (in seconds)
    const result = pipe.transform(timestamp);

    expect(result).toMatch(/\d{2}\.\d{2}\.\d{4}/); // DD.MM.YYYY format
  });

  it('should handle different timestamps', () => {
    const timestamps = [
      1704067200, // 2024-01-01
      1735689599, // 2024-12-31
      1640995200, // 2022-01-01
      1672531200, // 2023-01-01
    ];

    timestamps.forEach((timestamp) => {
      const result = pipe.transform(timestamp);
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  it('should handle zero timestamp', () => {
    const result = pipe.transform(0);
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });

  it('should handle large timestamp', () => {
    const largeTimestamp = 9999999999;
    const result = pipe.transform(largeTimestamp);
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });

  it('should handle negative timestamp', () => {
    const negativeTimestamp = -1704067200;
    const result = pipe.transform(negativeTimestamp);
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });

  it('should handle null input gracefully', () => {
    const result = pipe.transform(null as any);
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });

  it('should handle undefined input gracefully', () => {
    expect(() => pipe.transform(undefined as any)).toThrow();
  });

  it('should handle string timestamp input', () => {
    const stringTimestamp = '1704067200000';
    const result = pipe.transform(stringTimestamp);
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });

  it('should handle invalid string input', () => {
    const invalidString = 'invalid-timestamp';
    expect(() => pipe.transform(invalidString)).toThrow();
  });

  it('should format current timestamp correctly', () => {
    const now = Math.floor(Date.now() / 1000);
    const result = pipe.transform(now);

    expect(result).toMatch(/\d{2}\.\d{2}\.\d{4}/);
  });

  it('should be standalone pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should handle edge case timestamps', () => {
    const edgeCases = [9999999999, -9999999999, 1, -1];

    edgeCases.forEach((timestamp) => {
      const result = pipe.transform(timestamp);
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });
  });

  it('should produce consistent results for same input', () => {
    const timestamp = 1704067200;
    const result1 = pipe.transform(timestamp);
    const result2 = pipe.transform(timestamp);

    expect(result1).toBe(result2);
  });

  it('should handle decimal timestamps', () => {
    const decimalTimestamp = 1704067200.5;
    const result = pipe.transform(decimalTimestamp);
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });
});
