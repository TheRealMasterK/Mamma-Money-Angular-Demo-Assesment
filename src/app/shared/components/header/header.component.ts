import { Component, Input } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

import { InboxButtonComponent } from '../inbox-button/inbox-button.component';

@Component({
  selector: 'app-header',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Mama Money</ion-title>
        <ion-buttons slot="end" *ngIf="showInboxButton">
          <app-inbox-button slot="end"></app-inbox-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
  `,
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    InboxButtonComponent,
  ],
})
export class HeaderComponent {
  @Input() showInboxButton = false;
}
