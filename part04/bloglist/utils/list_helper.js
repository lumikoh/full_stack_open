const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogList) => {
  return blogList.reduce( (sum, item) => {
    return sum + item.likes
  }, 0)
}

const favouriteBlog = (blogList) => {
  return blogList.reduce((max, item) => {
    return Object.keys(max).length === 0 ? item :  max.likes > item.likes ? max : item
  },{})
}

module.exports = {
  dummy, totalLikes, favouriteBlog
}
