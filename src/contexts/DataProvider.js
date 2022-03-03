import { getDocs, getDoc, getFirestore, query, collectionGroup } from "firebase/firestore";
import { createContext, useCallback, useEffect, useState } from "react";

export const DataContext = createContext()

export const DataProvider = (props) => {

    const [posts, setPosts] = useState([])

    const db = getFirestore()

    // loop over posts collection and setPosts
    const getPosts = useCallback(
        async () => {
            const q = query(collectionGroup(db, 'posts'))

            const querySnapshot = await getDocs(q)

            let newPosts = [];
            querySnapshot.forEach(async doc => {
                const userRef = await getDoc(doc.ref.parent.parent);
                console.log(userRef.data())

                newPosts.push({
                    id: doc.id,
                    ...doc.data(),
                    user: { ...userRef.data() }
                })
                setPosts(newPosts)
            })

            return querySnapshot;
        },
        [db],
    )


    useEffect(() => {
        getPosts()
    }, [getPosts])

    // useEffect(() => {
    //     console.log(firebaseApp)
    // }, [])

    const values = {
        posts, setPosts
    }

    return (
        <DataContext.Provider value={values} >
            {props.children}
        </DataContext.Provider>
    )
}