import 'dotenv/config';
import { ExpoConfig, ConfigContext } from 'expo/config';

const apiUrl = process.env.API_URL;
const JWT_SECRET = process.env.JWT_SECRET_KEY;


export default ({ config }: ConfigContext): ExpoConfig => (
  {
    ...config,
    'name': 'Atlas CMMS',
    'slug': 'atlas-cmms',
    'version': '1.0.19',
    'orientation': 'portrait',
    'icon': './assets/images/icon.png',
    'scheme': 'atlascmms',
    'userInterfaceStyle': 'automatic',
    'notification': {
      'icon': './assets/images/notification.png'
    },
    'sdkVersion': '47.0.0',
    'splash': {
      'image': './assets/images/splash.png',
      'resizeMode': 'contain',
      'backgroundColor': '#ffffff'
    },
    'updates': {
      'fallbackToCacheTimeout': 0,
      'url': 'https://u.expo.dev/803b5007-0c60-4030-ac3a-c7630b223b92'
    },
    'assetBundlePatterns': [
      '**/*'
    ],
    'ios': {
      'supportsTablet': true,
      'runtimeVersion': {
        'policy': 'sdkVersion'
      }
    },
    'android': {
      'adaptiveIcon': {
        'foregroundImage': './assets/images/adaptive-icon.png',
        'backgroundColor': '#ffffff'
      },
      'versionCode': 20,
      'package': 'com.atlas.cmms',
      'googleServicesFile': './google-services.json',
      'runtimeVersion': '1.0.0'
    },
    'web': {
      'favicon': './assets/images/favicon.png'
    },
    'extra': {
      API_URL: apiUrl,
      JWT_SECRET,
      'eas': {
        'projectId': '803b5007-0c60-4030-ac3a-c7630b223b92'
      }
    },
    'plugins': [
      'react-native-nfc-manager',
      [
        'expo-barcode-scanner',
        {
          'cameraPermission': 'Allow Atlas to access camera.'
        }
      ]
    ]
  }

);
