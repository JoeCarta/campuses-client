import { Link, useParams, useNavigate } from 'react-router-dom'
import { useStudent, useUpdateStudent, useDeleteStudent } from '../hooks/students'
import { useCampuses } from '../hooks/campuses'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

function SingleStudent() {
  const { id } = useParams()
  const studentId = Number(id)
  const navigate = useNavigate()

  const { data: student, isLoading, isError, error } = useStudent(studentId)
  const { data: campuses } = useCampuses()
  const updateStudent = useUpdateStudent()
  const deleteStudent = useDeleteStudent()

  if (isLoading) return <Loading />
  if (isError) return <ErrorMessage message={(error as Error).message} />
  const s = student!

  function handleDelete() {
    if (!confirm('delete this student?')) return
    deleteStudent.mutate(s.id, { onSuccess: () => navigate('/students') })
  }

  // change campus (or set to none) from a dropdown — '' means unenroll
  function handleCampusChange(value: string) {
    updateStudent.mutate({
      id: s.id,
      data: { campusId: value === '' ? null : Number(value) },
    })
  }

  return (
    <div>
      <Link to="/students" className="text-sm text-violet-600 dark:text-violet-400">
        &larr; all students
      </Link>

      <div className="mt-4 flex flex-col gap-6 sm:flex-row">
        <img src={s.imageUrl} alt="" className="h-40 w-40 rounded-lg object-cover" />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            {s.firstName} {s.lastName}
          </h1>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">{s.email}</p>
          <p className="mt-1 text-neutral-700 dark:text-neutral-300">GPA: {s.gpa}</p>

          <p className="mt-3 text-neutral-700 dark:text-neutral-300">
            {s.campus ? (
              <>
                Enrolled at{' '}
                <Link to={`/campuses/${s.campus.id}`} className="font-medium text-violet-600 dark:text-violet-400">
                  {s.campus.name}
                </Link>
              </>
            ) : (
              'Not enrolled'
            )}
          </p>

          {/* change / clear campus */}
          <div className="mt-4 max-w-xs">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Change campus</label>
            <select
              value={s.campusId ?? ''}
              onChange={(e) => handleCampusChange(e.target.value)}
              disabled={updateStudent.isPending}
              className="mt-1 w-full rounded border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-violet-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
            >
              <option value="">— not enrolled —</option>
              {campuses?.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="mt-4 flex gap-2">
            <Link
              to={`/students/${s.id}/edit`}
              className="rounded border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleteStudent.isPending}
              className="rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleStudent
