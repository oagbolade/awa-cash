import { useSelector } from 'store';
import { ThemeType, theme as colors } from 'constant';

interface Props {
  color: ThemeType;
  theme: 'light' | 'dark';
}

export default function useTheme(): Props {
  const { theme } = useSelector(state => state.theme);
  const color = colors.light;

  return { color, theme };
}
