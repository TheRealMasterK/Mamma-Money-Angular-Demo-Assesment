import { Injectable, signal } from '@angular/core';
import { BrazeContentCard } from '@models/braze/braze-content-card';

@Injectable({ providedIn: 'root' })
export class InboxService {
  cards = signal<BrazeContentCard[]>([]);
  unreadCount = signal(0);

  constructor() {
    console.log('📥 README FLOW: InboxService constructor called');
  }

  setCards(cards: BrazeContentCard[]): void {
    console.log('📋 README FLOW: Setting cards in inbox service');
    console.log('📊 README FLOW: Cards count:', cards.length);
    this.cards.set(cards);
    this.updateUnreadCount();
    console.log('✅ README FLOW: Cards set successfully');
  }

  addCard(card: BrazeContentCard): void {
    console.log('📥 README FLOW: Adding card to inbox service');
    console.log('🆔 README FLOW: Card ID:', card.id);
    console.log('📝 README FLOW: Card title:', card.title);
    console.log('📄 README FLOW: Card description:', card.cardDescription);

    const currentCards = this.cards();
    console.log(
      '📊 README FLOW: Current cards before adding:',
      currentCards.length
    );

    this.cards.update((curr) => [card, ...curr]);
    const updatedCards = this.cards();
    console.log('📊 README FLOW: Cards after adding:', updatedCards.length);
    console.log('📋 README FLOW: Updated cards list:', updatedCards);

    this.updateUnreadCount();
    console.log('🔔 README FLOW: Unread count updated to:', this.unreadCount());
    console.log('✅ README FLOW: Card added successfully');
  }

  markAsViewed(card: BrazeContentCard): void {
    console.log('👁️ README FLOW: Marking card as viewed');
    console.log('🆔 README FLOW: Card ID:', card.id);
    console.log('📝 README FLOW: Card title:', card.title);

    this.cards.update((curr) =>
      curr.map((c) => (c.id === card.id ? { ...c, viewed: true } : c))
    );
    this.updateUnreadCount();
    console.log('✅ README FLOW: Card marked as viewed');
  }

  dismissCard(card: BrazeContentCard): void {
    console.log('🗑️ README FLOW: Dismissing card');
    console.log('🆔 README FLOW: Card ID:', card.id);
    console.log('📝 README FLOW: Card title:', card.title);

    this.cards.update((curr) =>
      curr.map((c) => (c.id === card.id ? { ...c, dismissed: true } : c))
    );
    this.updateUnreadCount();
    console.log('✅ README FLOW: Card dismissed');
  }

  private updateUnreadCount(): void {
    const currentCards = this.cards();
    const unreadCards = currentCards.filter((c) => !c.viewed && !c.dismissed);
    const count = unreadCards.length;

    console.log('📊 README FLOW: Updating unread count');
    console.log('📋 README FLOW: Total cards:', currentCards.length);
    console.log('📋 README FLOW: Unread cards:', unreadCards.length);
    console.log(
      '📋 README FLOW: Unread card IDs:',
      unreadCards.map((c) => c.id)
    );

    this.unreadCount.set(count);
    console.log('🔔 README FLOW: Unread count set to:', count);
    console.log(
      '📋 README STEP 5: UI should now update to reflect new unread count'
    );
  }

  // Debug method to get service status
  getStatus(): void {
    console.log('📊 InboxService: Current Status');
    console.log('📋 Total cards:', this.cards().length);
    console.log('🔔 Unread count:', this.unreadCount());
    console.log('📋 All cards:', this.cards());
    console.log(
      '📋 Unread cards:',
      this.cards().filter((c) => !c.viewed && !c.dismissed)
    );
  }
}
