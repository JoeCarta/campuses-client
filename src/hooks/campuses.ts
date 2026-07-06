import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import type { Campus } from '../types'

export interface CampusInput {
  name: string
  address: string
  description: string
  imageUrl?: string
}

// read: list of all campuses
export function useCampuses() {
  return useQuery({
    queryKey: ['campuses'],
    queryFn: () => api.get<Campus[]>('/campuses'),
  })
}

// read: one campus (includes its enrolled students)
export function useCampus(id: number) {
  return useQuery({
    queryKey: ['campuses', id],
    queryFn: () => api.get<Campus>(`/campuses/${id}`),
  })
}

export function useCreateCampus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CampusInput) => api.post<Campus>('/campuses', data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['campuses'] }),
  })
}

export function useUpdateCampus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CampusInput> }) =>
      api.put<Campus>(`/campuses/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['campuses'] }),
  })
}

export function useDeleteCampus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.del(`/campuses/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['campuses'] })
      // deleting a campus un-enrolls its students, so their data changed too
      qc.invalidateQueries({ queryKey: ['students'] })
    },
  })
}
