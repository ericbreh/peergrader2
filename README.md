# Welcome to Peergrader

* [Remix docs](https://remix.run/docs)

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

## UI elements

* [shadcn ui docs](https://ui.shadcn.com/docs/installation/remix)

* [Theme](https://ui.shadcn.com/docs/theming)

* [Text](https://ui.shadcn.com/docs/components/typography)

## Navigation/routing

* <https://remix.run/docs/en/main/discussion/routes>

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
