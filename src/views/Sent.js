import React, { Profiler, useContext } from 'react'
import { MessageList } from '../components/MessageList'
import { DataContext } from '../contexts/DataProvider'
import { addDoc, collection, doc, getFirestore, serverTimestamp } from 'firebase/firestore'
import { useAuth } from '../contexts/AuthProvider'
import { Link } from 'react-router-dom'


export const Sent = () => 
{
  const { currentUser } = useAuth()
  const { messages, setMessages, addMessage } = useContext(DataContext)
  const db = getFirestore()

  const handleSubmit = async (e) => {
    e.preventDefault()

    let formData = {
      body: e.target.status.value,
      dateCreated: serverTimestamp(),
    }

    addMessage(formData)

    e.target.status.value = ''
  }


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
                <MessageList messages={messages} />
              </ul>
            </div>
          </div>
          : null
      }
    </React.Fragment>

  )
}

