import { useNavigate } from 'react-router-dom'
import StudentForm from '../components/StudentForm'
import type { StudentFormValues } from '../components/StudentForm'
import { useCreateStudent } from '../hooks/students'
import ErrorMessage from '../components/ErrorMessage'

function AddStudent() {
  const navigate = useNavigate()
  const createStudent = useCreateStudent()

  function handleSubmit(values: StudentFormValues) {
    createStudent.mutate(
      {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        gpa: Number(values.gpa),
        imageUrl: values.imageUrl || undefined,
        campusId: values.campusId === '' ? null : Number(values.campusId),
      },
      { onSuccess: (student) => navigate(`/students/${student.id}`) },
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Add student</h1>
      {createStudent.isError && (
        <div className="mt-4">
          <ErrorMessage message={(createStudent.error as Error).message} />
        </div>
      )}
      <div className="mt-6">
        <StudentForm onSubmit={handleSubmit} submitting={createStudent.isPending} submitLabel="Create student" />
      </div>
    </div>
  )
}

export default AddStudent
