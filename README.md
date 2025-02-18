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

* break up assignment page into teacher/student or into components
* finish auth (oauth, signup, forgot password, test, validate on client)
* make standardized errors (not authorized, page not found)
* clean database (tables and unnecessary functions)
* assignment stage, show if submitted, if can still submit...

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
