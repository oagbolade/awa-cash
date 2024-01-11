type Theme = 'light' | 'dark';

type ThemeState = {
  theme: Theme;
  useSystemTheme: boolean;
};

type AuthState = {
  isAuthenticated: boolean;
  user?: User | null;
  token?: string | null;
  balance?: number | null;
  accounts: CustomerAccountData[];
  accountSetUp: {
    address: boolean;
    bvn: boolean;
    selfie: boolean;
    utility: boolean;
    biometrics: boolean;
  };
};

type PersistedState = {
  biometrics: boolean;
  email: string;
  onboarded: boolean;
  rememberMe: boolean;
  balanceVisible: boolean;
  cardOnboard: boolean;
};
