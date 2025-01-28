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

* make types not nullable
* rename files? courses-dashboard, courses-students, ect? maybe
* student/teacher/owner layouts also display different items on sidebar
* finish auth (oauth, signup, forgot password, test, validate on client)
* clean database (tables and unnecessary functions)
* make standardized errors
* make course switcher

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
