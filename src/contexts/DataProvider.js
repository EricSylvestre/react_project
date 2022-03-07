
import { getDocs, getDoc, getFirestore, query, collectionGroup, collection, addDoc, orderBy, doc, updateDoc, setDoc } from "firebase/firestore";
import { createContext, useCallback, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";


export const DataContext = createContext()

export const DataProvider = (props) => 
{

    const [messages, setMessages, setSentMessages, SentMessages] = useState([])
    const { currentUser} = useAuth()
    const db = getFirestore()

    // loop over posts collection and setPosts
    const getMessages = useCallback(
        async () => {
            const q = query(
            collectionGroup(db, 'messages'),
             
            )
            const querySnapshot = await getDocs(q)

            let newMessages = [];
            querySnapshot.forEach(async doc => {
                const userRef = await getDoc(doc.ref.parent.parent);
                

                newMessages.push({
                    id: doc.id,
                    ...doc.data(),
                    user: {
                    id: userRef.id,
                     ...userRef.data() }
                })
                setMessages(messages.concat(newMessages))
            })

            return querySnapshot;
        },
        [db],
    )

    const addSentMessage = async (formData) => {
        let collectionRef = await collection(db, `users/${currentUser.id}/SentMessages`)

        // once we try to add the new document to firebase, we can grab all of its information here
        // await addDoc(collectionRef, formData)
        const docRef = await addDoc(collectionRef, formData)

        // after we created a new document inside Firebase, we can then grab it using getDoc
        const newDoc = await getDoc(docRef)

        // get access to the deeply nested document's current user and grab their data so we can use it to pass into our new posts list
        const userRef = await getDoc(docRef.parent.parent)

        setSentMessages([
            {
                id: newDoc.id,
                ...newDoc.data(),
                user: {
                    id: currentUser.id,
                    ...userRef.data()
                }

            },
            ...SentMessages
        ])
    }




    useEffect(() => {
        getMessages()
    }, [getMessages])

    

    // useEffect(() => {
    //     console.log(firebaseApp)
    // }, [])

    const values = {
        messages, setSentMessages, currentUser, addSentMessage
    }
      


    return (
        <DataContext.Provider value={values} >
            {props.children}
        </DataContext.Provider>
    )
}