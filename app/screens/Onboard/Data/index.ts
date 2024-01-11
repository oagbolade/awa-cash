interface OnboardProps {
  image: number;
  title: string;
  description: string;
}

export const onboardData: OnboardProps[] = [
  {
    description: 'Send money, pay bills and track your expenses on the go.',
    image: require('assets/images/onboard/bank-card.png'),
    title: 'Powering up banking experience for African Creators & Freelancers!',
  },
  {
    description: 'Send money, pay bills and track your expenses on the go.',
    image: require('assets/images/onboard/paper-money.png'),
    title: 'Manage your money \n anywhere, anytime',
  },
];
