import React, { Profiler, useContext } from 'react'
import { DataContext } from '../contexts/DataProvider'
import { addDoc, collection, doc, getFirestore, serverTimestamp } from 'firebase/firestore'
import { useAuth } from '../contexts/AuthProvider'
import { Link } from 'react-router-dom'
import { SentDataContext} from '../contexts/SentDataProvider'
import { SentMessageList } from '../components/MessageList'



export const Sent = () => 
{
  const { currentUser } = useAuth()
  const { SentMessages, setMessage, addSentMessage } = useContext(SentDataContext)
  const db = getFirestore()

  const handleSubmit = async (e) => {
    e.preventDefault()

    let formData = {
      body: e.target.status.value,
      dateCreated: serverTimestamp(),
    }

    addSentMessage(formData)

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
                <SentMessageList SentMessages={SentMessages} />
              </ul>
            </div>
          </div>
          : null
      }
    </React.Fragment>

  )
}

