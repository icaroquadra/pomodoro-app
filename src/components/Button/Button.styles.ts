import styled from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonVariant
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 200px;
  height: 50px;
  border-radius: 5px;
  border: 0;
  margin: 10px;

  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
`
