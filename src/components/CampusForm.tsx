import { useState } from 'react'

export interface CampusFormValues {
  name: string
  address: string
  description: string
  imageUrl: string
}

const inputClass =
  'mt-1 w-full rounded border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-violet-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100'

export default function CampusForm({
  initial,
  onSubmit,
  submitting,
  submitLabel,
}: {
  initial?: Partial<CampusFormValues>
  onSubmit: (values: CampusFormValues) => void
  submitting?: boolean
  submitLabel: string
}) {
  const [values, setValues] = useState<CampusFormValues>({
    name: initial?.name ?? '',
    address: initial?.address ?? '',
    description: initial?.description ?? '',
    imageUrl: initial?.imageUrl ?? '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function set<K extends keyof CampusFormValues>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }))
  }

  // client-side validation — required fields
  function validate() {
    const e: Record<string, string> = {}
    if (!values.name.trim()) e.name = 'name is required'
    if (!values.address.trim()) e.address = 'address is required'
    if (!values.description.trim()) e.description = 'description is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4" noValidate>
      <div>
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Name</label>
        <input className={inputClass} value={values.name} onChange={(e) => set('name', e.target.value)} />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Address</label>
        <input className={inputClass} value={values.address} onChange={(e) => set('address', e.target.value)} />
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
      </div>

      <div>
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Description</label>
        <textarea className={inputClass} rows={3} value={values.description} onChange={(e) => set('description', e.target.value)} />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      <div>
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Image URL <span className="text-neutral-400">(optional)</span>
        </label>
        <input className={inputClass} value={values.imageUrl} onChange={(e) => set('imageUrl', e.target.value)} placeholder="leave blank for a default image" />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="rounded bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-600 disabled:opacity-50"
      >
        {submitting ? 'saving…' : submitLabel}
      </button>
    </form>
  )
}
