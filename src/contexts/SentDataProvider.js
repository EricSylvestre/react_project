import { getDocs, getDoc, getFirestore, query, collectionGroup, collection, addDoc } from "firebase/firestore";
import { createContext, useCallback, useEffect, useState } from "react";


export const SentDataContext = createContext()

export const SentDataProvider = (props) => {

    const [SentMessages, setSentMessages, currentUser] = useState([])

    const db = getFirestore()

    // loop over posts collection and setPosts
    const getSentMessages = useCallback(
        async () => {
            const s = query(collectionGroup(db, 'SentMessages'))

            const querySnapshot = await getDocs(s)

            let newSentMessages = [];
            querySnapshot.forEach(async doc => {
                const userRef = await getDoc(doc.ref.parent.parent);
                console.log(userRef.data())

                newSentMessages.push({
                    id: doc.id,
                    ...doc.data(),
                    user: {
                        id: userRef.id,
                        ...userRef.data()
                    }
                })
                setSentMessages(newSentMessages)
            })

            return querySnapshot;
        },
        [db],
    )

    






    useEffect(() => {
        getSentMessages()
    }, [getSentMessages])



    // useEffect(() => {
    //     console.log(firebaseApp)
    // }, [])

    const sentValues = {
        SentMessages, setSentMessages
    }



    return (
        <SentDataContext.Provider value={sentValues} >
            {props.children}
        </SentDataContext.Provider>
    )
}