import { Component, inject } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { ModalController, IonicModule } from '@ionic/angular';
import { InboxService } from '@services/inbox.service';
import { addIcons } from 'ionicons';
import { openOutline, trashOutline } from 'ionicons/icons';
import { BrazeContentCard } from '@models/braze/braze-content-card';
import { NgForOf } from '@angular/common';

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
    IonButtons, // ✅ Added missing import
    IonicModule,
    NgForOf,
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
    </ion-content>
  `,
})
export class InboxComponent {
  private readonly modalController = inject(ModalController);
  private readonly inboxService = inject(InboxService);
  inboxCards = this.inboxService.cards;

  constructor() {
    addIcons({ openOutline, trashOutline });
  }

  openCard(card: BrazeContentCard): void {
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
      this.inboxService.dismissCard(card.id);
    }
  }

  close(): void {
    this.modalController.dismiss();
  }
}
