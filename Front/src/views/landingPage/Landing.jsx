import {Link} from "react-router-dom"
import style from "./Landing.module.css"


function Landing() {

    return (
      <div className={style.container}>
        
        <div>
        <Link to={"/home"}>
        <button>Home</button>
        </Link>

        </div>
      </div>
    )
  }
  
  export default Landing