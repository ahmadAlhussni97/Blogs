import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Layout/Navbar'
import {React} from 'react'

export default function Layout() {

  return (
    <>
      <Navbar /> 
      <Outlet />
    </>

  )
}
