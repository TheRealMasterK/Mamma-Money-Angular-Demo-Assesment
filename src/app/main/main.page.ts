import { Component, inject } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { InboxService } from '@services/inbox.service';
import { PushNotificationService } from '@services/push-notification.service';
import * as braze from '@braze/web-sdk';
import { BrazeContentCard } from '../shared/models/braze/braze-content-card';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class MainPage {
  private readonly inboxService = inject(InboxService);
  private readonly pushNotificationService = inject(PushNotificationService);

  unreadCount = this.inboxService.unreadCount;
  totalCards = this.inboxService.cards;

  constructor() {
    console.log('🚀 MainPage: Constructor called');
  }

  addTestNotification(): void {
    console.log('🧪 MainPage: Adding test notifications');
    try {
      const testCards: BrazeContentCard[] = [
        {
          id: 'test-card-1-' + Date.now(),
          created: Date.now(),
          expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
          viewed: false,
          clicked: false,
          pinned: false,
          dismissed: false,
          dismissible: true,
          url: 'https://example.com/card1',
          openURLInWebView: false,
          extras: {
            type: 'promotion',
            logEvent: 'promo_clicked',
            subtitle: 'Special Offer',
          },
          image:
            'https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Special+Offer',
          title: '🎉 Special Promotion!',
          cardDescription:
            'Get 20% off your next purchase. Limited time offer!',
          domain: 'example.com',
          type: 'promotion',
        },
        {
          id: 'test-card-2-' + Date.now(),
          created: Date.now() - 1000 * 60 * 30, // 30 minutes ago
          expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
          viewed: false,
          clicked: false,
          pinned: false,
          dismissed: false,
          dismissible: true,
          url: 'https://example.com/card2',
          openURLInWebView: false,
          extras: {
            type: 'news',
            logEvent: 'news_clicked',
            subtitle: 'Latest News',
          },
          image:
            'https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=Latest+News',
          title: '📰 Latest News Update',
          cardDescription:
            'Stay updated with our latest company news and announcements.',
          domain: 'example.com',
          type: 'news',
        },
        {
          id: 'test-card-3-' + Date.now(),
          created: Date.now() - 1000 * 60 * 60, // 1 hour ago
          expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
          viewed: false,
          clicked: false,
          pinned: false,
          dismissed: false,
          dismissible: true,
          url: 'https://example.com/card3',
          openURLInWebView: false,
          extras: {
            type: 'reminder',
            logEvent: 'reminder_clicked',
            subtitle: 'Important Reminder',
          },
          image:
            'https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=Reminder',
          title: '⏰ Important Reminder',
          cardDescription:
            "Don't forget to complete your profile setup for better experience.",
          domain: 'example.com',
          type: 'reminder',
        },
        {
          id: 'test-card-4-' + Date.now(),
          created: Date.now() - 1000 * 60 * 90, // 1.5 hours ago
          expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
          viewed: false,
          clicked: false,
          pinned: false,
          dismissed: false,
          dismissible: true,
          url: 'https://example.com/card4',
          openURLInWebView: false,
          extras: {
            type: 'welcome',
            logEvent: 'welcome_clicked',
            subtitle: 'Welcome Message',
          },
          image:
            'https://via.placeholder.com/300x200/96CEB4/FFFFFF?text=Welcome',
          title: '👋 Welcome to Our App!',
          cardDescription:
            'Thank you for joining us. Explore our features and get started.',
          domain: 'example.com',
          type: 'welcome',
        },
        {
          id: 'test-card-5-' + Date.now(),
          created: Date.now() - 1000 * 60 * 120, // 2 hours ago
          expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
          viewed: false,
          clicked: false,
          pinned: false,
          dismissed: false,
          dismissible: true,
          url: 'https://example.com/card5',
          openURLInWebView: false,
          extras: {
            type: 'feature',
            logEvent: 'feature_clicked',
            subtitle: 'New Feature',
          },
          image:
            'https://via.placeholder.com/300x200/FFEAA7/000000?text=New+Feature',
          title: '✨ New Feature Available',
          cardDescription:
            'Check out our latest feature that will enhance your experience.',
          domain: 'example.com',
          type: 'feature',
        },
      ];

      testCards.forEach((card, index) => {
        console.log(`📋 Adding test card ${index + 1}:`, card.title);
        this.inboxService.addCard(card);
      });

      console.log('✅ MainPage: Test notifications added successfully');
      console.log(
        '🔔 MainPage: Bell should now light up with',
        testCards.length,
        'unread notifications'
      );
    } catch (error) {
      console.error('❌ MainPage: Error adding test notifications:', error);
    }
  }

  sendBrazeEvent(): void {
    console.log('📤 MainPage: Sending Braze event');
    try {
      const eventName = 'INBOX_MESSAGE_TEST';
      const eventProperties = {
        timestamp: Date.now(),
        platform: 'android',
        test: true,
        source: 'manual_button_click',
      };
      console.log('📋 Braze event details:', {
        eventName,
        eventProperties,
      });
      braze.logCustomEvent(eventName, eventProperties);
      console.log('✅ MainPage: Braze event sent successfully');
      braze.logPurchase('test_product', 0.99, 'USD', 1); // Corrected currency order
      console.log('💰 MainPage: Braze purchase event sent for testing');
    } catch (error) {
      console.error('❌ MainPage: Error sending Braze event:', error);
    }
  }

  clearInbox(): void {
    console.log('🗑️ MainPage: Clearing inbox');
    try {
      this.inboxService.setCards([]);
      console.log('✅ MainPage: Inbox cleared successfully');
    } catch (error) {
      console.error('❌ MainPage: Error clearing inbox:', error);
    }
  }
}
