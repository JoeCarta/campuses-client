import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AllCampuses from './pages/AllCampuses'
import SingleCampus from './pages/SingleCampus'
import AddCampus from './pages/AddCampus'
import EditCampus from './pages/EditCampus'
import AllStudents from './pages/AllStudents'
import SingleStudent from './pages/SingleStudent'
import AddStudent from './pages/AddStudent'
import EditStudent from './pages/EditStudent'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div>
      <Navbar />
      <hr />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/campuses" element={<AllCampuses />} />
          <Route path="/campuses/new" element={<AddCampus />} />
          <Route path="/campuses/:id" element={<SingleCampus />} />
          <Route path="/campuses/:id/edit" element={<EditCampus />} />

          <Route path="/students" element={<AllStudents />} />
          <Route path="/students/new" element={<AddStudent />} />
          <Route path="/students/:id" element={<SingleStudent />} />
          <Route path="/students/:id/edit" element={<EditStudent />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
