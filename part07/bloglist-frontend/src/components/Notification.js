const Notification = ({ message, type }) => {
  if (!message) return <></>

  return <p className={type}>{message}</p>
}

export default Notification
