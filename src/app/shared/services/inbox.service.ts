import { Injectable, signal } from '@angular/core';
import { BrazeContentCard } from '@models/braze/braze-content-card';

@Injectable({ providedIn: 'root' })
export class InboxService {
  cards = signal<BrazeContentCard[]>([]);
  unreadCount = signal(0);
  
  setCards(newCards: BrazeContentCard[]): void {
    this.cards.set(newCards);
    this.updateUnreadCount();
  }

  addCard(card: BrazeContentCard): void {
    this.cards.update((curr) => [card, ...curr]);
    this.updateUnreadCount();
  }

  markAsViewed(cardId: string): void {
    this.cards.update((curr) =>
      curr.map((c) => (c.id === cardId ? { ...c, viewed: true } : c))
    );
    this.updateUnreadCount();
  }

  dismissCard(cardId: string): void {
    this.cards.update((curr) => curr.filter((c) => c.id !== cardId));
    this.updateUnreadCount();
  }

  private updateUnreadCount(): void {
    const count = this.cards().filter((c) => !c.viewed && !c.dismissed).length;
    this.unreadCount.set(count);
  }
}
