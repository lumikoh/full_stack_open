const lodash = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogList) => {
  return blogList.reduce((sum, item) => {
    return sum + item.likes
  }, 0)
}

const favouriteBlog = (blogList) => {
  return blogList.reduce((max, item) => {
    return Object.keys(max).length === 0
      ? item
      : max.likes > item.likes
        ? max
        : item
  }, {})
}

const mostBlogs = (blogList) => {
  const counts = lodash.countBy(blogList, 'author')
  return Object.keys(counts).reduce((most, key) => {
    if (Object.keys(most) === 0) return { author: key, blogs: counts[key] }
    return most.blogs > counts[key] ? most : { author: key, blogs: counts[key] }
  }, {})
}

const mostLikes = (blogList) => {
  const grouped = blogList.reduce((temp, item) => {
    if (!temp[item.author]) temp[item.author] = 0
    temp[item.author] += item.likes
    return temp
  }, {})
  return Object.keys(grouped).reduce((most, key) => {
    if (Object.keys(most).length === 0)
      return { author: key, likes: grouped[key] }
    return most.likes > grouped[key]
      ? most
      : { author: key, likes: grouped[key] }
  }, {})
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}
