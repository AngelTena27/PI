import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import style from "./detail.module.css"
import {Link} from "react-router-dom"

function Detail() {


  const params = useParams();

  const [game, setGame] = useState({})
  console.log(game);

  useEffect(() => {
    axios(`http://localhost:3001/videogames/${params?.id}?key=471cd1bc20b14379ab40d9ba5354b957`)
      .then(({ data }) => {
        if (data.name) {
          setGame(data)
        } else {
          alert("no hay monos")
        }
    })
    .catch(() => {
      console.log("valio pilin");
    })
  }, [params?.id])

  return (
    <div className={style.container}>
      <Link to={"/home"}>
      <button>home</button>
      </Link>
      <h1>{game?.id}</h1>
      <h2>{game?.name}</h2>
      <img src={game?.image} alt="image" />
      <p>{game?.description}</p>
      {game?.platforms?.map((platform, id) => {
          return (
            <p key={id}>{platform}</p>
          )
        })}
      <p>{game?.updated}</p>
      <p>{game?.rating}</p>
      <p>{game?.genres}</p>
    </div>
  )
}

export default Detail