import React, {useContext, useEffect, useState} from 'react'
import { MessageList } from '../components/MessageList'
import { DataContext} from '../contexts/DataProvider'
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore'
import { useAuth } from '../contexts/AuthProvider'
import { Link } from 'react-router-dom'
import { query} from 'firebase/firestore'
import { getDatabase, ref,  equalTo } from "firebase/database";





export const Inbox = () => 
{
  const db = getFirestore()
  const { currentUser } = useAuth()
  const { messages, addSentMessage } = useContext(DataContext)
  // const { setSentMessage, addSent, addSentMessages, SentMessages } = useContext(SentDataContext)
  const [filteredMessages, setFilteredMessages] = useState([])

  

  // const handleSubmit = async (e) => {
  //   // e.preventDefault()
  //   // setSentMessages(e.target.value);
  //   // addSent(e.target.value);
  //   console.log('yello')
    

  //   let formData = {
  //     body: e.target.status.value,
  //     dateCreated: serverTimestamp(),
  //   }

  //   addSentMessage(formData)

  //   e.target.status.value = ''
  // }

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
  
    let formData = {
      body: e.target.status.value,
      dateCreated: serverTimestamp(),
    }

    // console.log(formData)

    addSentMessage(formData)

    e.target.status.value= ''
    

  }

  const handleFilter = async (f) => {
    const db = getDatabase();
    query(ref(db, 'messages'), equalTo(f.target.value));
  }






  useEffect(() => {
    let filteredMessages = messages.filter( m => m.user.id === currentUser.id)
    setFilteredMessages(filteredMessages)
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
            <input 
                  type="submit" value="Send It" className='btn btn-info btn-block'/>
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

    <hr />

      {
        currentUser.loggedIn
          ?
    
    <form action="" className='filter' onSubmit={handleFilter}>
          <div className="row"/>
            <div className="col-10">
              <div className="form-group">
                <input type="text" className="form-control" name='status' placeholder='Filter Messages' />
              </div>
            </div>
            <div className="col-2">
              <input
                type="submit" value="Filter" className='btnfilter btn-info btn-block' />
            </div>
    </form>
      : null
    }


      </React.Fragment>
       
  )
}
