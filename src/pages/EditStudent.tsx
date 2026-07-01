import { useParams } from 'react-router-dom'

function EditStudent() {
  const { id } = useParams()

  return (
    <div>
      <h1>Edit Student</h1>
      <p>The edit form for student #{id} will go here.</p>
    </div>
  )
}

export default EditStudent
