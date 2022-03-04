import React, {useContext} from 'react'
import { Message } from './Message'
import { DataContext } from '../contexts/DataProvider'

export const MessageList = (props) =>
{
    const {messages} = useContext(DataContext)

    return (
        <React.Fragment>
            { messages.map(p => <Message message={p} key={p.id} />)}
        </React.Fragment>
    )
}
