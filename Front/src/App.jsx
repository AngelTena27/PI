

import Detail from './views/detailPage/detail'
import Form from './views/formPage/Form'
import Home from './views/homePage/Home'
import Landing from './views/landingPage/Landing'
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import style from "./App.module.css"

function App() {

  return (
    <div className={style.container}>

    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/form' element={<Form/>}/>
      <Route path='/detail/:id' element={<Detail/>}/>
    </Routes>

    </div>
  )
}

export default App
