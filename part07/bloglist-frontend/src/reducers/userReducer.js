import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'
import blogService from '../services/blogs'
const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

      blogService.setToken(user.token)

      dispatch(setUser(user))
    } catch (error) {
      dispatch(
        setNotification(
          {
            message: 'wrong username or password',
            type: 'danger',
          },
          5
        )
      )
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    blogService.setToken(null)
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedBlogUser')
  }
}

export const initialUser = () => {
  return async (dispatch) => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export default userSlice.reducer
