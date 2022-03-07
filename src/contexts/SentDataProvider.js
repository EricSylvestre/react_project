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

    const addSent = async (formData) => 
    {
        let collectionRef = await collection(db, `users/${ currentUser.id }/SentMessages`)

        const docRef = await addDoc( collectionRef, formData )

        const newDoc = await getDoc(docRef)

        const userRef = await getDoc( docRef.parent.parent )

        setSentMessages([
            {
                id: newDoc.id,
                ...newDoc.data(),
                user: {
                    id: currentUser.id,
                    ...userRef.data()
                }
            }
        ])
    }






    useEffect(() => {
        getSentMessages()
    }, [getSentMessages])



    // useEffect(() => {
    //     console.log(firebaseApp)
    // }, [])

    const sentValues = {
        SentMessages, setSentMessages, addSent
    }



    return (
        <SentDataContext.Provider value={sentValues} >
            {props.children}
        </SentDataContext.Provider>
    )
}