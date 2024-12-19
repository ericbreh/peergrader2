# Welcome to Peergrader

* 📖 [Remix docs](https://remix.run/docs)
* https://ui.shadcn.com/

## To run development server
```shellscript
npm run dev
```

## To add a UI element
* npx shadcn@latest init
* Place the UI components in the app/components/ui folder.
* Your own components can be placed in the app/components folder.
* The app/lib folder contains all the utility functions. We have a utils.ts where we define the cn helper.
* The app/tailwind.css file contains the global CSS.

## Navigation/routing
* https://remix.run/docs/en/main/discussion/routes
 
```
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