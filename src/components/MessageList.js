import React, {useContext} from 'react'
import { Message } from './Message'
import { DataContext } from '../contexts/DataProvider'
import { SentMessage } from './SentMessage'
import { SentDataContext } from '../contexts/SentDataProvider'

export const MessageList = (props) =>
{
    const {messages} = useContext(DataContext)
    const { SentMessages } = useContext(SentDataContext)

    return (
        <React.Fragment>
            { messages.map(p => <Message message={p} key={p.id} />)}
            { SentMessages.map(p => <SentMessage SentMessage={p} key={p.id} />)}
        </React.Fragment>
    )
}

export const SentMessageList = (props) => {
    const { SentMessages } = useContext(SentDataContext)

    return (
        <React.Fragment>
            {SentMessages.map(p => <SentMessage SentMessage={p} key={p.id} />)}
        </React.Fragment>
    )
}



   

    



