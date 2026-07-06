import { useNavigate } from 'react-router-dom'
import CampusForm from '../components/CampusForm'
import type { CampusFormValues } from '../components/CampusForm'
import { useCreateCampus } from '../hooks/campuses'
import ErrorMessage from '../components/ErrorMessage'

function AddCampus() {
  const navigate = useNavigate()
  const createCampus = useCreateCampus()

  function handleSubmit(values: CampusFormValues) {
    createCampus.mutate(
      {
        name: values.name,
        address: values.address,
        description: values.description,
        imageUrl: values.imageUrl || undefined,
      },
      { onSuccess: (campus) => navigate(`/campuses/${campus.id}`) },
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Add campus</h1>
      {createCampus.isError && (
        <div className="mt-4">
          <ErrorMessage message={(createCampus.error as Error).message} />
        </div>
      )}
      <div className="mt-6">
        <CampusForm onSubmit={handleSubmit} submitting={createCampus.isPending} submitLabel="Create campus" />
      </div>
    </div>
  )
}

export default AddCampus
