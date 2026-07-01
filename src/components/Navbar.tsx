import { NavLink } from 'react-router-dom'

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  display: 'inline-block',
  padding: '12px 20px',
  fontSize: '1.25rem',
  textDecoration: 'none',
  fontWeight: isActive ? 'bold' : 'normal',
})

function Navbar() {
  return (
    <nav>
      <NavLink to="/" end style={linkStyle}>
        Home
      </NavLink>
      <NavLink to="/campuses" style={linkStyle}>
        Campuses
      </NavLink>
      <NavLink to="/students" style={linkStyle}>
        Students
      </NavLink>
    </nav>
  )
}

export default Navbar
