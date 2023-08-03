const initialState = ''

const reducer = (state = initialState, action) => {

  switch(action.type) {
    case 'SET-FILTER':
      return action.payload.text

    default:
      return state
  }
}

export const setFilter = text => {
  return {
    type: 'SET-FILTER',
    payload: { text }
  }
}

export default reducer