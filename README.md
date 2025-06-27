



__TASK MANAGEMENT DASHBOARD__
-------------------------------------------
  -A modern, responsive task management application built with React and Tailwind CSS. You can create, organize, and track your tasks with a beautiful and simply intuitive interface.
  
<img width="609" alt="image" src="https://github.com/user-attachments/assets/0e7a72d7-cb99-41b7-b447-3537549ff16e" />
_LIGHT-MODE_
<img width="569" alt="image" src="https://github.com/user-attachments/assets/5b40889a-b4d4-48a0-aa86-e8795d1df0ba" />
_DARK-MODE_


_Features_
 -Task Creation - add tasks with title, description, due date, and priority level.
 
 -Task Management - mark tasks as complete/incomplete, edit, and/or delete them.
 
 -Statistics Dashboard - real-time overview of task progress (future version)
 
 -Dark/Light Themes - you can toggle between themes with persistent preferences stored for you.
 
 -Local Storage - automatic data persistence across browser sessions.
 
 -Export Functionality - download tasks as JSON files
 
 -Responsive Design - this application works seamlessly on desktop and mobile
 
 -Modern UI - clean, simple, yet professional interface.

 _To Use_
  -Node.js (v16 or higher), npm package
  _Installation_
   -clone the repo: `git clone https://github.com/FrancesReagan/task-dashboard.git`
   -cd task-management-dashboard
   -install dependencies: `npm install`,`npm install tailwindcss @tailwindcss/vite`, Configure the Vite plugin: vite.config.ts: add to top: `import tailwindcss from '@tailwindcss/vite'`; update the plugins      
                         section: plugins: [react(), tailwindcss()], Add an @import to the top of your CSS file (/src/index.css) that imports Tailwind CSS., `@import "tailwindcss"`;
   -Start the development server: `npm run dev`; open browser with ctlr Click on link or go to `http://localhost:5173` to view the application.
  
   

--------------------------------------------------------------------------------

Project Reflections: Task Management Dashboard 
 -This project involved creating a comprehensive task management dashboard using React, Vite 6.3.5., and Tailwind CSS. This application
 features CRUD operations, real-time statistics, theme switching, and persistant data storage.

   _React Implementation_:
    -React features utilized:
     1.Functional components wiht React Hooks
      -used `useState` for managing component state (tasks, filters,theme, form data).
      -implemented `useEffect`for side effects like localStorage operations and inital data loading.
      -applied `useCallback`for memorizing event handlers to prevent unnecessary re-renders.
      -used`useMemo` for potential future heavy calculations for the task statistics--not yet necessary but there for the future.
      
     2.Component Architecture
      <img width="98" alt="image" src="https://github.com/user-attachments/assets/dacdef18-bd88-471a-a585-193df735d715" />

     3.State Management Patterns
       -Lifting State Up: centralized task data in the dashboard component.
       -prop drilling: passed necessary data and handlers down to the child components.
       -controlled components:all form inputs managed through React state.

    4.Event Handling
      -implemented controlled form submission with `preventDefault()`.
      -used callback patterns for parent-child communication.
      -applied event delegation for dynamic task operations.

_Challenges_
 1.Syntax and import errors:
   -Multiple syntax errors: -missing semicolons and brackets, incorrect variable names (`cont` instead of `const`), malformed template literals--too many spaces, and wrong import/export statements.
   ___Solution_:systematic debugging approach, line-by-line error identification, created simple test components to isolate issues, used browser developer tools for real-time error tracking.
   
 2.CSS framework integration:
   -Tailwind CSS not loading properly: initial CDN link was not working, styling appeared broken or missing.
   __Solution_: tested many CDN sources, switched from CSS link to javascript CDN:`<script src="https://cdn.tailwindcss.com"></script>`, created test components to verify CSS was loading before building out full components.

3.Component arhitecture complexity:
  -managing state across multiple nested components: prop drilling became complex, state updates needed to be coordinated across components.
  _Solution_: centralized state management in the main dashboard component, used callback patterns for child-to-parent communication, implemented clear data flow: dashboard -> taskform/taskfilter/tasklist -> taskitem.

4.Local Storage Integration:
  -Persisting data across browser sessions: -JSON serialization/deserialization errors, and handling edge cases like corrupted data.
  _Solution_: robust error handling for localStorage operations.

  <img width="336" alt="image" src="https://github.com/user-attachments/assets/6102dc00-72ed-4927-856f-c1c14c6c9a30" />

  
-----------------------
Composition Strategy:
 -built reusable components, implemented theme support across all components, used composition over inheritance for flexible UI construction.

State Management:
 -Centralized architecture:
 <img width="302" alt="image" src="https://github.com/user-attachments/assets/f1c0efcb-bf9c-4b11-b597-8836e8c86768" /> Core state in dashboard component

  -key patterns: immutable updates--created new state objects for all changes, callback optimization-used `useCallback` for stable event handlers, computed values-used `useMemo` for planning for expansion of app if it needs to 
                 handle heavy calculations like task statistics, side effects-managed localStorage synching with `useEffect`.

  -data flow: user action -> event handler -> state update -> re-render -> UI update

  --------------------

  This project is a modern React development application that has systematic component design, centralized state management, and performance-conscious implementation. This experience re-enforced for me the importance of 
  incremental development and testing of each increment, clear component boundaries, and robust error handling in building strong and maintable React applications.

  

