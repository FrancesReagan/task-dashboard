import React from 'react'
import ReactDOM from 'react-dom/client'
import Dashboard from './components/Dashboard'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>
)

// testing for debugging//
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// // import Dashboard from './components/Dashboard'

// //  component to check if Tailwind works
// function TestApp() {
//   return (
//     <div className="min-h-screen bg-blue-500 p-8">
//       <h1 className="text-4xl font-bold text-white mb-4">
//         TAILWIND TEST
//       </h1>
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <p className="text-gray-800 text-lg">
//            Tailwind CSS is working
//         </p>
//         <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
//           Test Button
//         </button>
//       </div>
//     </div>
//   )
// }

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <TestApp />
//   </React.StrictMode>
// )