

const sortBlogs = blogs => {
  return blogs.sort((a, b) => {
    return b.likes - a.likes
  })
}

export default { sortBlogs }