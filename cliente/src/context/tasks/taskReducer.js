import{
  PROJECT_TASKS,
  ADD_TASK,
  TASK_VALIDATION,
  DELETE_TASK,
  TASK_STATE,
  CURRENT_TASK,
  UPDATE_TASK,
  CLEAN_TASK
} from '../../types';


export default (state, action) => {
  switch (action.type) {
    case PROJECT_TASKS:
      return {
        ...state,
        projecttasks: action.payload
      }
    case ADD_TASK:
      return {
        ...state,
        projecttasks: [action.payload, ...state.projecttasks],
        taskerror: false,
      }
    case TASK_VALIDATION:
      return {
        ...state,
        taskerror: true
      }
    case DELETE_TASK:
      return {
        ...state,
        projecttasks:state.projecttasks.filter(task => task._id !== action.payload)
      }
    case UPDATE_TASK:
        return {
          ...state,
          projecttasks: state.projecttasks.map( task => task._id === action.payload._id ? action.payload : task)
        }
    case CURRENT_TASK:
      return {
        ...state,
        taskselected: action.payload
      }
    case CLEAN_TASK:
        return{
          ...state,
          taskselected: null
        }

    default:
      return state;
  }
}
