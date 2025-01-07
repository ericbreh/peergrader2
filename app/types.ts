export type Course = {
  course_id: string;
  name: string;
  number: string;
}

export type User = {
  uid: string;
  email: string;
  is_teacher: Boolean;
  first_name: string;
  last_name: string;
  profile_image?: string;
}