type value = string;

export interface ThemeType {
  primary: value;
  secondary: value;
  green: value;
  red: value;
  black: value;
  white: value;
  text: value;
  textSecondary: value;
  background: value;
  card: value;
  notification: value;
  border: value;
  inactive: value;
  grey: value;
  altBG: value;
  transparent: value;
  modal: value;
  dark: value;
  darkGrey: value;
  inputBorder: value;
  input: value;
  orange: value;
  grey4: value;
}

export const pallets = {
  black: '#0B0B0B',
  border: '#BBBBBB',
  border2: '#DBDBDB',
  buttonInactive: '#0C0D340D', //202030
  card: '#F3F3F7',
  dark: '#2C363F',
  darkGrey: '#8a8d90',
  deactivate: '#F48971',
  errorYellow: '#FFA927',
  green: '#06D6A0', //#00FFDD
  grey: '#BBBBBB', //F4F0EF
  grey2: '#9A9999', //F4F0EF
  grey3: '#E2E2E2',
  grey4: '#FAFAFA',
  inactive: '#E3E3E3',
  lightBlue: '#E0F1FF', //#CBE8FF
  lightBlue2: '#CBE8FF',
  middarkgreen: '#299264',
  neutral: '#F4F5F7',
  notification: '#2793EB',
  orange: '#FDAA49',
  primary: '#2793EB',
  primaryBlack: '#292D32',
  red: '#FF0058', //#A22C29 #A4243B
  secondary: '#2AAE74',
  text: '#0B0B0B',
  text2: '#828282',
  transparent: 'transparent',
  transparentBlue: '#D7EDFF80',
  trendUpYellow: '#FCA802',
  white: '#FFFFFF',
};

//1D3461
const colors: { dark: ThemeType; light: ThemeType } = {
  dark: {
    ...pallets,
    altBG: '#050B14',
    background: '#04080F', //001427 131515  001427
    border: '#08101F',
    card: '#04080F',
    input: '#020B13',
    inputBorder: '#ECF6FD',
    modal: '#08101F',
    text: '#DAE3E5',
    textSecondary: '#5C5C5C',
  },
  light: {
    ...pallets,
    altBG: '#FAFAFA', //#F5F5F5 #FAFAFF #EBFEF9 #FAFAFA #FCFCFC
    background: '#FFFFFF',
    border: '#DFE5E3',
    card: '#FFFFFF',
    input: '#F4F5F7',
    inputBorder: '#020B13',
    modal: '#FAFAFF',
    text: '#04080F',
    textSecondary: '#5C5C5C',
  },
};

export default colors;
