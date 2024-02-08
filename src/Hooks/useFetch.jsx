import {useEffect} from 'react'
import axios from "axios"; 

const useFetch = async(props)=> {
  
    useEffect( ()=>{
      
        const loadPost = async () => {
  
            props.handleIsLoading(true)
        
            const response = await axios.get(props.fullUrl).
            catch(() => { alert('Error On Fetching Data') }); 
            
            if(response){
              props.handleFullData(response.data)
            }
              
            setTimeout(() => {
              props.handleIsLoading(false)
            },500); // 500 ms for load data and remove loading
        }

      loadPost()

    },[])

}

export default useFetch
