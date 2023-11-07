import { useState } from "react"
import { createGames } from "../../redux/actions"
import {Link} from "react-router-dom"

function Form() {

  const [input, setInput] = useState({
    name: "",
    description: "",
    platforms: [],
    image: "",
    updated: "",
    rating: "",
    genres: []
  })

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    platforms: "",
    image: "",
    updated: "",
    rating: "",
    genres: ""
  })

  /*const validate = (input) => {
    if (input.name === "") {
      setErrors({ ...errors, name: "nombre no valido" })
    } else {
      setErrors({ ...errors, name: "" })
    }

    if (input.description === "") {
      setErrors({ ...errors, description: "description no valido" })
    } else {
      setErrors({ ...errors, description: "" })
    }
  }*/

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === "checkbox") {
      if (name === "platforms") {
        // Manejar checkboxes de plataformas de la misma manera
        setInput((prevState) => ({
          ...prevState,
          platforms: checked
            ? [...prevState.platforms, value]
            : prevState.platforms.filter((platform) => platform !== value),
        }));
      } else if (name === "genres") {
        // Manejar checkboxes de géneros
        setInput((prevState) => ({
          ...prevState,
          genres: checked
            ? [...prevState.genres, value]
            : prevState.genres.filter((genre) => genre !== value),
        }));
      }
    } else {
      // Si no es un checkbox, actualiza el estado normalmente
      setInput({
        ...input,
        [name]: value,
      });
    }
  };
  
  


  const onSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
  
    if (!input.name) {
      newErrors.name = "Campo vacío";
    }
  
    if (!input.description) {
      newErrors.description = "Campo vacío";
    }
  
    if (input.platforms.length === 0) {
      newErrors.platforms = "Debes seleccionar al menos una plataforma";
    }
  
    if (!input.image) {
      newErrors.image = "Campo vacío";
    }
  
    if (!input.updated) {
      newErrors.updated = "Campo vacío";
    }
  
    if (!input.rating) {
      newErrors.rating = "Campo vacío";
    }
  
    if (input.genres.length === 0) {
      newErrors.genres = "Debes seleccionar al menos un género";
    }
  
    // Resto de la validación aquí
  
    // Si hay errores, actualiza el estado de errores
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Si no hay errores, realiza la acción, como crear el juego
      createGames(input);
      alert("juego creado")
    }
  };
  

console.log(input);

  return (
    <div>
      <Link to={"/home"}>
      <button>home</button>
      </Link>
      
      <form onSubmit={onSubmit}>
        <div>
          <label>name</label>
          <input name="name" value={input.name} onChange={handleChange} />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>description</label>
          <input name="description" value={input.description} onChange={handleChange} />
          {errors.description && <p>{errors.description}</p>}
        </div>
        <div>
          <label><input type="checkbox" name="platforms" value="xbox" checked={input.platforms.includes("xbox")} onChange={handleChange} />xbox</label>
          <label><input type="checkbox" name="platforms" value="play" checked={input.platforms.includes("play")} onChange={handleChange} />play</label>
          {errors.platforms && <p>{errors.platforms}</p>}
        </div>
        <div>
          <label>image</label>
          <input name="image" value={input.image} onChange={handleChange} />
          {errors.image && <p>{errors.image}</p>}
        </div>
        <div>
          <label>updated</label>
          <input name="updated" value={input.updated} onChange={handleChange} />
          {errors.updated && <p>{errors.updated}</p>}
        </div>
        <div>
          <label>rating</label>
          <input name="rating" value={input.rating} onChange={handleChange} />
          {errors.rating && <p>{errors.rating}</p>}
        </div>
        <div>
        <label><input type="checkbox" name="genres" value="Action" checked={input.genres.includes("Action")} onChange={handleChange} />Action</label>
          <label><input type="checkbox" name="genres" value="Indie" checked={input.genres.includes("Indie")} onChange={handleChange} />Indie</label>
          {errors.genres && <p>{errors.genres}</p>}
        </div>

        <button type="submit">submit</button>

      </form>
    </div>
  )
}

export default Form