import { useContext } from 'react'
import { HistoryContainer, HistoryList, Status } from './History.stiles.ts'
import { CyclesContext } from '../../contexts/cyclesContext.tsx'
import { TimeCycle } from '../../types/TimeCycle'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'

export function History() {
  const { timeCycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>My History</h1>

      {/* to check the timeCycles data */}
      {/* <pre>{JSON.stringify(timeCycles, null, 2)}</pre> */}

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Time</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {timeCycles.map((timeCycle: TimeCycle) => {
              return (
                <tr key={timeCycle.id}>
                  <td>{timeCycle.id}</td>
                  <td>{timeCycle.time} minutes</td>
                  <td>
                    {formatDistanceToNow(timeCycle.startTime, {
                      addSuffix: true,
                    })}
                  </td>
                  <td>
                    {timeCycle.status === 'finished' && (
                      <Status statusColor="green">Finished</Status>
                    )}
                    {timeCycle.status === 'paused' && (
                      <Status statusColor="red">Paused</Status>
                    )}
                    {timeCycle.status === 'inProgress' && (
                      <Status statusColor="yellow">In progress</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
