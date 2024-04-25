import { HeaderContainer } from './Header.styles.ts'
import WingLogo from '../../assets/icons/WingLogo.svg'
import { faStopwatch } from '@fortawesome/free-solid-svg-icons/faStopwatch'
import { faScroll } from '@fortawesome/free-solid-svg-icons/faScroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <img src={WingLogo} alt="Right Wing Logo" />

      <nav>
        <NavLink to="/" title="Timer">
          <FontAwesomeIcon icon={faStopwatch} />
        </NavLink>

        <NavLink to="/history" title="History">
          <FontAwesomeIcon icon={faScroll} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
