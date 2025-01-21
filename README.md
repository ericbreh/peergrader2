# Welcome to PeerGrader

## TODO

* plan ui for all pages
* finish auth (oauth, signup, forgot password, test)
* clean database (tables and unnecessary functions)

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

## Notes

### Dashboard

* What data to show?
* Different data for teacher vs student?
* Cards vs list?
* Only courses or also active assignments?
* Differentiate active vs old classes. Show only current classes?

### Course

* What to show?

### Used functions

* get_courses_student
* get_courses_teacher
