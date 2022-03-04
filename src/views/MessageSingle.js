import { collectionGroup, doc, getDoc, getDocs, getFirestore, query } from 'firebase/firestore'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useMatch } from 'react-router-dom'

export const MessageSingle = () => 
{
    const [p, setP] = useState({})
    const match = useMatch("/message/:id")
    const paramId = match.params.id

    const [loadingState, setLoadingState] = useState(false)

    const db = getFirestore()

    const getMessage = useCallback(
        async () => {
            const q = query(collectionGroup(db, 'messages'))

            const querySnapshot = await getDocs(q)

            
            querySnapshot.forEach(async doc => {
                // get the current user's posts
                const userRef = await getDoc(doc.ref.parent.parent);
                // console.log(userRef.data())

                // if the document is found set the post data
                if (doc.id === paramId) {
                    setP({
                        id: doc.id,
                        ...doc.data(),
                        user: { ...userRef.data() }
                    })

                    setLoadingState(true)
                }
            })
        },
        [paramId],
    )

    useEffect(() => {
        getMessage();
    }, [getMessage])

    // no longer pulling posts from our api
    // useEffect(() => {
    //     axios.get(`https://fakebook-january-derek.herokuapp.com/api/v1/blog/${ paramId }`).then(res => setP( res.data ))
    // }, [paramId])


  return (
        <React.Fragment>
            <Link to="/">&laquo; Go Back</Link>

            <hr />

            <div className="row">
                <div className="col-12">
                    {
                        !loadingState
                            ?
                            <h2>Loading message...</h2>
                            :
                            <ul className="list-group">
                                <li key={p.id} className="list-group-item">
                                    <div>
                                        {p.body}
                                        <span className="float-right">
                                            <small>
                                                {moment(p.dateCreated?.toDate()).fromNow()}
                                            </small>
                                        </span>
                                    </div>
                                    <div>
                                        <cite> &mdash; {`${p.user?.name}`}</cite>
                                    </div>
                                </li>
                            </ul>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}
