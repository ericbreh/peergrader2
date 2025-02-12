export type User = {
  uid: string;
  email: string;
  is_teacher: boolean;
  first_name: string;
  last_name: string;
  profile_image?: string;
}

export type Course = {
  course_id: string;
  name: string;
  owner: string;
  created_at: Date;
  join_code: string;
  number: string;
  start_date: Date;
  end_date: Date;
}

export type Assignment = {
  asgn_id: string;
  created_at: Date;
  name: string;
  owner: string;
  course_id: string;
  anonymous_grading: boolean;
  start_date_submission: Date;
  end_date_submission: Date;
  start_date_grading: Date;
  end_date_grading: Date;
  max_score: number;
  num_peergrades: number;
  number_input: boolean;
  num_annotations: number;
  description: string;
}

export type Submission = {
  file_id: string;
  filename: string;
  owner: string;
  asgn_id: string;
  created_at: Date;
  num_grades: number;
  view_url: string;
}