import { pallets } from 'constant';
import { MoreRoutes } from 'navigation';

interface MoreSectionProps {
  title: string;
  route?: keyof Omit<MoreRoutes, 'RequestChangeOTP' | 'MoreSuccess'>;
  link?: string;
  color: string;
  icon: IconName;
  id: string;
}
interface SecuritySectionProps {
  title: string;
  color: string;
  icon: IconName;
  id: string;
  route?: keyof Pick<MoreRoutes, 'BiometricSettings' | 'ChangePin' | 'ChangePassword'>;
}
type upgradeAccountOptionsType = {
  color: string;
  route?: keyof Pick<MoreRoutes, 'LevelTwo' | 'LevelThree'>;
  header: string;
  paragraph: string;
  id: 'level-two' | 'level-three';
};

export const moreSection: MoreSectionProps[] = [
  {
    color: '#2793EB',
    icon: 'user',
    id: 'personal-info',
    route: 'PersonalInfo',
    title: 'Personal Information',
  },
  {
    color: '#254DDC',
    icon: 'trend-up',
    id: 'upgrade',
    route: 'UpgradeAccount',
    title: 'Upgrade Account',
  },
  {
    color: '#299264',
    icon: 'lock',
    id: 'security',
    route: 'Security',
    title: 'Security Settings',
  },
  // {
  //   color: '#4B7DF3',
  //   icon: 'share',
  //   id: 'referral',
  //   route: 'UpgradeAccount',
  //   title: 'Share My Referral ID',
  // },
  // {
  //   color: '#9930B4',
  //   icon: 'document',
  //   id: 'statement',
  //   route: 'UpgradeAccount',
  //   title: 'Request Statement',
  // },
  {
    color: '#4460F1',
    icon: 'shield-security',
    id: 'privacy',
    link: 'https://app.awacashmfb.com/policy',
    title: 'Privacy Policy',
  },
  {
    color: '#2AAE74',
    icon: 'document-normal',
    id: 'terms',
    link: 'https://app.awacashmfb.com/terms/',
    title: 'Terms & Conditions',
  },
  {
    color: '#2793EB',
    icon: 'message-question-outline',
    id: 'faq',
    link: 'https://app.awacashmfb.com/faq/',
    title: 'FAQ',
  },
  {
    color: '#1400FF',
    icon: 'message-question',
    id: 'help',
    link: 'https://app.awacashmfb.com/help',
    title: 'Help',
  },
  {
    color: '#E14413',
    icon: 'logout',
    id: 'logout',
    route: 'UpgradeAccount',
    title: 'Logout',
  },
];

export const personalInfoData = [
  {
    id: 0,
    label: 'Take a Phote',
    value: 'Take a Phote',
  },
  {
    id: 1,
    label: 'Select from Gallery',
    value: 'Select from Gallery',
  },
];

export const upgradeAccountOptions: upgradeAccountOptionsType[] = [
  {
    color: pallets.trendUpYellow,
    header: 'Upgrade to Level 2',
    id: 'level-two',
    paragraph: 'A valid means of identification is required to upgrade.',
    // route: 'LevelTwo',
  },
  {
    color: pallets.middarkgreen,
    header: 'Upgrade to Level 3',
    id: 'level-three',
    paragraph:
      'Your current residential address and next of kin’s information are required.',
    route: 'LevelThree',
  },
];

export const securitySettings: SecuritySectionProps[] = [
  {
    color: pallets.black,
    icon: 'biometric-android-fingerprint',
    id: 'biometric-settings',
    route: 'BiometricSettings',
    title: 'Biometric Settings',
  },
  {
    color: pallets.primary,
    icon: 'lock',
    id: 'Change-pin',
    route: 'ChangePin',
    title: 'Change Pin',
  },
  {
    color: pallets.middarkgreen,
    icon: 'lock-dot',
    id: 'Change-password',
    route: 'ChangePassword',
    title: 'Change Password',
  },
];
