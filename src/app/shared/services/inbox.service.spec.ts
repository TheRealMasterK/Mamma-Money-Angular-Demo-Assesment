import { TestBed } from '@angular/core/testing';
import { InboxService } from './inbox.service';
import { BrazeContentCard } from '@models/braze/braze-content-card';

describe('InboxService', () => {
  let service: InboxService;

  // Helper function to create valid mock cards
  const createMockCard = (overrides: Partial<BrazeContentCard> = {}): BrazeContentCard => ({
    id: 'test-id',
    created: 1704067200,
    expiresAt: 1735689599,
    title: 'Test Card',
    cardDescription: 'Test Description',
    domain: 'braze',
    type: 'content_card',
    viewed: false,
    clicked: false,
    pinned: false,
    dismissed: false,
    dismissible: true,
    openURLInWebView: true,
    extras: { type: 'inbox' },
    ...overrides
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InboxService]
    });
    service = TestBed.inject(InboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with empty cards array', () => {
    expect(service.cards()).toEqual([]);
  });

  it('should initialize with zero unread count', () => {
    expect(service.unreadCount()).toBe(0);
  });

  describe('setCards', () => {
    it('should set cards and update unread count', () => {
      const mockCards = [
        createMockCard({ id: '1', title: 'Test Card 1', viewed: false }),
        createMockCard({ id: '2', title: 'Test Card 2', viewed: true })
      ];

      service.setCards(mockCards);

      expect(service.cards()).toEqual(mockCards);
      expect(service.unreadCount()).toBe(1); // Only one unread card
    });

    it('should handle empty cards array', () => {
      service.setCards([]);
      expect(service.cards()).toEqual([]);
      expect(service.unreadCount()).toBe(0);
    });
  });

  describe('addCard', () => {
    it('should add card to beginning of array', () => {
      const existingCard = createMockCard({ id: '1', title: 'Existing Card' });
      const newCard = createMockCard({ id: '2', title: 'New Card' });

      service.setCards([existingCard]);
      service.addCard(newCard);

      const cards = service.cards();
      expect(cards[0]).toEqual(newCard);
      expect(cards[1]).toEqual(existingCard);
      expect(service.unreadCount()).toBe(2);
    });

    it('should update unread count when adding unread card', () => {
      const card = createMockCard({ id: '1', viewed: false });
      service.addCard(card);
      expect(service.unreadCount()).toBe(1);
    });

    it('should not update unread count when adding viewed card', () => {
      const card = createMockCard({ id: '1', viewed: true });
      service.addCard(card);
      expect(service.unreadCount()).toBe(0);
    });
  });

  describe('markAsViewed', () => {
    it('should mark card as viewed and update unread count', () => {
      const card = createMockCard({ id: '1', viewed: false });
      service.setCards([card]);
      expect(service.unreadCount()).toBe(1);

      service.markAsViewed('1');
      const updatedCards = service.cards();
      expect(updatedCards[0].viewed).toBe(true);
      expect(service.unreadCount()).toBe(0);
    });

    it('should not affect other cards when marking one as viewed', () => {
      const cards = [
        createMockCard({ id: '1', viewed: false }),
        createMockCard({ id: '2', viewed: false })
      ];

      service.setCards(cards);
      service.markAsViewed('1');

      const updatedCards = service.cards();
      expect(updatedCards[0].viewed).toBe(true);
      expect(updatedCards[1].viewed).toBe(false);
      expect(service.unreadCount()).toBe(1);
    });

    it('should handle non-existent card id', () => {
      const card = createMockCard({ id: '1', viewed: false });
      service.setCards([card]);
      service.markAsViewed('non-existent');

      const updatedCards = service.cards();
      expect(updatedCards[0].viewed).toBe(false);
      expect(service.unreadCount()).toBe(1);
    });
  });

  describe('dismissCard', () => {
    it('should remove card and update unread count', () => {
      const cards = [
        createMockCard({ id: '1', viewed: false }),
        createMockCard({ id: '2', viewed: false })
      ];

      service.setCards(cards);
      expect(service.unreadCount()).toBe(2);

      service.dismissCard('1');
      const updatedCards = service.cards();
      expect(updatedCards.length).toBe(1);
      expect(updatedCards[0].id).toBe('2');
      expect(service.unreadCount()).toBe(1);
    });

    it('should handle dismissing last card', () => {
      const card = createMockCard({ id: '1', viewed: false });
      service.setCards([card]);
      service.dismissCard('1');

      expect(service.cards()).toEqual([]);
      expect(service.unreadCount()).toBe(0);
    });

    it('should handle non-existent card id', () => {
      const card = createMockCard({ id: '1', viewed: false });
      service.setCards([card]);
      service.dismissCard('non-existent');

      expect(service.cards()).toEqual([card]);
      expect(service.unreadCount()).toBe(1);
    });
  });

  describe('unread count calculation', () => {
    it('should count only unread and non-dismissed cards', () => {
      const cards = [
        createMockCard({ id: '1', viewed: false, dismissed: false }), // Should count
        createMockCard({ id: '2', viewed: true, dismissed: false }),  // Should not count
        createMockCard({ id: '3', viewed: false, dismissed: true }),  // Should not count
        createMockCard({ id: '4', viewed: false, dismissed: false })  // Should count
      ];

      service.setCards(cards);
      expect(service.unreadCount()).toBe(2); // Only cards 1 and 4
    });
  });
}); 