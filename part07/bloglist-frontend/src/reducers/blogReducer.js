import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setBlogs, addBlog } = blogSlice.actions

export const initialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const newBlog = (newBlog, user) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.create(newBlog)
      blog.user = user
      dispatch(addBlog(blog))
      dispatch(
        setNotification(
          {
            message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
            type: 'notice',
          },
          5
        )
      )
    } catch (error) {
      dispatch(setNotification({ message: error.message, type: 'error' }, 5))
    }
  }
}

export default blogSlice.reducer
