import {useCallback, useEffect, useRef,useState} from 'react'
import {constData} from '../../Helpers/ConstData'
import '../../assets/css/Editor.scss'
import { Editor } from '@tinymce/tinymce-react';
import "../..//assets/css/Create.scss"
import  AlertError  from '../Alert/AlertError'
import AlertSuccess  from '../Alert/AlertSuccess'


export default function Create() {

  const title=useRef('')
  const userId=useRef('')
  const editorRef = useRef(null);
  const [isError,setIsError]=useState({text:'',value:false})
  const [isSuccess,setIsSuccess]=useState({text:'',value:false})
  const userOption = constData().usersList 
  const validationInputs = useCallback(()=>{

    let textError=''

    if(title.current.value== null || title.current.value=='')
       textError +='title is empty, '

    if(editorRef.current.getContent() == null || editorRef.current.getContent() == '')
       textError +='content is empty, '

    if(userId.current.value== null || userId.current.value=='')
       textError +='userId is empty'
       
    if(textError !==''){
        setIsError({text:textError,value:true})
        return false
    }
    else 
        return true
        
  })
  const storeData =  useCallback((event)=>{ 

    event.preventDefault()
    setIsError({text:'',value:false})
    setIsSuccess({text:'',value:false})

    let result = validationInputs()
    let content = editorRef.current.getContent()

    if(result)
        fetch(constData().BasicApi, {
            method: 'POST',
            body: JSON.stringify({
            title: title.current.value,
            body: content,
            userId: userId.current.value,
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setIsSuccess({text:'Create Successfully',value:true})
            })
            .catch((error)=> alert(error));
  })

  return (
    <div className={'padding-top-5-percent'}>
      <h2>Create BLog</h2>
      <form className='create-style' onSubmit={(event)=>storeData(event)}>
        <div className="container">
           <div className='margin-error'>
            {(isError.value===true)?  <AlertError error={isError.text} />:''}
            {(isSuccess.value===true) ? <AlertSuccess message={isSuccess.text} /> :''}
           </div>
            <label htmlFor="title"><b>Title</b></label>
            <input type="text"  placeholder="Enter Title" ref={title}  />  
            
            <div className='mt-10'>
              <label htmlFor="userId"><b>User</b></label>
              <div className="select">
                <select id="standard-select" ref={userId}>
                  {userOption.map((item)=>(
                        <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
               
                </select>
                <span className="focus"></span>
              </div>
            </div>
          

            <div className='mt-10'>
              <label htmlFor="Content"><b>Content</b></label>
               <Editor  onInit={(evt, editor) => editorRef.current = editor}
                initialValue="<p>This is the initial content of the editor.</p>"
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
    
            <button type="submit">Save</button>
        </div>

      </form>
    </div>
  )
}
