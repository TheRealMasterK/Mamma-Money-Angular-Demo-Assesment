import { convertToBrazeContentCard } from './convert-content-card';
import { BrazeAltPushContentCard } from '@models/braze/braze-push-content-card';
import { BrazeContentCard } from '@models/braze/braze-content-card';

describe('convertToBrazeContentCard', () => {
  it('should convert BrazeAltPushContentCard to BrazeContentCard', () => {
    const altCard: BrazeAltPushContentCard = {
      id: 'test-card',
      ca: 1704067200,
      ea: 1735689599,
      v: false,
      cl: false,
      p: false,
      db: true,
      u: 'https://example.com',
      uw: true,
      ar: 1,
      e: { type: 'inbox', logEvent: 'test', subtitle: 'Test' },
      i: 'https://example.com/image.jpg',
      tt: 'Test Card',
      ds: 'Test Description',
      dm: 'braze',
      tp: 'content_card'
    };

    const result = convertToBrazeContentCard(altCard);

    expect(result).toEqual({
      id: 'test-card',
      created: 1704067200,
      expiresAt: 1735689599,
      viewed: false,
      clicked: false,
      pinned: false,
      dismissed: false,
      dismissible: true,
      url: 'https://example.com',
      openURLInWebView: true,
      extras: { type: 'inbox', logEvent: 'test', subtitle: 'Test' },
      image: 'https://example.com/image.jpg',
      title: 'Test Card',
      cardDescription: 'Test Description',
      domain: 'braze',
      type: 'content_card'
    });
  });

  it('should handle cards with minimal data', () => {
    const altCard: BrazeAltPushContentCard = {
      id: 'minimal-card',
      ca: 1704067200,
      ea: 1735689599,
      v: true,
      cl: true,
      p: false,
      db: false,
      u: '',
      uw: false,
      ar: 0,
      e: { type: 'promotion' },
      i: '',
      tt: '',
      ds: '',
      dm: 'braze',
      tp: 'content_card'
    };

    const result = convertToBrazeContentCard(altCard);

    expect(result).toEqual({
      id: 'minimal-card',
      created: 1704067200,
      expiresAt: 1735689599,
      viewed: true,
      clicked: true,
      pinned: false,
      dismissed: false,
      dismissible: false,
      url: '',
      openURLInWebView: false,
      extras: { 
        type: 'promotion',
        logEvent: undefined,
        subtitle: undefined
      },
      image: '',
      title: '',
      cardDescription: '',
      domain: 'braze',
      type: 'content_card'
    });
  });

  it('should handle cards with all boolean flags', () => {
    const altCard: BrazeAltPushContentCard = {
      id: 'boolean-test',
      ca: 1704067200,
      ea: 1735689599,
      v: true,
      cl: true,
      p: true,
      db: true,
      u: 'https://example.com',
      uw: true,
      ar: 1,
      e: { type: 'inbox' },
      i: 'https://example.com/image.jpg',
      tt: 'Boolean Test',
      ds: 'Test Description',
      dm: 'braze',
      tp: 'content_card'
    };

    const result = convertToBrazeContentCard(altCard);

    expect(result.viewed).toBe(true);
    expect(result.clicked).toBe(true);
    expect(result.pinned).toBe(true);
    expect(result.dismissible).toBe(true);
    expect(result.openURLInWebView).toBe(true);
  });

  it('should handle cards with string extras', () => {
    const altCard: BrazeAltPushContentCard = {
      id: 'string-extras',
      ca: 1704067200,
      ea: 1735689599,
      v: false,
      cl: false,
      p: false,
      db: true,
      u: 'https://example.com',
      uw: true,
      ar: 1,
      e: { type: 'simple-string-extra' },
      i: 'https://example.com/image.jpg',
      tt: 'String Extras',
      ds: 'Test Description',
      dm: 'braze',
      tp: 'content_card'
    };

    const result = convertToBrazeContentCard(altCard);

    expect(result.extras).toEqual({ 
      type: 'simple-string-extra',
      logEvent: undefined,
      subtitle: undefined
    });
  });

  it('should handle cards with complex extras object', () => {
    const complexExtras = {
      type: 'inbox',
      logEvent: 'custom_event',
      subtitle: 'Complex Subtitle',
      customField: 'customValue',
      nestedObject: {
        key: 'value',
        number: 42
      }
    };

    const altCard: BrazeAltPushContentCard = {
      id: 'complex-extras',
      ca: 1704067200,
      ea: 1735689599,
      v: false,
      cl: false,
      p: false,
      db: true,
      u: 'https://example.com',
      uw: true,
      ar: 1,
      e: complexExtras,
      i: 'https://example.com/image.jpg',
      tt: 'Complex Extras',
      ds: 'Test Description',
      dm: 'braze',
      tp: 'content_card'
    };

    const result = convertToBrazeContentCard(altCard);

    expect(result.extras).toEqual({
      type: 'inbox',
      logEvent: 'custom_event',
      subtitle: 'Complex Subtitle'
    });
  });

  it('should handle edge case timestamps', () => {
    const altCard: BrazeAltPushContentCard = {
      id: 'edge-timestamps',
      ca: 0,
      ea: 9999999999,
      v: false,
      cl: false,
      p: false,
      db: true,
      u: 'https://example.com',
      uw: true,
      ar: 1,
      e: { type: 'inbox' },
      i: 'https://example.com/image.jpg',
      tt: 'Edge Timestamps',
      ds: 'Test Description',
      dm: 'braze',
      tp: 'content_card'
    };

    const result = convertToBrazeContentCard(altCard);

    expect(result.created).toBe(0);
    expect(result.expiresAt).toBe(9999999999);
  });

  it('should handle cards with special characters in text fields', () => {
    const altCard: BrazeAltPushContentCard = {
      id: 'special-chars',
      ca: 1704067200,
      ea: 1735689599,
      v: false,
      cl: false,
      p: false,
      db: true,
      u: 'https://example.com',
      uw: true,
      ar: 1,
      e: { type: 'inbox' },
      i: 'https://example.com/image.jpg',
      tt: 'Special & Characters < > " \'',
      ds: 'Description with \n newlines and \t tabs',
      dm: 'braze',
      tp: 'content_card'
    };

    const result = convertToBrazeContentCard(altCard);

    expect(result.title).toBe('Special & Characters < > " \'');
    expect(result.cardDescription).toBe('Description with \n newlines and \t tabs');
  });

  it('should handle cards with very long URLs', () => {
    const longUrl = 'https://example.com/very/long/url/with/many/segments/and/parameters?param1=value1&param2=value2&param3=value3&param4=value4&param5=value5&param6=value6&param7=value7&param8=value8&param9=value9&param10=value10';
    
    const altCard: BrazeAltPushContentCard = {
      id: 'long-url',
      ca: 1704067200,
      ea: 1735689599,
      v: false,
      cl: false,
      p: false,
      db: true,
      u: longUrl,
      uw: true,
      ar: 1,
      e: { type: 'inbox' },
      i: 'https://example.com/image.jpg',
      tt: 'Long URL Test',
      ds: 'Test Description',
      dm: 'braze',
      tp: 'content_card'
    };

    const result = convertToBrazeContentCard(altCard);

    expect(result.url).toBe(longUrl);
  });

  it('should handle cards with empty strings', () => {
    const altCard: BrazeAltPushContentCard = {
      id: 'empty-strings',
      ca: 1704067200,
      ea: 1735689599,
      v: false,
      cl: false,
      p: false,
      db: true,
      u: '',
      uw: true,
      ar: 1,
      e: { type: 'inbox' },
      i: '',
      tt: '',
      ds: '',
      dm: 'braze',
      tp: 'content_card'
    };

    const result = convertToBrazeContentCard(altCard);

    expect(result.url).toBe('');
    expect(result.image).toBe('');
    expect(result.title).toBe('');
    expect(result.cardDescription).toBe('');
  });

  it('should handle cards with empty values', () => {
    const altCard: BrazeAltPushContentCard = {
      id: 'empty-values',
      ca: 1704067200,
      ea: 1735689599,
      v: false,
      cl: false,
      p: false,
      db: true,
      u: '',
      uw: true,
      ar: 1,
      e: { type: 'inbox' },
      i: '',
      tt: '',
      ds: '',
      dm: 'braze',
      tp: 'content_card'
    };

    const result = convertToBrazeContentCard(altCard);

    expect(result.url).toBe('');
    expect(result.image).toBe('');
    expect(result.title).toBe('');
    expect(result.cardDescription).toBe('');
  });
}); 