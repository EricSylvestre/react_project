import React, { useContext } from 'react'
import { Message } from './Message'
import { DataContext } from '../contexts/DataProvider'
import { SentMessage } from './SentMessage.js'

export const MessageList = (props) => {
    const { SentMessages } = useContext(DataContext)

    return (
        <React.Fragment>
            {SentMessages.map(p => <SentMessage SentMessage={p} key={p.id} />)}
        </React.Fragment>
    )
}
