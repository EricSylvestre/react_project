import React, {Profiler, useContext} from 'react'
import { MessageList } from '../components/MessageList'
import { DataContext, DataProvider } from '../contexts/DataProvider'
import { addDoc, collection, doc, getFirestore, serverTimestamp } from 'firebase/firestore'
import { useAuth } from '../contexts/AuthProvider'
import { Link } from 'react-router-dom'
import { query, collectionGroup } from 'firebase/firestore'
import { SelectUserDataProvider } from '../contexts/SelectUserDataProvider'
import { getAdditionalUserInfo } from 'firebase/auth'



export const Inbox = () => 
{
  const db = getFirestore()
  const { currentUser } = useAuth()
  const { users } = query(collectionGroup(db, 'users'))
  const { messages, setMessages, setSentMessages, addMessage } = useContext(DataContext)
  

  const handleSubmit = async (e) => {
    // e.preventDefault()
    e.console.log('this works');
    setMessages(e.target.value);
    

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
            <MessageList messages={messages} />
          </ul>
        </div>
      </div>
        : null
    } 
      </React.Fragment>
       
  )
}
