import {useCallback, useEffect, useRef,useState} from 'react'
import {constData} from '../../../Helpers/ConstData'
import '../../../assets/css/Editor.scss'
import { Editor } from '@tinymce/tinymce-react';
import "../../../assets/css/Create.scss"
import  AlertError  from '../../Alert/AlertError'
import AlertSuccess  from '../../Alert/AlertSuccess'

export default function EditContent(props) {
  
  const [title,setTitle]=useState(props.data.title)
  const [userId,setUserId]=useState(props.data.userId)
  const editorRef = useRef(null);
  const [isError,setIsError]=useState({text:'',value:false})
  const [isSuccess,setIsSuccess]=useState({text:'',value:false})
  const userOption = constData().usersList
  const handleInput=(event , key)=>{
     if(key=="title") setTitle(event.target.value)
     if(key=="userId") setUserId(event.target.value)  
  }

  const validationInputs = useCallback(()=>{

    let textError=''

    if(title == null || title=='')
       textError +='title is empty, '

    if(editorRef.current.getContent() == null || editorRef.current.getContent() == '')
       textError +='content is empty, '

    if(userId == null || userId=='')
       textError +='userId is empty'
       
    if(textError !==''){
        setIsError({text:textError,value:true})
        return false
    }
    else 
        return true
        
  })

  const editData =  useCallback((event)=>{ 

    event.preventDefault()
    setIsError({text:'',value:false})
    setIsSuccess({text:'',value:false})

    let result = validationInputs()
    let content = editorRef.current.getContent()
     
    if(result)
        fetch(constData().BasicApi+'/'+props.data.id, {
            method: 'PATCH',
            body: JSON.stringify({
            title: title,
            body: content,
            userId: userId,
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setIsSuccess({text:'Edit Successfully',value:true})
            })
            .catch((error)=> alert(error));
  })

  return (
    <div className={'padding-top-5-percent'}>
     
      <h2>Update BLog</h2>
      <form className='create-style' onSubmit={(event)=>editData(event)}>
        <div className="container">
           <div className='margin-error'>
             {(isError.value===true)?  <AlertError error={isError.text} />:''}
             {(isSuccess.value===true) ? <AlertSuccess message={isSuccess.text} /> :''}
           </div>
            <label htmlFor="title"><b>Title</b></label>
            <input type="text" defaultValue={title} onChange={(event)=>handleInput(event,"title")}  placeholder="Enter Title"   />  

            <div className='mt-10'>
                <label htmlFor="userId"><b>User</b></label>
                <div className="select">
                    <select id="standard-select" defaultValue={userId} onChange={(event)=>handleInput(event,"userId")}>
                        {userOption.map((item)=>(
                                <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </select>  
                </div> 
            </div>

            <div className='mt-10'>
            <label htmlFor="Content"><b>Content</b></label>
                <Editor onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={props.data.body}
                    init={{
                    height: 300,
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}/>
            </div>
            <button type="submit">Update</button>
        </div>

      </form>
    </div>
  )
}
