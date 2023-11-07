import Card from "../card/Card"
import style from "./Cards.module.css"

function Cards({allGames = []}) {

  const gameList = allGames

    return (
      <div className={style.container}>
        {gameList?.map((game, id) => {
          return <Card
          key={id}
          game={game}
          />
        })}
      </div>
    )
  }
  
  export default Cards