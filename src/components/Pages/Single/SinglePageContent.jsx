import { getRandomInt } from "../../../Helpers/Functions";
    
export default function SinglePageContent(props) {
  
  const cardSinglePage = { textAlign: "center"}
  const padding={  padding:"1%" }

  return (
  <>
    <div className="row">
        <div className="leftcolumn">
        <div style={cardSinglePage}>
            <h2>{props.data?.title}</h2>
            <div ><img src={require(`../../../assets/images/Home/team${getRandomInt(1, 3)}.jpg`)} /></div>
            <p style={padding}>{props.data?.body}</p>
        </div>
        </div>
    </div>
  </>
 
  )
}
