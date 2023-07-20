const lodash = require('lodash')

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

const mostBlogs = (blogList) => {
  const counts = lodash.countBy(blogList, 'author')
  return Object.keys(counts).reduce( (most, key) => {
    if(Object.keys(most) === 0) return { author: key, blogs: counts[key] }
    return most.blogs > counts[key] ? most : { author: key, blogs: counts[key]}
  }, {})
}

module.exports = {
  dummy, totalLikes, favouriteBlog, mostBlogs
}
