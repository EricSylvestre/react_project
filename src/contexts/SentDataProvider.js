import { getDocs, getDoc, getFirestore, query, collectionGroup } from "firebase/firestore";
import { createContext, useCallback, useEffect, useState } from "react";


export const DataContextSent = createContext()

export const SentDataProvider = (props) => {

    const [SentMessages, setSent] = useState([])

    const db = getFirestore()

    // loop over posts collection and setPosts
    const getSentMessages = useCallback(
        async () => {
            const q = query(collectionGroup(db, 'SentMessages'))

            const querySnapshot = await getDocs(q)

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
                setSent(newSentMessages)
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

    const values = {
        SentMessages, setSent
    }



    return (
        <DataContext.Provider value={values} >
            {props.children}
        </DataContext.Provider>
    )
}