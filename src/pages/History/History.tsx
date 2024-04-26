import { HistoryContainer, HistoryList, Status } from './History.stiles.ts'

export function History() {
  return (
    <HistoryContainer>
      <h1>My History</h1>

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
            <tr>
              <td>Task</td>
              <td>20min</td>
              <td>2 months ago</td>
              <td>
                <Status statusColor="red">interrupted</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20min</td>
              <td>2 months ago</td>
              <td>
                <Status statusColor="green">Finished</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20min</td>
              <td>2 months ago</td>
              <td>
                <Status statusColor="yellow">In Progress</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20min</td>
              <td>2 months ago</td>
              <td>
                <Status statusColor="green">Finished</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}