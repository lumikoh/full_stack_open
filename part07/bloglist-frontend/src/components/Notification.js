import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  return (
    <>
      {notification !== null && (
        <Alert variant={notification.type}>{notification.message}</Alert>
      )}
    </>
  )
}

export default Notification
