import {
  AfterViewInit,
  Component,
  input,
  signal,
  inject,
  effect,
  ElementRef,
} from '@angular/core';
import { IonButton, IonIcon, IonAccordion } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { notificationsOutline } from 'ionicons/icons';
import anime, { AnimeInstance } from 'animejs';
import { InboxComponent } from '../inbox/inbox.component';
import { InboxService } from '@services/inbox.service';

@Component({
  selector: 'app-inbox-button',
  template: `
    <div class="notification-button">
      @if (unreadMessages()) {
      <svg
        class="notification-button-unread"
        height="10"
        width="10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle r="4.5" cx="5" cy="5" fill="red" />
      </svg>
      }
      <ion-button
        #bellButton
        class="bell"
        [slot]="slot()"
        fill="clear"
        (click)="showInbox()"
      >
        <ion-icon
          color="dark"
          slot="icon-only"
          name="notifications-outline"
        ></ion-icon>
      </ion-button>
    </div>
  `,
  styles: [
    `
      ion-button {
        --padding-end: 0.5rem;
        --padding-start: 0.5rem;
        font-size: 1.75rem;
      }

      .notification-button {
        position: relative;
        svg {
          position: absolute;
          top: 30%;
          right: 25%;
          z-index: 99;
        }
      }

      .bell.shake {
        animation: shake 0.5s ease-in-out;
      }

      @keyframes shake {
        0%,
        100% {
          transform: translateX(0);
        }
        10%,
        30%,
        50%,
        70%,
        90% {
          transform: translateX(-5px);
        }
        20%,
        40%,
        60%,
        80% {
          transform: translateX(5px);
        }
      }
    `,
  ],
  imports: [IonButton, IonIcon, IonAccordion],
  standalone: true,
})
export class InboxButtonComponent implements AfterViewInit {
  readonly slot = input<IonAccordion['toggleIconSlot']>();
  unreadMessages = signal(false);
  private shakeAnimation?: AnimeInstance;
  private readonly modalController = inject(ModalController);
  private readonly inboxService = inject(InboxService);
  private readonly elementRef = inject(ElementRef);

  constructor() {
    addIcons({ notificationsOutline });

    // ✅ Reactively update the unread indicator
    effect(
      () => {
        const unreadCount = this.inboxService.unreadCount();
        const hasUnread = unreadCount > 0;
        console.log(
          '🔔 README FLOW: InboxButton unread count changed to:',
          unreadCount,
          'hasUnread:',
          hasUnread
        );

        const previousState = this.unreadMessages();
        this.unreadMessages.set(hasUnread);

        // Only trigger shake if we're going from no unread to having unread
        if (hasUnread && !previousState) {
          console.log(
            '🎯 README FLOW: Starting shake animation - NEW MESSAGE!'
          );
          console.log(
            '📋 README STEP 5: UI Updates - Bell should now show unread indicator'
          );
          this.triggerShake();
        }
      },
      { allowSignalWrites: true }
    );
  }

  private triggerShake(): void {
    try {
      // Method 1: Try anime.js animation
      if (this.shakeAnimation) {
        console.log('🎬 InboxButton: Using anime.js shake animation');
        this.shakeAnimation.restart();
      } else {
        // Method 2: Fallback to CSS animation
        console.log('🎬 InboxButton: Using CSS shake animation');
        const bellElement =
          this.elementRef.nativeElement.querySelector('.bell');
        if (bellElement) {
          bellElement.classList.add('shake');
          setTimeout(() => {
            bellElement.classList.remove('shake');
          }, 500);
        }
      }
    } catch (error) {
      console.error('❌ InboxButton: Error triggering shake animation:', error);
    }
  }

  async showInbox(): Promise<void> {
    try {
      const modal = await this.modalController.create({
        component: InboxComponent,
      });
      await modal.present();
    } catch (error) {
      console.error('Error showing inbox:', error);
    }
  }

  ngAfterViewInit(): void {
    console.log('🎬 InboxButton: Setting up shake animation');
    try {
      this.shakeAnimation = anime({
        targets: '.bell',
        translateX: [
          { value: -5, duration: 50 },
          { value: 5, duration: 50 },
          { value: -5, duration: 50 },
          { value: 5, duration: 50 },
          { value: -5, duration: 50 },
          { value: 5, duration: 50 },
          { value: -5, duration: 50 },
          { value: 5, duration: 50 },
          { value: 0, duration: 50 },
        ],
        easing: 'easeInOutSine',
        duration: 2000,
        autoplay: false,
      });
      console.log('✅ InboxButton: Shake animation setup complete');
    } catch (error) {
      console.error('❌ InboxButton: Error setting up shake animation:', error);
    }
  }
}
