import axios from "axios"
import {GET_BY_NAME, GET_GAMES, ORDER, GET_GENRES,  FILTER_BY_GENRES} from "./actions-types"

export const getGames = (page) => {
    const endpoint = `http://localhost:3001/videogames?key=471cd1bc20b14379ab40d9ba5354b957&page=${page}`;
 
    return async (dispatch) => {
        try {
            const { data } = await axios(endpoint)

            return dispatch({
                type: GET_GAMES,
                payload: data,
            });

        } catch (error) {
            throw Error (error.message)
        }
    }; 
};

export const getByName = (name) => {
    const endpoint = `http://localhost:3001/videogames?name=${name}&key=471cd1bc20b14379ab40d9ba5354b957`;

    return async (dispatch) => {
        try {
            const { data } = await axios(endpoint)

            return dispatch({
                type: GET_BY_NAME,
                payload: data,
            });

        } catch (error) {
            throw Error (error.message)
        }
    }; 
};

export const createGames = async (body) => {
    console.log(body, "body");
    const endpoint = `http://localhost:3001/videogames?key=471cd1bc20b14379ab40d9ba5354b957`;

        try {
            const { data } = await axios.post(endpoint, body)
            return data
        } catch (error) {
            throw Error (error.message)
        }
};

export const orderCards = (option) => {
    return (dispatch, getState) => {
      const { allGames } = getState();
  
      switch (option) {
        case 'nameAsc':
          const gamesByNameAsc = [...allGames].sort((a, b) => a.name.localeCompare(b.name));
          dispatch({ type: ORDER, payload: gamesByNameAsc });
          break;
        case 'nameDesc':
          const gamesByNameDesc = [...allGames].sort((a, b) => b.name.localeCompare(a.name));
          dispatch({ type: ORDER, payload: gamesByNameDesc });
          break;
        case 'ratingAsc':
          const gamesByRatingAsc = [...allGames].sort((a, b) => a.rating - b.rating);
          dispatch({ type: ORDER, payload: gamesByRatingAsc });
          break;
        case 'ratingDesc':
          const gamesByRatingDesc = [...allGames].sort((a, b) => b.rating - a.rating);
          dispatch({ type: ORDER, payload: gamesByRatingDesc });
          break;
        default:
          break;
      }
    };
  };
  
  export const getGenres = () => {
    const endpoint = 'http://localhost:3001/genres?key=471cd1bc20b14379ab40d9ba5354b957';
 
    return async (dispatch) => {
        try {
            const { data } = await axios(endpoint)

            return dispatch({
                type: GET_GENRES,
                payload: data,
            });

        } catch (error) {
            throw Error (error.message)
        }
    }; 
};

export const filterGenres = (genre) => {
    console.log(genre, "prueba");
    return (dispatch, getState) => {
      const { allGamesCopy } = getState();
  
      // Filtra los juegos que tienen el género proporcionado
      const filteredGames = allGamesCopy.filter((game) =>
        Array.isArray(game.genres) && game.genres.includes(genre)
      );
  
      dispatch({ type: FILTER_BY_GENRES, payload: filteredGames });
    };
  };
  
  