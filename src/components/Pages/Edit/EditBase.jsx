import React, { useContext, useState } from 'react'
import { AppContext } from '../../../AppContext'
import  useFetch from '../../../Hooks/useFetch'
import Loading from '../../Loaders/Loading'
import EditContent from './EditContent'
import {constData} from '../../../Helpers/ConstData'

export default function SinglePage() {
   
  const [fullData,setFullData]=useState([])
  const [isloading,setIsLoading]=useState(false)
  const EditContext = useContext(AppContext)
  
  const handleFullData=(val)=>{
    setFullData(val) 
  }

  const handleIsLoading=(val)=>{
    setIsLoading(val)
  }

  let id = window.location.pathname.split('/')[3]
  let fullUrl = `${constData().BasicApi}/${id}`
  
  EditContext.handleNaveActive("edit_post") // set active navbar
  useFetch({fullUrl,handleFullData,handleIsLoading}) // fetch data
  

  return (
    <>
      {(isloading)? <Loading /> : <EditContent data={fullData} />}
    </>
  )
}
