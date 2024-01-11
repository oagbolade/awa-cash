import { pallets } from 'constant';
import { KYCRoutes } from 'navigation';

interface KYCSection {
  label: string;
  icon: IconName;
  color: string;
  route?: keyof Omit<KYCRoutes, 'KYCSuccess' | 'VerifyBVNWeb' | 'ValidID'>;
  id: KYCSectionID;
}

export const kycSection: KYCSection[] = [
  {
    color: pallets.secondary,
    icon: 'key-square',
    id: 'bvn',
    label: 'Add you BVN',
    route: 'VerifyBVN',
  },
  {
    color: pallets.secondary,
    icon: 'camera',
    id: 'selfie',
    label: 'Take a selfie',
    route: 'TakeSelfie',
  },
  {
    color: pallets.middarkgreen,
    icon: 'home',
    id: 'address',
    label: 'Address',
    route: 'Address',
  },
  {
    color: pallets.orange,
    icon: 'receipt-2',
    id: 'utility',
    label: 'Upload utility bill and valid ID',
    route: 'UtilityBill',
  },
  {
    color: pallets.secondary,
    icon: 'biometric-android-fingerprint',
    id: 'biometrics',
    label: 'Enable Biometrics',
  },
];
