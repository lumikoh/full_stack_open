const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogList) => {
  return blogList.reduce( (sum, item) => {
    return sum + item.likes
  }, 0)
}

module.exports = {
  dummy, totalLikes
}
