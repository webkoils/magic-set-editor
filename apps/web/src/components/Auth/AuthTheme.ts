import { ThemeVariables } from '@supabase/auth-ui-react/dist/esm/common/theming/Types';
import { MseTheme } from '../MseThemeProvider/MseThemeProvider';
export const AuthTheme: ThemeVariables = {
  colors: {
    brand: MseTheme.palette.primary.main,
    brandAccent: MseTheme.palette.primary.dark,
    brandButtonText: 'white',
    defaultButtonBackground: 'gray',
    defaultButtonBackgroundHover: '#eaeaea',
    defaultButtonBorder: 'lightgray',
    defaultButtonText: 'gray',
    dividerBackground: '#eaeaea',
    inputBackground: MseTheme.palette.background.paper,
    inputBorder: 'lightgray',
    inputBorderHover: 'gray',
    inputBorderFocus: 'gray',
    inputText: MseTheme.palette.text.primary,
    inputLabelText: MseTheme.palette.text.primary,
    inputPlaceholder: MseTheme.palette.text.primary,
    messageText: 'gray',
    messageTextDanger: 'red',
    anchorTextColor: 'gray',
    anchorTextHoverColor: 'darkgray',
  },
  space: {
    spaceSmall: '4px',
    spaceMedium: '8px',
    spaceLarge: '16px',
    labelBottomMargin: '8px',
    anchorBottomMargin: '4px',
    emailInputSpacing: '0px',

    socialAuthSpacing: '4px',
    buttonPadding: '10px 15px',
    inputPadding: '10px 15px',
  },
  fontSizes: {
    baseBodySize: MseTheme.typography.fontSize + 'px',
    baseInputSize: MseTheme.typography.fontSize + 'px',
    baseLabelSize: MseTheme.typography.fontSize + 'px',
    baseButtonSize: MseTheme.typography.fontSize + 'px',
  },
  fonts: {
    bodyFontFamily: MseTheme.typography.fontFamily,
    buttonFontFamily: MseTheme.typography.fontFamily,
    inputFontFamily: MseTheme.typography.fontFamily,
    labelFontFamily: MseTheme.typography.fontFamily,
  },

  borderWidths: {
    buttonBorderWidth: '1px',
    inputBorderWidth: '1px',
  },
  radii: {
    borderRadiusButton: '8px',
    buttonBorderRadius: '8px',
    inputBorderRadius: '8px',
  },
};
