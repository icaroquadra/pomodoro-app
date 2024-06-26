import styled from 'styled-components'

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
