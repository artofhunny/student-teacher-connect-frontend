// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import { Provider } from 'react-redux'
import appStore from "./utils/appStore";
import Body from './components/Body'
import DashboardPage from './pages/DashboardPage'

function App() {
  // const [count, setCount] = useState(0)

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/",
          element: <LoginPage />
        },
        {
          path: "/dashboard",
          element: <DashboardPage />
        }
      ]
    }
  ]);

  return (
    <>
      <Provider store={appStore}>
        <RouterProvider router={appRouter} />
      </Provider>
    </>
  )
}

export default App
