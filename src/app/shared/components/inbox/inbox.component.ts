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
  IonThumbnail,
  IonChip,
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { InboxService } from '@services/inbox.service';
import { addIcons } from 'ionicons';
import { openOutline, trashOutline, timeOutline } from 'ionicons/icons';
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
    IonThumbnail,
    IonChip,
    NgForOf,
    NgIf,
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Inbox ({{ inboxCards().length }})</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="close()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item *ngFor="let card of inboxCards()" class="card-item">
          <ion-thumbnail slot="start" *ngIf="card.image">
            <img [src]="card.image" [alt]="card.title" />
          </ion-thumbnail>

          <ion-label (click)="openCard(card)" class="card-content">
            <div class="card-header">
              <h2>{{ card.title }}</h2>
              <ion-chip
                *ngIf="card.extras?.subtitle"
                color="primary"
                size="small"
              >
                {{ card.extras.subtitle }}
              </ion-chip>
            </div>
            <p class="card-description">{{ card.cardDescription }}</p>
            <div class="card-meta">
              <ion-text color="medium">
                <small>
                  <ion-icon name="time-outline"></ion-icon>
                  {{ getTimeAgo(card.created) }}
                </small>
              </ion-text>
              <ion-text *ngIf="!card.viewed" color="primary">
                <small>• New</small>
              </ion-text>
            </div>
          </ion-label>

          <ion-button
            fill="clear"
            color="primary"
            (click)="openCard(card)"
            slot="end"
          >
            <ion-icon slot="icon-only" name="open-outline"></ion-icon>
          </ion-button>
          <ion-button
            fill="clear"
            color="danger"
            (click)="dismissCard(card)"
            slot="end"
          >
            <ion-icon slot="icon-only" name="trash-outline"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-list>

      <!-- Show "no notifications" message when no cards -->
      <div *ngIf="inboxCards().length === 0" class="no-cards-message">
        <ion-text color="medium">
          <h2>No notifications</h2>
          <p>You don't have any messages in your inbox right now.</p>
          <p>Press "Add Test Notification" to see some sample messages!</p>
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

      .card-item {
        --padding-start: 16px;
        --padding-end: 16px;
        --padding-top: 12px;
        --padding-bottom: 12px;
        margin-bottom: 8px;
        border-radius: 8px;
        margin-left: 8px;
        margin-right: 8px;
      }

      .card-content {
        flex: 1;
      }

      .card-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 4px;
      }

      .card-header h2 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
        flex: 1;
      }

      .card-description {
        margin: 4px 0;
        font-size: 0.9rem;
        color: var(--ion-color-medium);
        line-height: 1.4;
      }

      .card-meta {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 4px;
      }

      .card-meta ion-icon {
        font-size: 0.8rem;
        margin-right: 2px;
      }

      .card-meta small {
        font-size: 0.75rem;
      }

      ion-thumbnail {
        --size: 60px;
        border-radius: 8px;
        overflow: hidden;
      }

      ion-thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `,
  ],
})
export class InboxComponent implements OnInit {
  private readonly modalController = inject(ModalController);
  private readonly inboxService = inject(InboxService);
  private readonly router = inject(Router);
  inboxCards = this.inboxService.cards;

  constructor() {
    addIcons({ openOutline, trashOutline, timeOutline });
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
    console.log('📋 README FLOW: Opening card:', card.title);
    this.inboxService.markAsViewed(card);

    if (card.url) {
      console.log('🔗 README FLOW: Opening URL:', card.url);
      this.router.navigateByUrl(card.url);
    }
  }

  dismissCard(card: BrazeContentCard): void {
    console.log('🗑️ README FLOW: Dismissing card:', card.title);
    this.inboxService.dismissCard(card);
  }

  close(): void {
    this.modalController.dismiss();
  }

  getTimeAgo(timestamp: number): string {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  }
}
