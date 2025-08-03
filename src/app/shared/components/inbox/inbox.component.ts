import { Component, inject, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonButtons,
  IonText,
} from '@ionic/angular/standalone';
import { ModalController, IonicModule } from '@ionic/angular';
import { InboxService } from '@services/inbox.service';
import { addIcons } from 'ionicons';
import { openOutline, trashOutline } from 'ionicons/icons';
import { BrazeContentCard } from '@models/braze/braze-content-card';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonButtons,
    IonText,
    IonicModule,
    NgForOf,
    NgIf,
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Inbox</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="close()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item *ngFor="let card of inboxCards()">
          <ion-label (click)="openCard(card)">
            <h2>{{ card.title }}</h2>
            <p>{{ card.cardDescription }}</p>
          </ion-label>
          <ion-button fill="clear" color="primary" (click)="openCard(card)">
            <ion-icon slot="icon-only" name="open-outline"></ion-icon>
          </ion-button>
          <ion-button fill="clear" color="danger" (click)="dismissCard(card)">
            <ion-icon slot="icon-only" name="trash-outline"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-list>

      <!-- Show "no notifications" message when no cards -->
      <div *ngIf="inboxCards().length === 0" class="no-cards-message">
        <ion-text color="medium">
          <h2>No notifications</h2>
          <p>You don't have any messages in your inbox right now.</p>
        </ion-text>
      </div>
    </ion-content>
  `,
  styles: [
    `
      .no-cards-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 200px;
        text-align: center;
        padding: 20px;
      }

      .no-cards-message h2 {
        margin-bottom: 10px;
        font-size: 1.5rem;
      }

      .no-cards-message p {
        margin: 0;
        font-size: 1rem;
      }
    `,
  ],
})
export class InboxComponent implements OnInit {
  private readonly modalController = inject(ModalController);
  private readonly inboxService = inject(InboxService);
  inboxCards = this.inboxService.cards;

  constructor() {
    addIcons({ openOutline, trashOutline });
  }

  async ngOnInit(): Promise<void> {
    console.log('Inbox opened - checking for content cards...');
    // For now, just check if we have any cards in the service
    // The cards will be populated when push notifications are received
    if (this.inboxCards().length === 0) {
      console.log('No content cards found - showing empty state');
    } else {
      console.log('Found content cards:', this.inboxCards().length);
    }
  }

  openCard(card: BrazeContentCard): void {
    console.log('Opening card:', card);
    this.inboxService.markAsViewed(card.id);

    if (card.url) {
      if (card.openURLInWebView) {
        window.open(card.url, '_blank');
      } else {
        window.location.href = card.url;
      }
    }
  }

  dismissCard(card: BrazeContentCard): void {
    const confirmDismiss = confirm(
      'Are you sure you want to dismiss this message?'
    );
    if (confirmDismiss) {
      console.log('Dismissing card:', card);
      this.inboxService.dismissCard(card.id);
    }
  }

  close(): void {
    this.modalController.dismiss();
  }
}
