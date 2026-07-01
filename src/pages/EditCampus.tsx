import { useParams } from 'react-router-dom'

function EditCampus() {
  const { id } = useParams()

  return (
    <div>
      <h1>Edit Campus</h1>
      <p>The edit form for campus #{id} will go here.</p>
    </div>
  )
}

export default EditCampus
