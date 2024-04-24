import React from 'react'
import { ButtonContainer, ButtonVariant } from './Button.styles.ts'

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  variant?: ButtonVariant
}

export function Button({ variant = 'primary' }: ButtonProps) {
  return <ButtonContainer variant={variant}> Enter </ButtonContainer>
}
