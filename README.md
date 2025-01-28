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

* make course switcher
* re organize layout files, get rid of layout folder, move to components or route folder
* make types not nullable
* finish auth (oauth, signup, forgot password, test, validate on client)
* clean database (tables and unnecessary functions)
* make standardized errors

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