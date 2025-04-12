import {createBrowserRouter, RouterProvider} from "react-router-dom"
import SignUp from "./components/SignUp.jsx"
import Login from "./components/Login.jsx"
import Home from "./components/Home.jsx"
import News from "./components/News.jsx"

const router= createBrowserRouter([
  { path:"/signup", element: <SignUp/>},
  { path:"/login", element: <Login/>},
  { path:"/home", element: <Home/>},
  { path:"/:newsId", element: <News/>},
  { path: "*", element: <h2>404 - Page Not Found</h2> }, 
])

function App() {
  
  return <RouterProvider router={router}/>
}

export default App
