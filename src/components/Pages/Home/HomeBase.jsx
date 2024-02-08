import React, {useCallback, useEffect, useState,useTransition } from 'react'
import "../../../assets/css/Home.scss"
import Header  from "./Header"
import Content  from "./Content"
import Loading  from "../../Loaders/Loading"
import Pagination from "./Pagination"
import useFetch from '../../../Hooks/useFetch';
import Filter from "./Filter";
import {constData} from '../../../Helpers/ConstData'
import {sum2Number} from '../../../Helpers/Functions'


export default function Home(props) {
   
  const [fullData,setFullData]=useState([])
  const [data,setData]=useState([])
  const [dataPerPage,setDataPerPage]=useState([])
  const [start,setStart]=useState(0)
  const [isloading,setIsLoading]=useState(false)
  const [search,setSearch] = useState('')
  const [UserId,setUserId] = useState('')
  const [limit,setLimit]=useState(10)
  const [length,setLength]=useState(100)
  const [isPending, startTransition] = useTransition();
  const fullUrl=constData().BasicApi

  const handleFullData=(val)=>{
    // set post per page
    let partData=val.slice(start,limit)
    handleDataPerPage(partData)
    
    // set data for all page depend on params
    setData(val)
  
    // set all data
    setFullData(val)  
  }

  const changePage=useCallback((id)=>{

     // calcuator start value
     let newStart=limit * id

     if((id > 0) && (newStart <= length ))
       id*=limit
    
     let partData=data.slice(id,sum2Number(id,limit))

     // set values
     handleDataPerPage(partData)
     setStart(id)
  })

  const handleData=(val)=>{
    setData(val)
  }

  const handleDataPerPage=(val)=>{
    setDataPerPage(val)
  }

  const handleIsLoading=(val)=>{
    setIsLoading(val)
  }

  const getDataByParams=(dataObject)=>{
       
    let result=fullData

    if(dataObject.search!=='')
      result=(result).filter((item) => (item.title.includes(dataObject.search)|| item.body.includes(dataObject.search)))

    if(dataObject.user_id!=='')
      result=(result).filter((item) => (item.userId==dataObject.user_id))    

    return result
  }

  const handleLimit=(val)=>{

    let partData=[]
    let limit = (val==''?constData().defaultlimit:val)
    partData=data.slice(constData().defultStart,sum2Number(constData().defultStart,limit))
     // set values    
    setStart(constData().defultStart)
    handleDataPerPage(partData)
    setLimit(limit)
  }

  const handleUserId=(val)=>{

    let result=[]

    startTransition(() => {

      if(isPending)
         handleIsLoading(true)

      result = getDataByParams({user_id:val,search:search})
        
      if(!isPending)
          setTimeout(() => {
            handleIsLoading(false)
          },500); // 500 ms for load data and remove loading
        
    })

     // set values
    handleDataPerPage(result.slice(constData().defultStart,limit))
    handleData(result)
    setUserId(val)
  }

  const handleSearch= (val)=>{

    let result=[]

    startTransition(() => {

      if(isPending)
       handleIsLoading(true)
   
      result = getDataByParams({user_id:UserId,search:val})
        
      if(!isPending)
          setTimeout(() => {
            handleIsLoading(false)
          },500); // 500 ms for load data and remove loading

    })

    // set values
    handleDataPerPage(result.slice(constData().defultStart,limit))
    handleData(result)
    setSearch(val)
  }

  useEffect(()=>{
     // set values
    setStart(constData().defultStart)  // for pagination
    handleLimit(limit) // for limit and pagination
    setLength(data.length)  // for pagination
  },[data])

  // get all data
  useFetch({fullUrl,handleFullData,handleIsLoading})
  return (
    <>
       <Header />
       <Filter handleSearch={handleSearch} handleUserId={handleUserId} handleLimit={handleLimit}  />
       {(isloading)? <Loading /> :  <Content dataPerPage={dataPerPage} />}
       {(length > limit)? <Pagination changePage={changePage} start={start}  limit={limit} length={length}  />:''}
    </>
    )
}
