import styled from 'styled-components'

export const DefaultLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 74rem;
  height: calc(100vh - 10rem);
  margin: 5rem auto;
  padding: 2.5rem;
  border-radius: 5px;
  background: ${(props) => props.theme['gray-800']};
`
