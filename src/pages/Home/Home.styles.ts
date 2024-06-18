import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 74rem;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const BaseButtonCountdown = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  color: ${(props) => props.theme['gray-100']};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const ButtonCountdownStart = styled(BaseButtonCountdown)`
  background: ${(props) => props.theme['green-500']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
  }
`

export const ButtonCountdownStop = styled(BaseButtonCountdown)`
  background: ${(props) => props.theme['red-500']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['red-700']};
  }
`
