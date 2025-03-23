import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

// pages
import {Home, About, Contact, LikedImages, DownloadImages, ImageInfo, Login, Register} from './pages'

// layouts 
import MainLayout from "./layouts/MainLayout";

// actions 
import { action as HomeAction } from "./pages/Home";



function App() {
const user = true
const routes = createBrowserRouter ([
  { path: "/",
    element: <MainLayout/>,
    children: [
      {
        index: true,
        element: <Home/>,
        action: HomeAction,
      },
      {
        path: '/about',
        element: <About/>
      },
     {
        path: '/contact',
        element: <Contact/>
      },

      {
        path: '/likedImages',
        element: <LikedImages/>
      },

      {
        path: '/downloadImages',
        element: <DownloadImages/>
      },

      {
        path: '/imageInfo?/:id',
        element: <ImageInfo/>
      },

      {
        path: '/login',
        element: user ? <Navigate to="/" /> : <Login/>
      },

      {
        path: '/register',
        element: user ? <Navigate to="/" /> : <Register/>
      },
    ]

  }
])
return <RouterProvider router={routes}/>

   
  
}

export default App
