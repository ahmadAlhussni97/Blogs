import { memo } from "react"

 function Header() {
  
  return (
    <div>
        <div className="about-section">
            <h1>Blog Content</h1>
            <p>Some text about who we are and what we do.</p>
            <p>Resize the browser window to see that this page is responsive by the way.</p>
        </div>
    </div>
  )
}

export default memo(Header)
