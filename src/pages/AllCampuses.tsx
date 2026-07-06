import { Link } from 'react-router-dom'
import { useCampuses } from '../hooks/campuses'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

function AllCampuses() {
  const { data: campuses, isLoading, isError, error } = useCampuses()

  if (isLoading) return <Loading />
  if (isError) return <ErrorMessage message={(error as Error).message} />

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Campuses</h1>
        <Link
          to="/campuses/new"
          className="rounded bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-600"
        >
          Add campus
        </Link>
      </div>

      {campuses!.length === 0 ? (
        <p className="mt-6 text-neutral-500 dark:text-neutral-400">no campuses yet.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campuses!.map((c) => (
            <Link
              key={c.id}
              to={`/campuses/${c.id}`}
              className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
            >
              <img src={c.imageUrl} alt={c.name} className="h-40 w-full object-cover" />
              <div className="p-4">
                <h2 className="font-semibold text-neutral-900 dark:text-white">{c.name}</h2>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{c.address}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default AllCampuses
