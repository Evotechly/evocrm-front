import { Button as UiButton, type ButtonProps as UiButtonProps } from '@evotechly/ui';

type AppVariant = 'primary' | 'secondary' | 'ghost' | 'soft' | 'danger';

export type ButtonProps = Omit<UiButtonProps, 'variant'> & { variant?: AppVariant };

const variantMap = {
  primary: 'primary',
  secondary: 'secondary',
  ghost: 'ghost',
  soft: 'secondary',
  danger: 'destructive',
} as const;

export function Button({ variant = 'secondary', ...props }: ButtonProps) {
  return <UiButton variant={variantMap[variant]} {...props} />;
}
