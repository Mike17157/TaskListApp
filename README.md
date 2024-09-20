# Task Manager App

This is a Next.js project that implements a Task Manager application with Firebase Realtime Database integration.

## Features

- Create, read, update, and delete tasks
- Categorize tasks
- Filter tasks by category
- Real-time updates using Firebase Realtime Database
- Responsive design with Tailwind CSS

## Technologies Used

- Next.js 14
- React 18
- Redux Toolkit
- Firebase Realtime Database
- Tailwind CSS
- TypeScript

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your Firebase project and Realtime Database
4. Add your Firebase configuration to `src/lib/firebase.ts`
5. Set up your Firebase Realtime Database rules:
   ```json
   {
     "rules": {
       ".read": "now < 1729310400000",  // 2024-10-19
       ".write": "now < 1729310400000",  // 2024-10-19
       "tasks": {
         ".indexOn": ["category"]
       }
     }
   }
   ```
6. Run the development server:
   ```bash
   npm run dev
   ```
7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: Next.js app router and pages
- `src/components`: React components
- `src/lib`: Utility functions and Firebase configuration
- `src/store`: Redux store and slices
- `src/app/api`: API routes for server-side operations

## Key Components

- `TaskPage`: Main component for task management
- `CategoryList`: Displays and manages categories
- `TaskList`: Displays tasks for the selected category

## API Routes

- `GET /api/tasks`: Fetch tasks (with optional category filter)
- `POST /api/tasks`: Create a new task
- `DELETE /api/tasks`: Delete a task
- `GET /api/categories`: Fetch categories
- `POST /api/categories`: Create a new category
- `DELETE /api/categories`: Delete a category

## Styling

This project uses Tailwind CSS for styling. Custom styles and theme configuration can be found in `tailwind.config.ts`.

## State Management

Redux Toolkit is used for state management. The main store is defined in `src/store/index.ts`.

## Firebase Integration

Firebase Realtime Database is used for data persistence. The Firebase configuration can be found in `src/lib/firebase.ts`.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Firebase Realtime Database Documentation](https://firebase.google.com/docs/database)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check [issues page](your-issues-url) if you want to contribute.

## License

[MIT](https://choosealicense.com/licenses/mit/)
