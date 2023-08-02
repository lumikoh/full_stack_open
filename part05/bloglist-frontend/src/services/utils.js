

const sortBlogs = blogs => {
  return blogs.sort((a, b) => {
    return b.likes - a.likes
  })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { sortBlogs }