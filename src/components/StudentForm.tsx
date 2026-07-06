import { useState } from 'react'
import { useCampuses } from '../hooks/campuses'

export interface StudentFormValues {
  firstName: string
  lastName: string
  email: string
  gpa: string // kept as string in the form, converted to a number on submit
  imageUrl: string
  campusId: string // '' means unenrolled
}

const inputClass =
  'mt-1 w-full rounded border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-violet-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function StudentForm({
  initial,
  onSubmit,
  submitting,
  submitLabel,
}: {
  initial?: Partial<StudentFormValues>
  onSubmit: (values: StudentFormValues) => void
  submitting?: boolean
  submitLabel: string
}) {
  // load campuses to populate the (optional) campus dropdown
  const { data: campuses } = useCampuses()

  const [values, setValues] = useState<StudentFormValues>({
    firstName: initial?.firstName ?? '',
    lastName: initial?.lastName ?? '',
    email: initial?.email ?? '',
    gpa: initial?.gpa ?? '',
    imageUrl: initial?.imageUrl ?? '',
    campusId: initial?.campusId ?? '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function set<K extends keyof StudentFormValues>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }))
  }

  // client-side validation — required fields, valid email, gpa 0–4
  function validate() {
    const e: Record<string, string> = {}
    if (!values.firstName.trim()) e.firstName = 'first name is required'
    if (!values.lastName.trim()) e.lastName = 'last name is required'
    if (!emailRe.test(values.email)) e.email = 'a valid email is required'
    const gpa = Number(values.gpa)
    if (values.gpa === '' || Number.isNaN(gpa) || gpa < 0 || gpa > 4)
      e.gpa = 'gpa must be between 0 and 4'
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
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">First name</label>
          <input className={inputClass} value={values.firstName} onChange={(e) => set('firstName', e.target.value)} />
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Last name</label>
          <input className={inputClass} value={values.lastName} onChange={(e) => set('lastName', e.target.value)} />
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</label>
        <input className={inputClass} value={values.email} onChange={(e) => set('email', e.target.value)} />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">GPA</label>
        <input className={inputClass} value={values.gpa} onChange={(e) => set('gpa', e.target.value)} placeholder="0.0 – 4.0" />
        {errors.gpa && <p className="mt-1 text-sm text-red-600">{errors.gpa}</p>}
      </div>

      <div>
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Campus <span className="text-neutral-400">(optional)</span>
        </label>
        <select className={inputClass} value={values.campusId} onChange={(e) => set('campusId', e.target.value)}>
          <option value="">— not enrolled —</option>
          {campuses?.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
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
