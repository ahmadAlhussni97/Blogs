import React, { useEffect } from "react";
import { preLoaderAnim } from "../../assets/animations";
import "../../assets/css/preloader.scss"

const PreLoader = () => {
  useEffect(() => {
    preLoaderAnim();
  }, []);
  
  return (
    <div className="preloader">
      <div className="texts-container">
        <span>Blogs</span>
        <span>Website</span>
        <span>Content.</span>
      </div>
    </div>
  );
};

export default PreLoader;