# Welcome to PeerGrader

## To run development server

```tsx
npm install
npm run dev
```

create a `.env` file in the `peergrader2` folder

```tsx
VITE_SUPABASE_URL="url"
VITE_SUPABASE_KEY="key"
```

## TODO

* plan ui for all pages
* finish auth (oauth, signup, forgot password, test)
* clean database (tables and unnecessary functions)
* where to generate ids, join code...

## MVP

* Create account and login
* Teacher
  * Create course
  * Create assignment
  * View submissions and grades
* Student
  * Join course
  * Submit assignment
  * Grade others submissions
  * View grades

## Notes

### Dashboard

* What data to show? Different data for teacher vs student?
* Differentiate active vs old classes. Show only current classes?

### Course

* Start / end date vs "term" (fall, winter, spring)

### Used functions

* get_courses_student
* get_courses_teacher
