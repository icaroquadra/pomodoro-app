import styled from 'styled-components'

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    filter: invert(1);
  }

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 2rem;
      height: 2rem;
      color: ${(props) => props.theme['gray-100']};
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      &:focus {
        outline: none;
        box-shadow: none;
      }

      &:hover {
        border-bottom-color: ${(props) => props.theme['green-500']};
      }

      &.active {
        color: ${(props) => props.theme['green-500']};
      }
    }
  }
`
