import { createContext, useReducer, useContext } from 'react'

const messageReducer = (state, action) => {
  switch (action.type) {
    case 'DISPLAY':
      return action.payload
    case 'REMOVE':
      return null
    default:
      return state
  }
}

const MessageContext = createContext()

export const MessageContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(messageReducer, null)

  return (
    <MessageContext.Provider value={[message, messageDispatch]}>
      {props.children}
    </MessageContext.Provider>
  )
}

export const useMessageString = () => {
  const messageAndDispatch = useContext(MessageContext)
  return messageAndDispatch[0]
}

export const useMessageDispatch = () => {
  const messageAndDispatch = useContext(MessageContext)
  return messageAndDispatch[1]
}

export default MessageContext
