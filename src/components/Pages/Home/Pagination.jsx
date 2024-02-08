
import { useState,memo,useEffect } from 'react';
import { Link } from 'react-router-dom';
import {constData} from '../../../Helpers/ConstData'

export default memo(function Pagination(props) {

  const [currentPage,setCurrentPage] = useState((props.start>0)?parseInt(props.start/10):0)
  const recordsPerPage = props.limit
  // Records to be displayed on the current page
  const nPages = Math.ceil(props.length / recordsPerPage)  
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1)


  const reInitialize=()=>{
    if(eval(props.start) <= 0)
      setCurrentPage(constData().defultStart)
  }

  const generateNewPage=(pgNumber)=>{
     setCurrentPage(pgNumber)
  }

  const goToNextPage = () => {
    if(currentPage !== (nPages -1))
      setCurrentPage(currentPage + 1)
  }
  
  const goToPrevPage = () => {
    if(currentPage !== 0)
      setCurrentPage(currentPage - 1)
  }

  useEffect(()=>{
    props.changePage(currentPage)
  },[currentPage])


  useEffect(()=>{
    reInitialize()
  },[props.start])

  return (
    <div className="pagination">
       <Link onClick={()=>goToPrevPage()}  to="/" >«</Link>
       {pageNumbers.map(pgNumber => (
        <Link  key={pgNumber-1}  className= {`page-item ${currentPage == (pgNumber-1) ? 'active-link' : ''} `} 
        onClick={()=>generateNewPage(pgNumber-1)} to="/" >  {pgNumber}  </Link>
         ))}
        <Link onClick={()=>goToNextPage()} to="/" >»</Link>
    </div>
  )
})
