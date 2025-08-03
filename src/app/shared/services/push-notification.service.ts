import { Injectable, inject } from '@angular/core';
import { BrazePushNotification } from '@models/braze/braze-push-notification';
import {
  PushNotifications,
  PushNotificationSchema,
} from '@capacitor/push-notifications';
import { InboxService } from '@services/inbox.service';
import { convertToBrazeContentCard } from '@utils/braze/convert-content-card';
import { BrazeAltPushContentCard } from '@models/braze/braze-push-content-card';
import * as braze from '@braze/web-sdk';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  private readonly inboxService = inject(InboxService);
  private brazeInitialized = false;

  constructor() {}

  async init() {
    // ✅ Initialize Braze once
    if (!this.brazeInitialized) {
      braze.initialize(environment.brazeApiKey, {
        baseUrl: environment.brazeEndpoint,
      });
      braze.openSession();
      this.brazeInitialized = true;
      console.log(
        'Braze initialized with endpoint:',
        environment.brazeEndpoint
      );
    }

    PushNotifications.addListener('registration', (token) => {
      console.log('~ PushNotificationService ~ token:', token);
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema | BrazePushNotification) => {
        try {
          // Parse extras
          const rawExtra = (notification as any)?.data?.extra;
          if (!rawExtra) return;

          const parsedExtra = JSON.parse(rawExtra);
          if (parsedExtra?.type === 'inbox') {
            console.log('Inbox notification received:', parsedExtra);

            // If Braze included a content card payload
            const rawCardJson = (notification as any)?.data?.ab_cd;
            if (rawCardJson) {
              const rawCard: BrazeAltPushContentCard = JSON.parse(rawCardJson);
              const card = convertToBrazeContentCard(rawCard);

              // Add card to inbox
              this.inboxService.addCard(card);

              // Mark impression for analytics
              braze.logContentCardImpression(card.id);
            }
          }
        } catch (err) {
          console.error('Error processing Braze push notification:', err);
        }
      }
    );

    await this.registerPush();
  }

  private async registerPush(): Promise<void> {
    let pushReq = await PushNotifications.checkPermissions();

    if (pushReq.receive === 'prompt') {
      pushReq = await PushNotifications.requestPermissions();
    }

    if (pushReq.receive) {
      // Ask iOS user for permission / auto grant Android permission
      await PushNotifications.register();
    }
  }
}
