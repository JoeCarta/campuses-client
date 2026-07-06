// shown when a query or mutation fails
export default function ErrorMessage({ message }: { message?: string }) {
  return (
    <p className="rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
      something went wrong{message ? `: ${message}` : ''}.
    </p>
  )
}
