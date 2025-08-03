import { TestBed } from '@angular/core/testing';
import { InboxService } from './inbox.service';
import { BrazeContentCard } from '@models/braze/braze-content-card';

describe('InboxService', () => {
  let service: InboxService;

  const mockCard: BrazeContentCard = {
    id: 'test-card-1',
    created: 1704067200000, // 2024-01-01
    expiresAt: 1735689599000, // 2024-12-31
    viewed: false,
    clicked: false,
    pinned: false,
    dismissed: false,
    dismissible: true,
    url: 'https://example.com',
    openURLInWebView: true,
    extras: { type: 'inbox' },
    image: 'https://example.com/image.jpg',
    title: 'Test Card',
    cardDescription: 'Test Description',
    domain: 'braze',
    type: 'content_card'
  };

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

  it('should set cards array', () => {
    const cards = [mockCard];
    service.setCards(cards);
    expect(service.cards()).toEqual(cards);
  });

  it('should add card to array', () => {
    service.addCard(mockCard);
    expect(service.cards()).toEqual([mockCard]);
  });

  it('should mark card as viewed', () => {
    service.setCards([mockCard]);
    service.markAsViewed(mockCard.id);
    const updatedCard = service.cards()[0];
    expect(updatedCard.viewed).toBe(true);
  });

  it('should remove card when dismissed', () => {
    service.setCards([mockCard]);
    service.dismissCard(mockCard.id);
    expect(service.cards()).toEqual([]);
  });

  it('should update unread count when cards change', () => {
    service.setCards([mockCard]);
    expect(service.unreadCount()).toBe(1);
    
    service.markAsViewed(mockCard.id);
    expect(service.unreadCount()).toBe(0);
  });
});
