import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout/Layout'
import Home from './Pages/Home/HomeBase'
import Profile from './Pages/Profile'
import Create from './Pages/Create'
import Edit from './Pages/Edit/EditBase'
import Page404 from './Pages/Static/Page404'
import SinglePage from './Pages/Single/SinglePageBase';

export default function Base() {
  return (
       <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="create" element={<Create />} />
              <Route path="post/:id" element={<SinglePage />} />
              <Route path="post/edit/:id" element={<Edit />} />
              <Route path="*" element={<Page404 />} />
            </Route>
          </Routes>
      </BrowserRouter>
  )
}
