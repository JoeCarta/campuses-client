import { Link } from 'react-router-dom'
import { useStudents } from '../hooks/students'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

function AllStudents() {
  const { data: students, isLoading, isError, error } = useStudents()

  if (isLoading) return <Loading />
  if (isError) return <ErrorMessage message={(error as Error).message} />

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Students</h1>
        <Link
          to="/students/new"
          className="rounded bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-600"
        >
          Add student
        </Link>
      </div>

      {students!.length === 0 ? (
        <p className="mt-6 text-neutral-500 dark:text-neutral-400">no students yet.</p>
      ) : (
        <ul className="mt-6 divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900">
          {students!.map((s) => (
            <li key={s.id}>
              <Link to={`/students/${s.id}`} className="flex items-center gap-4 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                <img src={s.imageUrl} alt="" className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white">
                    {s.firstName} {s.lastName}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {s.campus ? s.campus.name : 'not enrolled'}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AllStudents
