
import React, { Profiler, useContext, useEffect, useState } from 'react'
import { DataContext } from '../contexts/DataProvider'
import { addDoc, collection, doc, getFirestore, serverTimestamp } from 'firebase/firestore'
import { useAuth } from '../contexts/AuthProvider'
import { Link } from 'react-router-dom'
import { SentDataContext} from '../contexts/SentDataProvider'
import { SentMessageList } from '../components/MessageList'






export const Sent = () => 
{
  const { currentUser } = useAuth()
  const { SentMessages, setMessage, addSentMessages } = useContext(SentDataContext)
  const db = getFirestore()
  const [filteredSentMessages, setFilteredSentMessages] = useState([])



  useEffect(() => {
    let filteredSentMessages = SentMessages.filter(m => m.user.id === currentUser.id)
    setFilteredSentMessages(filteredSentMessages)
  }, [currentUser.id, SentMessages])

  


  return (
    <React.Fragment>
      {
        currentUser.loggedIn
          ?
          <h1>Sent Messages</h1>
          : null
      }
      <hr />
      {
        currentUser.loggedIn
          ?

          <div className="row">
            <div className="col-12">
              <ul className="list-group">
                <SentMessageList SentMessages={filteredSentMessages} />
              </ul>
            </div>
          </div>
          : null
      }
    </React.Fragment>

  )
}

