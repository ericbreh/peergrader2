# Welcome to Peergrader

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

## Route map rough idea

```tsx
app/
├── root.tsx
├── routes/
│   ├── _index.tsx        # Home page
│   ├── login.tsx
│   ├── signup.tsx
│   ├── dashboard/
│   │   ├── _index.tsx
│   │   └── edit-account.tsx
│   ├── courses/
│   │   ├── _index.tsx
│   │   ├── create.tsx    # Teacher only
│   │   └── $courseId/
│   │       ├── _index.tsx
│   │       ├── create-assignment.tsx    # Teacher only
│   │       └── $assignmentId/
│   │           ├── _index.tsx
│   │           └── grade.tsx
```

## TODO

* finish auth (oauth, signup)
* plan teacher vs student
* plan ui for all pages
* clean database (tables and unnecessary functions)
* think about error handling
