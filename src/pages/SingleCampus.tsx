import { Link, useParams, useNavigate } from 'react-router-dom'
import { useCampus, useDeleteCampus } from '../hooks/campuses'
import { useUpdateStudent } from '../hooks/students'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

function SingleCampus() {
  const { id } = useParams()
  const campusId = Number(id)
  const navigate = useNavigate()

  const { data: campus, isLoading, isError, error } = useCampus(campusId)
  const deleteCampus = useDeleteCampus()
  const updateStudent = useUpdateStudent()

  if (isLoading) return <Loading />
  if (isError) return <ErrorMessage message={(error as Error).message} />
  const c = campus!

  function handleDelete() {
    if (!confirm('delete this campus? its students will become unenrolled.')) return
    deleteCampus.mutate(c.id, { onSuccess: () => navigate('/campuses') })
  }

  return (
    <div>
      <Link to="/campuses" className="text-sm text-violet-600 dark:text-violet-400">
        &larr; all campuses
      </Link>

      <div className="mt-4 flex flex-col gap-6 sm:flex-row">
        <img src={c.imageUrl} alt={c.name} className="h-48 w-full rounded-lg object-cover sm:w-72" />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">{c.name}</h1>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">{c.address}</p>
          <p className="mt-3 text-neutral-700 dark:text-neutral-300">{c.description}</p>
          <div className="mt-4 flex gap-2">
            <Link
              to={`/campuses/${c.id}/edit`}
              className="rounded border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleteCampus.isPending}
              className="rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <h2 className="mt-8 text-lg font-semibold text-neutral-900 dark:text-white">
        Enrolled students ({c.students?.length ?? 0})
      </h2>

      {!c.students || c.students.length === 0 ? (
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">no students enrolled.</p>
      ) : (
        <ul className="mt-3 divide-y divide-neutral-200 dark:divide-neutral-800">
          {c.students.map((s) => (
            <li key={s.id} className="flex items-center justify-between py-3">
              <Link to={`/students/${s.id}`} className="flex items-center gap-3">
                <img src={s.imageUrl} alt="" className="h-10 w-10 rounded-full object-cover" />
                <span className="text-neutral-800 dark:text-neutral-200">
                  {s.firstName} {s.lastName}
                </span>
              </Link>
              <button
                onClick={() => updateStudent.mutate({ id: s.id, data: { campusId: null } })}
                disabled={updateStudent.isPending}
                className="text-sm text-red-600 hover:underline disabled:opacity-50 dark:text-red-400"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SingleCampus
