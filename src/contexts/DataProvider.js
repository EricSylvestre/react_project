import { getDocs, getDoc, getFirestore, query, collectionGroup } from "firebase/firestore";
import { createContext, useCallback, useEffect, useState } from "react";


export const DataContext = createContext()

export const DataProvider = (props) => {

    const [messages, setMessages, currentUser] = useState([])

    const db = getFirestore()

    // loop over posts collection and setPosts
    const getMessages = useCallback(
        async () => {
            const q = query(collectionGroup(db, 'messages'))

            const querySnapshot = await getDocs(q)

            let newMessages = [];
            querySnapshot.forEach(async doc => {
                const userRef = await getDoc(doc.ref.parent.parent);
                

                newMessages.push({
                    id: doc.id,
                    ...doc.data(),
                    user: {
                    id:userRef.id,
                     ...userRef.data() }
                })
                setMessages(newMessages)
            })

            return querySnapshot;
        },
        [db],
    )




    useEffect(() => {
        getMessages()
    }, [getMessages])

    

    // useEffect(() => {
    //     console.log(firebaseApp)
    // }, [])

    const values = {
        messages, setMessages, currentUser
    }
      


    return (
        <DataContext.Provider value={values} >
            {props.children}
        </DataContext.Provider>
    )
}