import { Sentry, SentryLog } from 'react-native-sentry';
import codePush from 'react-native-code-push';
import App from './src/index';

Sentry.config('https://aeaa78debe6d428984f9823f4aee0681@sentry.io/1457345', {
  // deactivateStacktraceMerging: true,
  logLevel: SentryLog.Verbose,
  // currently sentry is not reporting errors on android using the native module
  // disableNativeIntegration: true,
}).install();
codePush.getUpdateMetadata().then((update) => {
  if (update) {
    Sentry.setVersion(`${update.appVersion}-codepush:${update.label}`);
  }
});


export default App;
