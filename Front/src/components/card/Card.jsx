import style from "./Card.module.css"
import {Link} from "react-router-dom"

function Card({game}) {
  console.log(game, "los juegos");

  const {id, name, image, genres} = game

    return (
      <div className={style.container}>
        <Link to={`/detail/${id}`}>
        <p>{name}</p>
        <img src={image} alt="image" />
        {genres?.map((genres, id) => {
          return (
            <p key={id}>{genres}</p>
          )
        })}
        </Link>
      </div>
    )
  }
  
  export default Card