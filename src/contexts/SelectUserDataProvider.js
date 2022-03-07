import { getDocs, getDoc, getFirestore, query, collectionGroup } from "firebase/firestore";
import { createContext, useCallback, useEffect, useState } from "react";


export const DataContextUser = createContext()

export const SelectUserDataProvider = (props) => {

    const [messages, setUser, currentUser, user] = useState([])

    const db = getFirestore()

    // loop over posts collection and setPosts
    const getUser = useCallback(
        async () => {
            const q = query(collectionGroup(db, 'users'))

            const querySnapshot = await getDocs(q)

            let newUser = [];
            querySnapshot.forEach(async doc => {
                const userRef = await getDoc(doc.ref.parent.parent);
                console.log(userRef.data())

                newUser.push({
                    id: doc.id,
                    ...doc.data(),
                    user: {
                        id: userRef.id,
                        ...userRef.data()
                    }
                })
                setUser(newUser)
            })

            return querySnapshot;
        },
        [db],
    )




    useEffect(() => {
        getUser()
    }, [getUser])



    // useEffect(() => {
    //     console.log(firebaseApp)
    // }, [])

    const values = {
         currentUser, user, setUser
    }



    return (
        <DataContextUser.Provider value={values} >
            {props.children}
        </DataContextUser.Provider>
    )
}