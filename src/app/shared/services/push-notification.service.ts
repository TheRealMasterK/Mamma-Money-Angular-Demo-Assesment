import { Injectable, inject } from '@angular/core';
import { BrazePushNotification } from '@models/braze/braze-push-notification';
import {
  PushNotifications,
  PushNotificationSchema,
} from '@capacitor/push-notifications';
import { InboxService } from '@services/inbox.service';
import { convertToBrazeContentCard } from '@utils/braze/convert-content-card';
import { BrazeAltPushContentCard } from '@models/braze/braze-push-content-card';
import { BrazeContentCard } from '@models/braze/braze-content-card';
import * as braze from '@braze/web-sdk';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  private readonly inboxService = inject(InboxService);
  private readonly toastController = inject(ToastController);
  private brazeInitialized = false;

  constructor() {
    console.log('🚀 PushNotificationService: Constructor called');
  }

  async init() {
    console.log(
      '🚀 README FLOW: PushNotificationService initialization started'
    );
    console.log(
      '📋 README REQUIREMENT: Complete implementation of PushNotificationService'
    );
    console.log('🕐 README FLOW: Init timestamp:', new Date().toISOString());

    if (!this.brazeInitialized) {
      console.log(
        '📱 README FLOW: Initializing Braze SDK for push notifications'
      );
      console.log(
        '🔑 README FLOW: Braze API Key:',
        environment.brazeApiKey ? 'Present' : 'Missing'
      );
      console.log('🌐 README FLOW: Braze Endpoint:', environment.brazeEndpoint);
      console.log('🔧 README FLOW: Environment config:', {
        brazeApiKey: environment.brazeApiKey
          ? '***' + environment.brazeApiKey.slice(-4)
          : 'Missing',
        brazeEndpoint: environment.brazeEndpoint,
        production: environment.production,
      });

      try {
        console.log('🔧 README FLOW: Calling braze.initialize()');
        braze.initialize(environment.brazeApiKey, {
          baseUrl: environment.brazeEndpoint,
        });
        console.log('✅ README FLOW: Braze SDK initialized successfully');

        console.log('🔓 README FLOW: Opening Braze session');
        braze.openSession();
        console.log('✅ README FLOW: Braze session opened');

        console.log(
          '🔍 README FLOW: Checking Braze status after initialization:'
        );
        console.log('  - isInitialized:', braze.isInitialized());
        console.log('  - isDisabled:', braze.isDisabled());
        console.log('  - isPushSupported:', braze.isPushSupported());
        console.log(
          '  - isPushPermissionGranted:',
          braze.isPushPermissionGranted()
        );
        console.log('  - isPushBlocked:', braze.isPushBlocked());

        this.brazeInitialized = true;
        console.log('🎯 README FLOW: Braze initialization complete');

        console.log(
          '📋 README REQUIREMENT: Subscribe to content cards updates'
        );
        braze.subscribeToContentCardsUpdates((cards) => {
          console.log(
            '🔄 README FLOW: Content Cards Updated - Count:',
            cards ? 'Present' : 'None'
          );
          console.log('📋 README FLOW: Raw Braze cards:', cards);
          console.log('📋 README FLOW: Cards type:', typeof cards);
          console.log('📋 README FLOW: Cards is array:', Array.isArray(cards));
          console.log(
            '📋 README FLOW: Cards length:',
            cards ? 'Present' : 'None'
          );

          if (cards && Array.isArray(cards) && cards.length > 0) {
            console.log(
              '📋 README STEP 4: Processing content cards from Braze'
            );
            console.log(
              '📊 README FLOW: Processing',
              cards.length,
              'content cards'
            );

            cards.forEach((card: any, index: number) => {
              console.log(
                `📱 README FLOW: Processing Braze card ${index + 1}:`,
                {
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
                }
              );

              try {
                const convertedCard = convertToBrazeContentCard(card);
                console.log(
                  `✅ README FLOW: Card ${index + 1} converted:`,
                  convertedCard
                );
                this.inboxService.addCard(convertedCard);
                console.log(`📥 README FLOW: Card ${index + 1} added to inbox`);
              } catch (error) {
                console.error(
                  `❌ README FLOW: Error processing card ${index + 1}:`,
                  error
                );
                console.error(
                  '🔍 README FLOW: Card processing error details:',
                  {
                    error:
                      error instanceof Error ? error.message : String(error),
                    cardId: card.id,
                    cardTitle: card.title,
                  }
                );
              }
            });
          } else {
            console.log(
              '📭 README FLOW: No Braze cards received or empty array'
            );
            console.log('📋 README FLOW: Cards response:', cards);
          }
        });

        braze.subscribeToSdkAuthenticationFailures((error) => {
          console.error('🚫 README FLOW: Braze Authentication Failed:', error);
          console.error('🔍 README FLOW: Authentication error details:', {
            error: error instanceof Error ? error.message : String(error),
            timestamp: new Date().toISOString(),
          });
        });

        braze.subscribeToInAppMessage((message) => {
          console.log(
            '📨 README FLOW: Braze In-App Message Received:',
            message
          );
          console.log('📋 README FLOW: In-app message details:', {
            messageId: 'id' in message ? message.id : 'N/A',
            messageType: 'type' in message ? message.type : 'N/A',
            messageText: 'message' in message ? message.message : 'N/A',
            timestamp: new Date().toISOString(),
          });
        });
      } catch (error) {
        console.error('❌ README FLOW: Error initializing Braze:', error);
        console.error('🔍 README FLOW: Braze initialization error details:', {
          error: error instanceof Error ? error.message : String(error),
          timestamp: new Date().toISOString(),
          environment: {
            brazeApiKey: environment.brazeApiKey ? 'Present' : 'Missing',
            brazeEndpoint: environment.brazeEndpoint,
          },
        });
      }
    } else {
      console.log('🔄 README FLOW: Braze already initialized, skipping...');
    }

    console.log(
      '📋 README REQUIREMENT: Set up FCM listeners for push notifications'
    );
    console.log('🔔 README FLOW: Setting up FCM listeners...');

    PushNotifications.addListener('registration', (token) => {
      console.log('🎫 README FLOW: FCM Registration Token Received:', token);
      console.log('📱 README FLOW: Token length:', token.value?.length || 0);
      console.log('📋 README FLOW: Token details:', {
        value: token.value ? '***' + token.value.slice(-10) : 'Missing',
        timestamp: new Date().toISOString(),
      });

      if (this.brazeInitialized) {
        try {
          console.log('👤 README FLOW: Setting Braze user for debugging');
          const debugUserId = 'debug-user-' + Date.now();
          braze.changeUser(debugUserId);
          console.log(
            '✅ README FLOW: Braze user changed for debugging:',
            debugUserId
          );

          // Log user info after change
          const user = braze.getUser();
          console.log('📋 README FLOW: Current Braze user after change:', user);
        } catch (error) {
          console.error('❌ README FLOW: Error changing Braze user:', error);
          console.error('🔍 README FLOW: User change error details:', {
            error: error instanceof Error ? error.message : String(error),
            timestamp: new Date().toISOString(),
          });
        }
      }
    });

    PushNotifications.addListener('registrationError', (error) => {
      console.error('❌ README FLOW: FCM Registration Error:', error);
      console.error('🔍 README FLOW: Registration error details:', {
        error: error.error,
        timestamp: new Date().toISOString(),
        brazeInitialized: this.brazeInitialized,
      });
    });

    console.log(
      '📋 README REQUIREMENT: Implement pushNotificationReceived listener'
    );
    console.log(
      '📋 README TODO: Check if notification type is "inbox" and refetch content cards'
    );

    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotificationSchema | BrazePushNotification) => {
        console.log(
          '📨 README STEP 2: Push Notification Received:',
          notification
        );
        console.log(
          '📋 README FLOW: Notification data:',
          (notification as any)?.data
        );
        console.log('📋 README FLOW: Notification type:', typeof notification);
        console.log(
          '📋 README FLOW: Notification keys:',
          Object.keys(notification)
        );
        console.log(
          '🕐 README FLOW: Notification received at:',
          new Date().toISOString()
        );

        await this.showNotificationToast(notification);

        if ('title' in notification) {
          console.log(
            '📝 README FLOW: Notification title:',
            notification.title
          );
        }
        if ('body' in notification) {
          console.log('📄 README FLOW: Notification body:', notification.body);
        }

        try {
          const rawExtra = (notification as any)?.data?.extra;
          console.log('🔍 README FLOW: Raw extra data:', rawExtra);

          if (!rawExtra) {
            console.log('⚠️ README FLOW: No extra data found in notification');
            console.log(
              '📋 README FLOW: Available notification data:',
              (notification as any)?.data
            );
            return;
          }

          const parsedExtra = JSON.parse(rawExtra);
          console.log('🔓 README FLOW: Parsed extra data:', parsedExtra);
          console.log('📋 README TODO: Check if notification type is "inbox"');

          if (parsedExtra?.type === 'inbox') {
            console.log('📬 README STEP 2: Inbox notification type detected!');
            console.log('📋 README FLOW: Parsed extra data:', parsedExtra);
            console.log('📋 README TODO: Refetch content cards from Braze');

            const rawCardJson = (notification as any)?.data?.ab_cd;
            console.log('🎴 README FLOW: Raw card JSON:', rawCardJson);

            if (rawCardJson) {
              console.log(
                '🔄 README FLOW: Processing Braze card from notification...'
              );
              const rawCard: BrazeAltPushContentCard = JSON.parse(rawCardJson);
              console.log('📋 README FLOW: Parsed raw card:', rawCard);

              const card = convertToBrazeContentCard(rawCard);
              console.log('✅ README FLOW: Converted card:', card);
              this.inboxService.addCard(card);
              console.log('📥 README FLOW: Card successfully added to inbox');
              console.log(
                '📋 README STEP 5: UI should now update to reflect new message'
              );
            } else {
              console.log(
                '⚠️ README FLOW: No card data (ab_cd) found in notification'
              );
              console.log(
                '📋 README FLOW: Available notification data keys:',
                Object.keys((notification as any)?.data || {})
              );
            }
          } else {
            console.log(
              '📭 README FLOW: Not an inbox notification, type:',
              parsedExtra?.type
            );
            console.log(
              '📋 README FLOW: Notification type was:',
              parsedExtra?.type
            );
          }
        } catch (err) {
          console.error(
            '❌ README FLOW: Error processing Braze push notification:',
            err
          );
          console.error('🔍 README FLOW: Error details:', {
            error: err instanceof Error ? err.message : String(err),
            notification: notification,
            timestamp: new Date().toISOString(),
          });
        }
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification) => {
        console.log(
          '👆 README FLOW: Push Notification Action Performed:',
          notification
        );
        console.log('🔍 README FLOW: Action details:', {
          actionId: notification.actionId,
          inputValue: notification.inputValue,
          notification: notification.notification,
          timestamp: new Date().toISOString(),
        });
      }
    );

    await this.registerPush();
    console.log(
      '✅ README FLOW: PushNotificationService initialization complete'
    );
  }

  private async registerPush(): Promise<void> {
    console.log('🔐 README FLOW: Checking push notification permissions...');
    console.log(
      '🕐 README FLOW: Permission check timestamp:',
      new Date().toISOString()
    );

    let pushReq = await PushNotifications.checkPermissions();
    console.log('📋 README FLOW: Current permissions:', pushReq);
    console.log('📋 README FLOW: Permission details:', {
      receive: pushReq.receive,
    });

    if (pushReq.receive === 'prompt') {
      console.log(
        '❓ README FLOW: Requesting push notification permissions...'
      );
      console.log(
        '📋 README FLOW: Permission status is "prompt", requesting...'
      );

      pushReq = await PushNotifications.requestPermissions();
      console.log(
        '📋 README FLOW: Updated permissions after request:',
        pushReq
      );
      console.log('📋 README FLOW: Updated permission details:', {
        receive: pushReq.receive,
      });
    }

    if (pushReq.receive) {
      console.log('✅ README FLOW: Push permissions granted, registering...');
      console.log('📋 README FLOW: Permission status:', pushReq.receive);

      try {
        await PushNotifications.register();
        console.log(
          '✅ README FLOW: Push notifications registered successfully'
        );
        console.log(
          '📋 README FLOW: Registration completed at:',
          new Date().toISOString()
        );

        // Log Braze push status after registration
        if (this.brazeInitialized) {
          console.log(
            '🔍 README FLOW: Checking Braze push status after FCM registration:'
          );
          console.log('  - Push supported:', braze.isPushSupported());
          console.log(
            '  - Push permission granted:',
            braze.isPushPermissionGranted()
          );
          console.log('  - Push blocked:', braze.isPushBlocked());
        }
      } catch (error) {
        console.error(
          '❌ README FLOW: Error registering push notifications:',
          error
        );
        console.error('🔍 README FLOW: Registration error details:', {
          error: error instanceof Error ? error.message : String(error),
          timestamp: new Date().toISOString(),
          permissions: pushReq,
        });
      }
    } else {
      console.log('❌ README FLOW: Push notification permissions denied');
      console.log('📋 README FLOW: Permission denied details:', {
        receive: pushReq.receive,
        timestamp: new Date().toISOString(),
      });
    }
  }

  private async showNotificationToast(
    notification: PushNotificationSchema | BrazePushNotification
  ): Promise<void> {
    try {
      let title = 'New Notification';
      let message = 'You have a new message';

      // Extract title and message from notification
      if ('title' in notification && notification.title) {
        title = notification.title;
      }
      if ('body' in notification && notification.body) {
        message = notification.body;
      }

      // Also check in data object
      const data = (notification as any)?.data;
      if (data?.title) {
        title = data.title;
      }
      if (data?.body) {
        message = data.body;
      }

      console.log('🍞 Showing toast notification:', { title, message });

      const toast = await this.toastController.create({
        header: title,
        message: message,
        duration: 4000,
        position: 'top',
        color: 'primary',
        buttons: [
          {
            text: 'View',
            handler: () => {
              console.log('👆 Toast "View" button clicked');
              // Could open inbox here if needed
            },
          },
          {
            text: 'Dismiss',
            role: 'cancel',
          },
        ],
      });

      await toast.present();
      console.log('✅ Toast notification displayed');
    } catch (error) {
      console.error('❌ Error showing notification toast:', error);
    }
  }
}
