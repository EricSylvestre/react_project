import React, {Profiler, useContext, useEffect, useState} from 'react'
import { MessageList } from '../components/MessageList'
import { DataContext, DataProvider } from '../contexts/DataProvider'
import { addDoc, collection, doc, getFirestore, serverTimestamp } from 'firebase/firestore'
import { useAuth } from '../contexts/AuthProvider'
import { Link } from 'react-router-dom'
import { query, collectionGroup } from 'firebase/firestore'
import { SelectUserDataProvider } from '../contexts/SelectUserDataProvider'
import { getAdditionalUserInfo } from 'firebase/auth'
import { SentDataContext } from '../contexts/SentDataProvider'




export const Inbox = () => 
{
  const db = getFirestore()
  const { currentUser } = useAuth()
  const { users } = query(collectionGroup(db, 'users'))
  const { messages, setMessages, addMessage } = useContext(DataContext)
  const { setSentMessages, addSent, addSentMessage } = useContext(SentDataContext)
  const [filteredMessages, setFilteredMessages] = useState([])

  

  const handleSubmit = async (e) => {
    // e.preventDefault()
    setSentMessages(e.target.value);
    addSent(e.target.value);
    

    let formData = {
      body: e.target.status.value,
      dateCreated: serverTimestamp(),
    }

    addSentMessage(formData)

    e.target.status.value = ''
  }

  useEffect(() => {
    let filteredMessages = messages.filter( m => m.user.id === currentUser.id)
    setFilteredMessages(filteredMessages)
    console.log(filteredMessages)
  }, [ currentUser.id, messages ])


  return (
      <React.Fragment>

      {
        currentUser.loggedIn
          ? 
      <label className="select" for="contacts">Select A Recipient:</label>
          : null
      }
      {
        currentUser.loggedIn
          ? 

      <select className="contacts" id="contacts">
        <option value="">{[users]}</option>
                        
        <option value="">User2</option>
      </select>
          : null
      }

      


      
      {
        currentUser.loggedIn
          ?
        
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
          <div className="col-10">
            <div className="form-group">
              <input type="text" className="form-control" name='status' placeholder='Send Message Here' />
            </div>
          </div>
          <div className="col-2">
            <input 
                  type="submit" value="Send It" className='btn btn-info btn-block' onSubmit={(e) => handleSubmit(e)}/>
          </div>
        </div>
      </form>
          : null
      }

      <hr />
    {
        currentUser.loggedIn
          ?
      
      <div className="row" >
        <div className="col-12">
          <ul className="list-group">
            <MessageList messages={filteredMessages} />
          </ul>
        </div>
      </div>
        : null
    } 
      </React.Fragment>
       
  )
}
