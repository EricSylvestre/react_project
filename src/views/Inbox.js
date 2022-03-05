import React, {Profiler, useContext} from 'react'
import { MessageList } from '../components/MessageList'
import { DataContext } from '../contexts/DataProvider'
import { addDoc, collection, doc, getFirestore, serverTimestamp } from 'firebase/firestore'
import { useAuth } from '../contexts/AuthProvider'
import { Link } from 'react-router-dom'


export const Inbox = () => 
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
      <label className="select" for="contacts">Select A Recipient:</label>
          : null
      }
      {
        currentUser.loggedIn
          ? 

      <select className="contacts" id="contacts">
        <option value="">User1</option>
                        
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
            <input type="submit" value="Send It" className='btn btn-info btn-block' />
          </div>
        </div>
      </form>
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
