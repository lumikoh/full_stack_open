import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setValue(state, action) {
      return action.payload
    },
    removeValue() {
      return null
    },
  },
})

export const { setValue, removeValue } = notificationSlice.actions

export const setNotification = (value, timeout) => {
  return (dispatch) => {
    dispatch(setValue(value))
    setTimeout(() => {
      dispatch(removeValue())
    }, timeout * 1000)
  }
}

export default notificationSlice.reducer
