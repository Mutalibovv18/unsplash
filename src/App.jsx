import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import {Home, About, Contact} from './pages'

// layouts 
import Mainlayout from "./layouts/Mainlayout";


function App() {
const routes = createBrowserRouter ([
  { path: "/",
    element: <Mainlayout/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: '/about',
        element: <About/>
      },
     {
        path: '/contact',
        element: <Contact/>
      },
    ]

  }
])
return <RouterProvider router={routes}/>

   
  
}

export default App
