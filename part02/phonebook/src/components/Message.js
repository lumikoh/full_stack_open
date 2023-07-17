const Message = ({message}) => {
    if(message === null) {
        return null
    }
    return (
        <div className={message.type}>
            {message.content}
        </div>
    )
}

export default Message