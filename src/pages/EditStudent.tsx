import { useParams, useNavigate } from 'react-router-dom'
import StudentForm from '../components/StudentForm'
import type { StudentFormValues } from '../components/StudentForm'
import { useStudent, useUpdateStudent } from '../hooks/students'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

function EditStudent() {
  const { id } = useParams()
  const studentId = Number(id)
  const navigate = useNavigate()

  const { data: student, isLoading, isError, error } = useStudent(studentId)
  const updateStudent = useUpdateStudent()

  if (isLoading) return <Loading />
  if (isError) return <ErrorMessage message={(error as Error).message} />
  const s = student!

  function handleSubmit(values: StudentFormValues) {
    updateStudent.mutate(
      {
        id: studentId,
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          gpa: Number(values.gpa),
          imageUrl: values.imageUrl || undefined,
          campusId: values.campusId === '' ? null : Number(values.campusId),
        },
      },
      { onSuccess: () => navigate(`/students/${studentId}`) },
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Edit student</h1>
      {updateStudent.isError && (
        <div className="mt-4">
          <ErrorMessage message={(updateStudent.error as Error).message} />
        </div>
      )}
      <div className="mt-6">
        <StudentForm
          initial={{
            firstName: s.firstName,
            lastName: s.lastName,
            email: s.email,
            gpa: String(s.gpa),
            imageUrl: s.imageUrl,
            campusId: s.campusId == null ? '' : String(s.campusId),
          }}
          onSubmit={handleSubmit}
          submitting={updateStudent.isPending}
          submitLabel="Save changes"
        />
      </div>
    </div>
  )
}

export default EditStudent
