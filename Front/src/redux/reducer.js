import { FILTER_BY_GENRES, GET_BY_NAME, GET_GAMES, GET_GENRES, ORDER} from "./actions-types"

const initialState = {
    allGames: [],
    allGamesCopy: [],
    allGenres: [],
    currentPage: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GAMES:
            return {
                ...state,
                allGames: action.payload,
                allGamesCopy: action.payload
            };

        case GET_BY_NAME:
            return {
                ...state,
                allGames: [...action.payload].splice(0, 15)
            };
        case ORDER:
            return {
                ...state,
                allGames: action.payload
            }
        case GET_GENRES:
            return {
                ...state,
                allGenres: action.payload
            }

        case FILTER_BY_GENRES:
            return {
                ...state,
                allGames: action.payload

            }

        default:
            return {
                ...state
            }
    }
}

export default reducer