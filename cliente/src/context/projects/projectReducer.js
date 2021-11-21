import {
  FORM_PROJECT,
  GET_PROJECTS,
  ADD_PROJECTS,
  ERROR_PROJECT,
  FORM_VALIDATION,
  CURRENT_PROJECT,
  DELETE_PROJECT
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case FORM_PROJECT:
      return {
        ...state,
        form: true
      }
      case GET_PROJECTS:
        return {
          ...state,
          projects: action.payload
        }
        case ADD_PROJECTS:
          return {
            ...state,
            projects: [...state.projects ,action.payload],
            form: false,
            formerror: false
          }
          case FORM_VALIDATION:
            return {
              ...state,
              formerror: true
            }
          case CURRENT_PROJECT:
            return {
              ...state,
              project: state.projects.filter(project => project._id === action.payload)
            }
          case DELETE_PROJECT:
            return {
              ...state,
              projects: state.projects.filter(project => project._id !== action.payload),
              project: null
            }
          case ERROR_PROJECT:
              return{
                ...state,
                msg: action.payload
              }
    default:
      return state;
  }
}
