
import React, {memo} from 'react'
import SelectOption from '../../Inputs/SelectOption'
import SearchInput from '../../Inputs/Search'


export default memo (function Filter(props) {
  
  const searcheVal = event => {
    props.handleSearch(event.target.value)
  }; 

  const selectUserId= event=>{
    props.handleUserId(event.target.value)
  }

  const selectLimit= (event)=>{
    props.handleLimit(event.target.value)
  }

  return (
    <>
      <div className='filter-postion'>
        <SelectOption Function={(event)=>selectLimit(event)} label="Limit" />
        <SelectOption Function={(event)=>selectUserId(event)} label="User" />
        <SearchInput  searcheVal={searcheVal}  />
      </div>
    </>
  )
})
