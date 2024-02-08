import React, { useContext, useState } from 'react'
import { AppContext } from '../../../AppContext'
import  useFetch from '../../../Hooks/useFetch'
import Loading from '../../Loaders/Loading'
import SinglePageContent from './SinglePageContent'
import {constData} from '../../../Helpers/ConstData'

export default function SinglePage() {
   
  const [fullData,setFullData]=useState([])
  const [isloading,setIsLoading]=useState(false)
  const sniglePageContext = useContext(AppContext)
  
  const handleFullData=(val)=>{
    setFullData(val) 
  }

  const handleIsLoading=(val)=>{
    setIsLoading(val)
  }

  let id = window.location.pathname.split('/')[2]
  let fullUrl = `${constData().BasicApi}/${id}`
  
  sniglePageContext.handleNaveActive("single_page") // set active navbar
  useFetch({fullUrl,handleFullData,handleIsLoading}) // fetch data
  
  return (
    <>
      {(isloading)? <Loading /> : <SinglePageContent data={fullData} />}
    </>
  )
}
