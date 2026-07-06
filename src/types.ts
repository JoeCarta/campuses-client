// shapes returned by the api. campus.students and student.campus are only
// present on the single-record endpoints, so they're optional here.

export interface Campus {
  id: number
  name: string
  address: string
  imageUrl: string
  description: string
  students?: Student[]
}

export interface Student {
  id: number
  firstName: string
  lastName: string
  email: string
  imageUrl: string
  gpa: number
  campusId: number | null
  campus?: Campus | null
}
