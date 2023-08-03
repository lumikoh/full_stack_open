import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setText(state, action) {
      return action.payload
    },
    removeText(state, action) {
      return null
    }
  }
})

export const { setText, removeText } = notificationSlice.actions

export const setNotification = (text, timeout) => {
  return dispatch => {
    dispatch(setText(text))
    setTimeout( () => {
      dispatch(removeText())
    }, timeout*1000)
  }
}

export default notificationSlice.reducer