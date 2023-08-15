import { useEffect, useState } from 'react'
import userService from '../services/users'
import User from './User'

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then((data) => {
      setUsers(data)
    })
  }, [])

  return (
    <>
      <h2>Users</h2>
      <table>
        <th></th>
        <th>blogs created</th>
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </table>
    </>
  )
}

export default UserList
