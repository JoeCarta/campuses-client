import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import type { Student } from '../types'

export interface StudentInput {
  firstName: string
  lastName: string
  email: string
  gpa: number
  imageUrl?: string
  campusId?: number | null
}

// read: list of all students (each includes its campus)
export function useStudents() {
  return useQuery({
    queryKey: ['students'],
    queryFn: () => api.get<Student[]>('/students'),
  })
}

// read: one student (includes their campus, or null)
export function useStudent(id: number) {
  return useQuery({
    queryKey: ['students', id],
    queryFn: () => api.get<Student>(`/students/${id}`),
  })
}

export function useCreateStudent() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: StudentInput) => api.post<Student>('/students', data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['students'] })
      qc.invalidateQueries({ queryKey: ['campuses'] })
    },
  })
}

// used by edit student, "change campus", and "remove from campus" (campusId: null)
export function useUpdateStudent() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<StudentInput> }) =>
      api.put<Student>(`/students/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['students'] })
      qc.invalidateQueries({ queryKey: ['campuses'] })
    },
  })
}

export function useDeleteStudent() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => api.del(`/students/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['students'] })
      qc.invalidateQueries({ queryKey: ['campuses'] })
    },
  })
}
