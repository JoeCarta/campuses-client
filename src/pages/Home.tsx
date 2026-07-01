import { Link } from 'react-router-dom'

function StatCard({
  label,
  value,
  to,
}: {
  label: string
  value: string
  to: string
}) {
  return (
    <Link
      to={to}
      className="block rounded-lg border-t-4 border-violet-500 bg-white p-6 shadow transition-shadow hover:shadow-md dark:bg-neutral-900"
    >
      <div className="text-4xl font-bold text-neutral-900 dark:text-white">
        {value}
      </div>
      <div className="mt-1 text-neutral-600 dark:text-neutral-400">{label}</div>
      <div className="mt-3 text-sm font-medium text-violet-600 dark:text-violet-400">
        More info &rarr;
      </div>
    </Link>
  )
}

function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
        Dashboard
      </h1>
      <p className="mt-1 text-neutral-600 dark:text-neutral-400">
        Manage campuses and the students enrolled at them.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {/* IMPORTANT NOTE: THESE  R DUMMY VALUES, FIX THESE WHEN BACKEND IS WIRED*/}
        <StatCard label="Campuses" value="—" to="/campuses" />
        <StatCard label="Students" value="—" to="/students" />
      </div>
    </div>
  )
}

export default Home
