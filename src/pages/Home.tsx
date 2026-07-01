import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1>Campuses & Students</h1>
      <p>Manage campuses and the students enrolled at them.</p>
      <ul>
        <li>
          <Link to="/campuses">All Campuses</Link>
        </li>
        <li>
          <Link to="/students">All Students</Link>
        </li>
      </ul>
    </div>
  )
}

export default Home
