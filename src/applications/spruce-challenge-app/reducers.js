const initialState = {
  data: 'Initial Data',
};

const spruceReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return {
        ...state,
        data: action.payload,
      };
    case 'ADD_DATA':
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case 'REMOVE_DATA':
      return {
        ...state,
        data: state.data.filter(item => item !== action.payload),
      };
    case 'CLEAR_DATA':
      return {
        ...state,
        data: [],
      };
    default:
      return state;
  }
};

export default {
  spruceData: spruceReducer,
};
