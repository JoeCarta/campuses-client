import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-5xl font-bold text-violet-500">404</p>
      <h1 className="mt-4 text-xl font-semibold text-neutral-900 dark:text-white">page not found</h1>
      <p className="mt-2 text-neutral-500 dark:text-neutral-400">
        the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-600"
      >
        go home
      </Link>
    </div>
  )
}

export default NotFound
