import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import { sortBlogs } from '../services/utils'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return sortBlogs(action.payload)
    },
    addBlog(state, action) {
      state.push(action.payload)
      return sortBlogs(state)
    },
    updateBlog(state, action) {
      return sortBlogs(
        state.map((b) => (b.id !== action.payload.id ? b : action.payload))
      )
    },
    removeBlog(state, action) {
      return state.filter((b) => b.id !== action.payload)
    },
  },
})

export const { setBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions

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

export const increaseLikes = (blog) => {
  return async (dispatch) => {
    try {
      const changedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
      const returnedBlog = await blogService.update(changedBlog.id, changedBlog)
      dispatch(updateBlog(returnedBlog))
    } catch (error) {
      dispatch(removeBlog(blog.id))
      dispatch(setNotification({ message: error.message, type: 'error' }, 5))
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.removeOne(blog.id)
        dispatch(removeBlog(blog.id))
        dispatch(
          setNotification(
            {
              message: `Blog ${blog.title} by ${blog.author} removed`,
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
}

export default blogSlice.reducer
