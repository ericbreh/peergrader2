# Welcome to Peergrader

* [Remix docs](https://remix.run/docs)
* [shadcn ui docs](https://ui.shadcn.com/)

## To run development server
```shellscript
npm install
npm run dev
```
create a `.env` file in the `peergrader2` folder
```
VITE_SUPABASE_URL="url"
VITE_SUPABASE_KEY="key"
```

## UI elements
* npx shadcn@latest init
* Place the UI components in the app/components/ui folder.
* Your own components can be placed in the app/components folder.
* The app/lib folder contains all the utility functions. We have a utils.ts where we define the cn helper.
* The app/tailwind.css file contains the global CSS.

## Color Theme
* https://ui.shadcn.com/docs/theming

## Text
* https://ui.shadcn.com/docs/components/typography

```tsx
<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
<p className="leading-7 [&:not(:first-child)]:mt-6">

```

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