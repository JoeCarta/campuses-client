import { useParams, useNavigate } from 'react-router-dom'
import CampusForm from '../components/CampusForm'
import type { CampusFormValues } from '../components/CampusForm'
import { useCampus, useUpdateCampus } from '../hooks/campuses'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

function EditCampus() {
  const { id } = useParams()
  const campusId = Number(id)
  const navigate = useNavigate()

  const { data: campus, isLoading, isError, error } = useCampus(campusId)
  const updateCampus = useUpdateCampus()

  if (isLoading) return <Loading />
  if (isError) return <ErrorMessage message={(error as Error).message} />
  const c = campus!

  function handleSubmit(values: CampusFormValues) {
    updateCampus.mutate(
      {
        id: campusId,
        data: {
          name: values.name,
          address: values.address,
          description: values.description,
          imageUrl: values.imageUrl || undefined,
        },
      },
      { onSuccess: () => navigate(`/campuses/${campusId}`) },
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Edit campus</h1>
      {updateCampus.isError && (
        <div className="mt-4">
          <ErrorMessage message={(updateCampus.error as Error).message} />
        </div>
      )}
      <div className="mt-6">
        <CampusForm
          initial={{ name: c.name, address: c.address, description: c.description, imageUrl: c.imageUrl }}
          onSubmit={handleSubmit}
          submitting={updateCampus.isPending}
          submitLabel="Save changes"
        />
      </div>
    </div>
  )
}

export default EditCampus
