export type User = {
  uid: string;
  email: string;
  is_teacher: boolean;
  first_name: string;
  last_name: string;
  profile_image?: string;
} | null

export type Course = {
  course_id: string;
  name: string;
  owner: string;
  created_at: string;
  join_code: string;
  number: string;
  start_date: string;
  end_date: string;
} | null