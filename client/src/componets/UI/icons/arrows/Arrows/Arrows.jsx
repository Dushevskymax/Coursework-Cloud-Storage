import React from "react";
import '../left_arrow/chevron-left-o.css';
import './arrows.css';

const Arrows = ({isInFolder, currentPath, setNewPath}) => {
    
    return (
        <div className={isInFolder ? "in_folder" : "not_in_folder"}
             onClick={() => setNewPath(currentPath.replace(/(\/[^\/]+).$/, '/' ))}>
            <span><i className="gg-chevron-left-o"></i></span>
        </div>
    )
}

export default Arrows;