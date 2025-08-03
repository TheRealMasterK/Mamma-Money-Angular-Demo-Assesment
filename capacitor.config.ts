import type { CapacitorConfig } from '@capacitor/cli';
import 'dotenv/config';

const SENDER_ID = process.env['FCM_SENDER_ID'];

const config: CapacitorConfig = {
  appId: 'za.co.mamamoney.assessments.frontend',
  appName: 'Mama Money Frontend Technical Assessment',
  webDir: 'www',
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  },
  cordova: {
    preferences: {
      // Braze Android
      'com.braze.api_key': process.env['BRAZE_ANDROID_KEY'] ?? '',
      'com.braze.android_api_endpoint': process.env['BRAZE_ENDPOINT'] ?? '',
      'com.braze.android_fcm_sender_id': SENDER_ID ? `str_${SENDER_ID}` : '',
      'com.braze.firebase_cloud_messaging_registration_enabled': 'true',
      'com.braze.is_firebase_messaging_service_on_new_token_registration_enabled': 'true',
      'com.braze.should_opt_in_when_push_authorized': 'true',
      'com.braze.is_content_cards_unread_visual_indicator_enabled': 'true',
      'com.braze.is_fallback_firebase_messaging_service_enabled': 'true',
      'com.braze.fallback_firebase_messaging_service_classpath':
        'com.capacitorjs.plugins.pushnotifications.MessagingService',
      'com.braze.android_handle_push_deep_links_automatically': 'true',
      'com.braze.push_adm_messaging_registration_enabled': 'false',
      'com.braze.android_push_adm_messaging_registration_enabled': 'false',
      'com.braze.android_push_notification_html_rendering_enabled': 'false',
      'com.braze.push_notification_html_rendering_enabled': 'false',
      'com.braze.android_log_level': 'str_4',

      // Braze iOS
      'com.braze.ios_api_key': process.env['BRAZE_IOS_KEY'] ?? '',
      'com.braze.ios_api_endpoint': process.env['BRAZE_ENDPOINT'] ?? '',
      'com.braze.ios_log_level': 'str_2',
      'com.braze.ios_should_opt_in_when_push_authorized': 'true',
      'com.braze.ios_is_content_cards_unread_visual_indicator_enabled': 'true',
      'com.braze.ios_handle_push_deep_links_automatically': 'true',
      'com.braze.ios_push_notification_html_rendering_enabled': 'false',
      'com.braze.ios_enable_automatic_push_registration': 'true',
      'com.braze.ios_enable_location_collection': 'true',

      'com.braze.default_notification_channel_name': 'NotificationChannel',
      'com.braze.default_notification_channel_description': 'NotificationChannel description',
      'com.braze.enable_location_collection': 'true'
    }
  }
};

export default config;
