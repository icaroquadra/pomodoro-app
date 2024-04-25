import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import {
  HomeContainer,
  TimerContainer,
  SeparatorContainer,
  ButtonCountdownStart,
  FormContainer,
  TaskInput,
  MinutesInput,
} from './Home.styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label> I will work with </label>

          <TaskInput id="task" />

          <datalist id="task-suggestions">
            <option value="Project 1" />
            <option value="Project 2" />
            <option value="Project 3" />
          </datalist>

          <label htmlFor="task"> for </label>

          <MinutesInput
            type="number"
            id="time"
            placeholder="00"
            step={5}
            min={5}
            max={60}
          />
          <span> minutes. </span>
        </FormContainer>

        <TimerContainer>
          <span>0</span>
          <span>0</span>
          <SeparatorContainer>:</SeparatorContainer>
          <span>0</span>
          <span>0</span>
        </TimerContainer>

        <ButtonCountdownStart disabled type="submit">
          <FontAwesomeIcon icon={faPlay} />
          Start
        </ButtonCountdownStart>
      </form>
    </HomeContainer>
  )
}
