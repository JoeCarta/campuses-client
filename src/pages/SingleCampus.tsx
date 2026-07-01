import { useParams } from 'react-router-dom'

function SingleCampus() {
  const { id } = useParams()

  return (
    <div>
      <h1>Single Campus</h1>
      <p>Details for campus #{id} and its enrolled students will go here.</p>
    </div>
  )
}

export default SingleCampus
