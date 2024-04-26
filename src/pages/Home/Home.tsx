import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
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
  const { register, handleSubmit, watch } = useForm()
  // console.log(register('task').))

  function createNewTask(data) {
    // eslint-disable-next-line no-console
    console.log(data)
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewTask)} action="">
        <FormContainer>
          <label> I will work with </label>

          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Give a name for your Project"
            {...register('task')}
          />

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
            {...register('time', { required: true, valueAsNumber: true })}
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

        <ButtonCountdownStart disabled={isSubmitDisabled} type="submit">
          <FontAwesomeIcon icon={faPlay} />
          Start
        </ButtonCountdownStart>
      </form>
    </HomeContainer>
  )
}
