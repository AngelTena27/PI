import Cards from "../../components/cards/Cards"
import Nav from "../../components/nav/nav"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getByName, getGames, orderCards, getGenres, filterGenres} from "../../redux/actions"
import {Link} from "react-router-dom"
import style from "./Home.module.css"



function Home() {

  const dispatch = useDispatch()
  const allGames = useSelector((state) => state.allGames)
  const allGenres = useSelector((state) => state.allGenres)
  const [searchString, setSearchString] = useState([])
  const [page, setPage] = useState(1)
  

  const handleChange = (e) => {
    e.preventDefault()
    setSearchString(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getByName(searchString))
  }

  const handleOrder = (e) => {
    const option = e.target.value;
    dispatch(orderCards(option))
    console.log("orden")
  }

  const handlerPreviusPage = () => {
    setPage(prev => prev -1)
  }

  const handlerNextPage = () => {
    setPage(prev => prev +1)
  }

  const filterByGenres = (e) => {
    dispatch(filterGenres(e.target.value))
  }

  useEffect(() => {
    dispatch(getGames(page))
    dispatch(getGenres())
  }, [page])

  return (
    <div>
      <div className={style.container}>
    <div className={style.order}>
      <select onChange={handleOrder}>
        <option value="nameAsc">Ordenar por nombre (ascendente)</option>
        <option value="nameDesc">Ordenar por nombre (descendente)</option>
        <option value="ratingAsc">Ordenar por rating (ascendente)</option>
        <option value="ratingDesc">Ordenar por rating (descendente)</option>
      </select>
    </div>

      <div>
        <h3>Filtros/Ord</h3>
        <div>
          <select name="filterByGenres" onChange={filterByGenres}>
          {allGenres.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <Nav handleChange={handleChange} handleSubmit={handleSubmit} />
      
      <div className={style.page}>
      <button onClick={handlerPreviusPage} name="prev">prev</button>
        <h3>{page}</h3>
      <button onClick={handlerNextPage} name="next">next</button>
      </div>

      <Link to={"/form"}>
      <button>Crear Juego</button>
      </Link>

      </div>
      <Cards allGames={[...allGames]} />

      

    </div>
  )
}

export default Home