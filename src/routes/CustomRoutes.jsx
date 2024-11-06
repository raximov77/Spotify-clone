import React from 'react'
import {Home, Like, Search, Single} from '../pages'
import { Route, Routes } from 'react-router-dom'

function CustomRoutes() {
    const routeList = [
        {
            id:1,
            path:"/",
            element:<Home/>
        },
        {
            id:2,
            path:"/liked",
            element:<Like/>
        },
        {
            id:3,
            path:"/search",
            element:<Search/>
        },
        {
            id:4,
            path:"/music/:id",
            element:<Single/>
        },
    ]
  return (
    <Routes>
        {routeList.map(item => <Route key={item.id} path={item.path} element={item.element}/>)}
    </Routes>
  )
}

export default CustomRoutes