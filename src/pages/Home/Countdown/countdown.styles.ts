import styled from 'styled-components'

export const SeparatorContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  width: 4rem;
  overflow: hidden;
  color: ${(props) => props.theme['green-500']};
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
