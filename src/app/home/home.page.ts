import { Component, inject } from '@angular/core';
import { HeaderComponent } from '@components/header/header.component';
import { MmCardComponent } from '@components/mm-card/mm-card.component';
import { IonicModule } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import * as braze from '@braze/web-sdk';
import { InboxService } from '@services/inbox.service';
import { BrazeContentCard } from '../shared/models/braze/braze-content-card';

@Component({
  selector: 'app-home',
  template: `<ion-header mode="ios" class="ion-no-border">
      <app-header [showInboxButton]="true"></app-header>
    </ion-header>

    <ion-content [fullscreen]="true" class="ion-padding">
      <app-mm-card title="Implementation Task">
        <p class="m-b-2">
          Implement functionality to send
          <strong>INBOX_MESSAGE_TEST</strong> custom event to Braze.
        </p>
        <p class="m-b-2">
          Braze will send a push notification back to inform the client that
          there is a new content card available.
        </p>
        <p>
          <strong>Note:</strong> Push notifications may take awhile to arrive
        </p>
      </app-mm-card>

      <ion-button
        (click)="sendInboxTestEvent()"
        color="primary"
        expand="block"
        size="large"
        fill="solid"
        class="m-t-4"
      >
        Send Test Event
      </ion-button>

      <ion-button
        (click)="testCompleteFlow()"
        color="secondary"
        expand="block"
        class="m-t-2"
      >
        🧪 Test Complete README Flow
      </ion-button>
    </ion-content> `,
  styles: [],
  standalone: true,
  imports: [IonicModule, HeaderComponent, MmCardComponent],
})
export class HomePage {
  private readonly inboxService = inject(InboxService);
  private readonly toastController = inject(ToastController);

  async sendInboxTestEvent(): Promise<void> {
    console.log('🚀 README FLOW: Starting INBOX_MESSAGE_TEST event process');
    console.log(
      '📋 README STEP 1: Sending custom event "INBOX_MESSAGE_TEST" via Braze SDK'
    );
    console.log('🕐 README FLOW: Timestamp:', new Date().toISOString());

    try {
      // Log Braze initialization status
      console.log('🔍 README FLOW: Checking Braze initialization status...');
      console.log(
        '📋 README FLOW: Braze isInitialized:',
        braze.isInitialized()
      );
      console.log('📋 README FLOW: Braze isDisabled:', braze.isDisabled());

      // Log current Braze user info
      console.log('👤 README FLOW: Getting current Braze user info...');
      const currentUser = braze.getUser();
      console.log('📋 README FLOW: Current Braze user:', currentUser);

      // Log device info
      console.log('📱 README FLOW: Getting Braze device info...');
      const deviceId = braze.getDeviceId();
      console.log('📋 README FLOW: Braze device ID:', deviceId);

      // Log push notification status
      console.log('🔔 README FLOW: Checking push notification status...');
      console.log('📋 README FLOW: Push supported:', braze.isPushSupported());
      console.log(
        '📋 README FLOW: Push permission granted:',
        braze.isPushPermissionGranted()
      );
      console.log('📋 README FLOW: Push blocked:', braze.isPushBlocked());

      // Log current content cards before sending event
      console.log(
        '📋 README FLOW: Checking current content cards before event...'
      );
      const currentCards = braze.getCachedContentCards();
      console.log(
        '📋 README FLOW: Current content cards count:',
        currentCards ? 'Present' : 'None'
      );
      console.log('📋 README FLOW: Current content cards:', currentCards);

      console.log(
        '📤 README FLOW: Calling braze.logCustomEvent("INBOX_MESSAGE_TEST")'
      );
      braze.logCustomEvent('INBOX_MESSAGE_TEST');

      console.log(
        '✅ README FLOW: Braze event INBOX_MESSAGE_TEST sent successfully'
      );
      console.log(
        '📬 README FLOW: Braze will now trigger a campaign to send push notification'
      );
      console.log('⏳ README FLOW: Waiting for push notification to arrive...');
      console.log(
        '📋 README STEP 2: Push notification should arrive with type "inbox" in extras'
      );
      console.log(
        '📋 README STEP 3: PushNotificationService will handle the notification'
      );
      console.log(
        '📋 README STEP 4: Content cards will be fetched and filtered'
      );
      console.log('📋 README STEP 5: UI will update to reflect new messages');

      // Start real polling to check Braze for notifications
      console.log(
        '🔄 README FLOW: Starting real polling to check Braze for notifications'
      );
      await this.startBrazePolling();
    } catch (err) {
      console.error('❌ README FLOW: Failed to send Braze custom event:', err);
      console.error('🔍 README FLOW: Error details:', {
        error: err instanceof Error ? err.message : String(err),
        timestamp: new Date().toISOString(),
        step: 'sendInboxTestEvent',
        brazeInitialized: braze.isInitialized(),
        brazeDisabled: braze.isDisabled(),
      });
    }
  }

  private async startBrazePolling(): Promise<void> {
    console.log(
      '⏱️ README FLOW: Starting real Braze polling for notifications'
    );
    console.log(
      '🕐 README FLOW: Polling start time:',
      new Date().toISOString()
    );

    let pollCount = 0;
    const maxPolls = 30; // Poll for 30 seconds (30 * 1 second intervals)
    const pollInterval = 1000; // 1 second intervals

    const pollForBrazeNotifications = async () => {
      pollCount++;
      const currentTime = new Date().toISOString();
      console.log(
        `🔄 README FLOW: Polling attempt ${pollCount}/${maxPolls} at ${currentTime}`
      );

      try {
        // Log Braze status on each poll
        console.log('🔍 README FLOW: Braze status check:');
        console.log('  - Initialized:', braze.isInitialized());
        console.log('  - Disabled:', braze.isDisabled());
        console.log('  - Push supported:', braze.isPushSupported());
        console.log(
          '  - Push permission granted:',
          braze.isPushPermissionGranted()
        );

        // Request fresh content cards from Braze
        console.log(
          '📋 README FLOW: Requesting fresh content cards from Braze'
        );
        braze.requestContentCardsRefresh();
        console.log('✅ README FLOW: Content cards refresh requested');

        // Get current content cards using the correct API
        console.log('📋 README FLOW: Getting current content cards from Braze');
        const contentCards = braze.getCachedContentCards();
        console.log(
          '📋 README FLOW: Content cards response type:',
          typeof contentCards
        );
        console.log(
          '📋 README FLOW: Content cards is array:',
          Array.isArray(contentCards)
        );
        console.log(
          '📋 README FLOW: Content cards length:',
          contentCards ? 'Present' : 'None'
        );
        console.log(
          '📋 README FLOW: Current Braze content cards:',
          contentCards
        );

        // Log the structure of the ContentCards object
        if (contentCards) {
          console.log(
            '📋 README FLOW: ContentCards object keys:',
            Object.keys(contentCards)
          );
          console.log('📋 README FLOW: ContentCards object structure:', {
            hasCards: 'cards' in contentCards,
            hasCount: 'count' in contentCards,
            hasLength: 'length' in contentCards,
            cardsProperty: (contentCards as any).cards,
            countProperty: (contentCards as any).count,
            lengthProperty: (contentCards as any).length,
          });
        }

        // Check if we have new inbox cards - handle ContentCards object properly
        let cardsArray: any[] = [];

        if (contentCards) {
          // Try different ways to access the cards array from the ContentCards object
          if (
            (contentCards as any).cards &&
            Array.isArray((contentCards as any).cards)
          ) {
            cardsArray = (contentCards as any).cards;
            console.log(
              '📋 README FLOW: Found cards array in contentCards.cards'
            );
          } else if (
            (contentCards as any).count &&
            (contentCards as any).count > 0
          ) {
            // If it has a count but no cards array, try to access it differently
            console.log(
              '📋 README FLOW: ContentCards has count but no cards array'
            );
            console.log(
              '📋 README FLOW: ContentCards count:',
              (contentCards as any).count
            );
          } else if (Array.isArray(contentCards)) {
            // Fallback: maybe it's actually an array
            cardsArray = contentCards;
            console.log('📋 README FLOW: ContentCards is actually an array');
          } else {
            console.log(
              '📋 README FLOW: ContentCards structure not recognized'
            );
            console.log(
              '📋 README FLOW: Full ContentCards object:',
              JSON.stringify(contentCards, null, 2)
            );
          }
        }

        console.log(
          '📋 README FLOW: Processed cards array length:',
          cardsArray.length
        );

        if (cardsArray.length > 0) {
          console.log('📬 README FLOW: Found content cards from Braze!');
          console.log('📋 README STEP 2: Processing Braze content cards');
          console.log('📊 README FLOW: Total cards found:', cardsArray.length);

          // Log details of each card
          cardsArray.forEach((card: any, index: number) => {
            console.log(`📋 README FLOW: Card ${index + 1} details:`, {
              id: card.id,
              title: card.title,
              type: card.type,
              extras: card.extras,
              created: card.created,
              viewed: card.viewed,
              clicked: card.clicked,
              dismissed: card.dismissed,
              url: card.url,
              image: card.image,
              cardDescription: card.cardDescription,
              description: card.description,
            });
          });

          const inboxCards = cardsArray.filter((card: any) => {
            console.log('🔍 README FLOW: Checking card for inbox type:', {
              cardId: card.id,
              cardType: card.type,
              cardExtras: card.extras,
              extrasType: card.extras?.type,
              isInbox: card.extras?.type === 'inbox' || card.type === 'inbox',
            });
            return card.extras?.type === 'inbox' || card.type === 'inbox';
          });

          console.log('📊 README FLOW: Inbox cards found:', inboxCards.length);

          if (inboxCards.length > 0) {
            console.log('📬 README STEP 2: Found inbox cards from Braze!');
            console.log('📋 README STEP 3: Processing inbox content cards');
            console.log(
              '📊 README FLOW: Processing',
              inboxCards.length,
              'inbox cards'
            );

            for (const card of inboxCards) {
              console.log('📋 README FLOW: Processing Braze inbox card:', {
                id: card.id,
                title: card.title,
                type: card.type,
                extras: card.extras,
                created: card.created,
                viewed: card.viewed,
                clicked: card.clicked,
                dismissed: card.dismissed,
                url: card.url,
                image: card.image,
                cardDescription: card.cardDescription,
                description: card.description,
              });

              try {
                // Convert Braze card to our format
                const convertedCard: BrazeContentCard = {
                  id: card.id || `braze-card-${Date.now()}`,
                  created: card.created || Date.now(),
                  expiresAt:
                    card.expiresAt || Date.now() + 7 * 24 * 60 * 60 * 1000,
                  viewed: card.viewed || false,
                  clicked: card.clicked || false,
                  pinned: card.pinned || false,
                  dismissed: card.dismissed || false,
                  dismissible: card.dismissible !== false,
                  url: card.url || '',
                  openURLInWebView: card.openURLInWebView || false,
                  extras: card.extras || {},
                  image: card.image || '',
                  title: card.title || 'Braze Message',
                  cardDescription:
                    card.cardDescription ||
                    card.description ||
                    'Message from Braze',
                  domain: card.domain || '',
                  type: card.type || 'inbox',
                };

                console.log(
                  '✅ README FLOW: Converted Braze card:',
                  convertedCard
                );
                console.log('📥 README FLOW: Adding card to inbox service...');
                this.inboxService.addCard(convertedCard);
                console.log('📥 README FLOW: Braze card added to inbox');

                // Show toast notification
                console.log(
                  '🍞 README FLOW: Showing Braze notification toast...'
                );
                await this.showBrazeNotificationToast(convertedCard);

                console.log(
                  '📋 README STEP 5: UI updated with Braze notification'
                );
                console.log(
                  '🎯 README FLOW: Bell should now shake and show red dot'
                );
                return; // Stop polling once we find and process cards
              } catch (error) {
                console.error(
                  '❌ README FLOW: Error processing Braze card:',
                  error
                );
                console.error('🔍 README FLOW: Error details:', {
                  error: error instanceof Error ? error.message : String(error),
                  cardId: card.id,
                  cardTitle: card.title,
                });
              }
            }
          } else {
            console.log(
              '📭 README FLOW: No inbox cards found in Braze content cards'
            );
            console.log(
              '🔍 README FLOW: All cards checked, none have inbox type'
            );
          }
        } else {
          console.log(
            '📭 README FLOW: No content cards available from Braze yet'
          );
          console.log('📋 README FLOW: Content cards response:', contentCards);
        }

        // Continue polling if we haven't found cards yet
        if (pollCount < maxPolls) {
          console.log(
            `⏳ README FLOW: No notifications yet, continuing to poll... (${pollCount}/${maxPolls})`
          );
          console.log(`⏱️ README FLOW: Next poll in ${pollInterval}ms`);
          setTimeout(pollForBrazeNotifications, pollInterval);
        } else {
          console.log(
            '⏰ README FLOW: Polling timeout reached, no Braze notifications received'
          );
          console.log(
            '🕐 README FLOW: Polling end time:',
            new Date().toISOString()
          );
          console.log('📊 README FLOW: Total polling attempts:', pollCount);
          await this.showTimeoutToast();
        }
      } catch (error) {
        console.error('❌ README FLOW: Error during Braze polling:', error);
        console.error('🔍 README FLOW: Polling error details:', {
          error: error instanceof Error ? error.message : String(error),
          pollCount,
          maxPolls,
          brazeInitialized: braze.isInitialized(),
          brazeDisabled: braze.isDisabled(),
        });
        if (pollCount < maxPolls) {
          console.log('🔄 README FLOW: Continuing polling despite error...');
          setTimeout(pollForBrazeNotifications, pollInterval);
        }
      }
    };

    // Start the polling
    console.log('🚀 README FLOW: Starting polling timer...');
    setTimeout(pollForBrazeNotifications, pollInterval);
  }

  private async showBrazeNotificationToast(
    card: BrazeContentCard
  ): Promise<void> {
    const toast = await this.toastController.create({
      header: card.title || '📨 Braze Notification',
      message: card.cardDescription || 'New message from Braze',
      duration: 4000,
      position: 'top',
      color: 'success',
      buttons: [
        {
          text: 'View',
          handler: () => {
            console.log('👆 README FLOW: Braze toast "View" button clicked');
          },
        },
        {
          text: 'Dismiss',
          role: 'cancel',
        },
      ],
    });

    await toast.present();
    console.log('✅ README FLOW: Braze notification toast displayed');
  }

  private async showTimeoutToast(): Promise<void> {
    const toast = await this.toastController.create({
      header: '⏰ Polling Timeout',
      message:
        'No Braze notifications received within 30 seconds. Check Braze dashboard for campaign setup.',
      duration: 6000,
      position: 'top',
      color: 'warning',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
        },
      ],
    });

    await toast.present();
    console.log('⚠️ README FLOW: Polling timeout toast displayed');
  }

  async testCompleteFlow(): Promise<void> {
    console.log('🧪 README FLOW: Testing complete README process flow');
    console.log('📋 README STEP 1: Simulating Braze event trigger');

    try {
      // Step 1: Send Braze event
      console.log('📤 README FLOW: Sending Braze event');
      braze.logCustomEvent('INBOX_MESSAGE_TEST');

      // Step 2: Simulate push notification arrival
      console.log('📨 README STEP 2: Simulating push notification arrival');
      await this.simulatePushNotification();

      // Step 3: Show toast notification
      console.log('🍞 README FLOW: Showing toast notification');
      await this.showTestToast();

      console.log('✅ README FLOW: Complete test flow finished');
    } catch (error) {
      console.error('❌ README FLOW: Error in test flow:', error);
    }
  }

  private async simulatePushNotification(): Promise<void> {
    console.log('📨 README FLOW: Simulating push notification with inbox type');

    // Create a test card that would come from Braze
    const testCard: BrazeContentCard = {
      id: 'test-braze-card-' + Date.now(),
      created: Date.now(),
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      viewed: false,
      clicked: false,
      pinned: false,
      dismissed: false,
      dismissible: true,
      url: 'https://example.com/test-braze',
      openURLInWebView: false,
      extras: {
        type: 'inbox',
        logEvent: 'test_braze_event',
        subtitle: 'Test Message',
      },
      image:
        'https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Braze+Test',
      title: '🎯 Test Braze Message',
      cardDescription:
        'This is a test message from the Braze INBOX_MESSAGE_TEST event',
      domain: 'example.com',
      type: 'inbox',
    };

    console.log('📋 README STEP 3: Adding test card to inbox service');
    this.inboxService.addCard(testCard);

    console.log('📋 README STEP 4: Card added, should trigger UI updates');
    console.log('📋 README STEP 5: Bell should now shake and show red dot');
  }

  private async showTestToast(): Promise<void> {
    const toast = await this.toastController.create({
      header: '📨 Test Notification',
      message: 'This simulates a push notification from Braze with inbox type',
      duration: 4000,
      position: 'top',
      color: 'primary',
      buttons: [
        {
          text: 'View',
          handler: () => {
            console.log('👆 README FLOW: Toast "View" button clicked');
          },
        },
        {
          text: 'Dismiss',
          role: 'cancel',
        },
      ],
    });

    await toast.present();
    console.log('✅ README FLOW: Test toast notification displayed');
  }
}
