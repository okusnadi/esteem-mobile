import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import { StatusBar, Platform, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ReduxNavigation } from '../../../navigation/reduxNavigation';
import { flattenMessages } from '../../../utils/flattenMessages';
import messages from '../../../config/locales';

// Components
import { NoInternetConnection } from '../../../components/basicUIElements';
import { ToastNotification } from '../../../components/toastNotification';

// Themes (Styles)
import darkTheme from '../../../themes/darkTheme';
import lightTheme from '../../../themes/lightTheme';

class ApplicationScreen extends Component {
  componentWillMount() {
    const { isDarkTheme } = this.props;
    EStyleSheet.build(isDarkTheme ? darkTheme : lightTheme);
  }

  render() {
    const {
      isConnected, isDarkTheme, locale, toastNotification, isReady,
    } = this.props;
    const barStyle = isDarkTheme ? 'light-content' : 'dark-content';
    const barColor = isDarkTheme ? '#1e2835' : '#fff';

    return (
      <View pointerEvents={isReady ? 'auto' : 'none'} style={{ flex: 1 }}>
        {Platform.os === 'ios' ? (
          <StatusBar barStyle={barStyle} />
        ) : (
          <StatusBar barStyle={barStyle} backgroundColor={barColor} />
        )}

        {!isConnected && (
          <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
            <NoInternetConnection />
          </IntlProvider>
        )}

        <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
          <ReduxNavigation />
        </IntlProvider>

        {toastNotification && toastNotification !== '' && (
          <ToastNotification
            text={toastNotification}
            duration={2000}
            onHide={this.hideToastNotification}
          />
        )}
      </View>
    );
  }
}

export default ApplicationScreen;
