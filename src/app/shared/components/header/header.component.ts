import { Component, Input, Output, EventEmitter } from '@angular/core';

import { InboxButtonComponent } from '../inbox-button/inbox-button.component';
import { chevronBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { IonicStandaloneModule } from '../../ionic-standalone.module';

@Component({
  selector: 'app-header',
  template: `
    <ion-header>
      <ion-toolbar>
        <!-- Back Button -->
        <ion-buttons slot="start" *ngIf="showBackButton">
          <ion-button (click)="backEvent.emit()">
            <ion-icon slot="icon-only" name="chevron-back-outline"></ion-icon>
          </ion-button>
        </ion-buttons>

        <ion-title>Mama Money</ion-title>

        <!-- Inbox Button -->
        <ion-buttons slot="end" *ngIf="showInboxButton">
          <app-inbox-button></app-inbox-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
  `,
  standalone: true,
  imports: [IonicStandaloneModule, InboxButtonComponent],
})
export class HeaderComponent {
  @Input() showInboxButton = false;
  @Input() showBackButton = false;
  @Output() backEvent = new EventEmitter<void>();

  constructor() {
    addIcons({ chevronBackOutline });
  }
}
