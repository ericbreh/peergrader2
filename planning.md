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