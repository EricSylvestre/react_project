// import React from 'react'
import React from 'react'

import { Route, Routes, Link } from 'react-router-dom'
import { useAuth } from './contexts/AuthProvider'
import { Inbox } from './views/Inbox'
import { Sent } from './views/Sent'
import { Trash } from './views/Trash'
import { MessageSingle } from './views/MessageSingle'
import { SentMessageSingle } from './views/SentMessageSingle'
import './index.css'


export const App = () => {


    const { signIn, currentUser, logOut } = useAuth()

    return (    
        <React.Fragment>
            <header>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                    <Link className="navbar-brand" to="/">Messaging App</Link>
                    <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Inbox <span class="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/sent">Sent</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/trash">Trash</Link>
                            </li>

                        </ul>
                        <div className='login'>
                        <ul className='navbar-nav ml-auto'>

                            {
                                !currentUser.loggedIn
                                
                                    ?
                                    
                                    <li className="nav-item float-right">
                                        <Link onClick={() => signIn()} to=".">Login</Link>
                                    </li>
                                    :
                                    <li className="nav-item">
                                        <Link onClick={() => logOut()} to=".">Logout</Link>
                                    </li>
                            }
                          
                        
                        
                        </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <main className='container'>
                <Routes>
                    <Route exact path='/' element={<Inbox />} />
                    <Route exact path='/sent' element={<Sent />} />
                    <Route exact path='/trash' element={<Trash />} />
                    <Route exact path='/message/:id' element={<MessageSingle />} />
                    <Route exact path='/SentMessage/:id' element={<SentMessageSingle />} />
                </Routes >
                
            </main>

            <footer>

            </footer>
        </React.Fragment>
    )
}











