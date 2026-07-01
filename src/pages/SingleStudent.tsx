import { useParams } from 'react-router-dom'

function SingleStudent() {
  const { id } = useParams()

  return (
    <div>
      <h1>Single Student</h1>
      <p>Details for student #{id} and their campus will go here.</p>
    </div>
  )
}

export default SingleStudent
