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

export const FormContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: ${(props) => props.theme['gray-100']};
`

export const TimerContainer = styled.section`
  display: flex;
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  gap: 1rem;
  color: ${(props) => props.theme['gray-100']};

  span {
    padding: 2rem 1rem;
    border-radius: 5px;
    background: ${(props) => props.theme['gray-700']};
  }
`

export const InputContainer = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  font-weight: bold;
  font-size: 1.25rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme['gray-100']};

  &:focus {
    box-shadow: none;
    border-bottom-color: ${(props) => props.theme['green-500']};
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
`

export const TaskInput = styled(InputContainer)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none;
  }
`
export const MinutesInput = styled(InputContainer)`
  width: 4rem;
`

export const SeparatorContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  width: 4rem;
  overflow: hidden;
  color: ${(props) => props.theme['green-500']};
`

export const ButtonCountdownStart = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme['gray-100']};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
  }
`
