import { Link } from "react-router-dom";
import { getRandomInt } from "../../../Helpers/Functions";
import BasicButtonGroup from "../../Inputs/ButtonGroup";
import React  from "react";

export default function Content(props) {
  
  return (
    <div className="row">
      {props.dataPerPage.length > 0 && props.dataPerPage.map((item)=>(
        <div className="column" id={"Card_"+item.id} key={item.id}>
          <div className="card">
            <div className="image">
                <div className="overlay">
                  <BasicButtonGroup id={item?.id} />
                </div>
                <img src={require(`../../../assets/images/Home/team${getRandomInt(1, 3)}.jpg`)} alt="Jane" className='w-100'/>     
            </div>

              <div className="container">
                  <h2>{item?.title}</h2>
                  <p>{item?.body}</p>
                  <Link className="button" to={`/post/${item?.id}`} id={item?.id}>Show Details</Link>
              </div>
          </div>
        </div>
    
      ))}           
   </div>
  )
}
