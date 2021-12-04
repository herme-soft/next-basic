import React, { useState, useEffect } from "react"
import { Layout } from "../components/layout"
import Link from "next/link"
import { useRouter } from "next/router"
import axios from "axios"
import useSWR from "swr"
import Head from "next/head"


const Profile = () => {

    const fetcher = url => axios.get(url).then(res => res.data); 

    // Rendu côté client: Les données sont disponibles seulement au chargement complet de Javascript
    const {data, error} = useSWR("https://jsonplaceholder.typicode.com/users", fetcher)

    if(!data) { return <h1>Chargement ...</h1> }

    if(error) { return <h1>Une erreur est survenue !</h1> }
    
    const styles = {
        padding: 10,
        margin: 10,
        borderBottom: "1px solid #DDD"
    }


    return (
        <>
            <Head>
                <title>Liste des utilisateurs</title>
            </Head>

            <Layout>
                {data && data.map(user => (
                    <div style={styles} key={user.id}>
                        <h1>{user.name}</h1>
                        <div>Email: {user.email}</div>
                        <div>Phone: {user.phone}</div>
                    </div>
                ))}
            </Layout>
        </>
    )
}

export default Profile;





/** PREMIÈRE VERSION ------------------------------------------------------------- */


// import React, { useState, useEffect } from "react"
// import { Layout } from "../components/layout"
// import Link from "next/link"
// import { useRouter } from "next/router"
// import axios from "axios"

// /** ROUTE DYNAMIQUE AVEC PARAMÈTRES DE REQUÊTES */

// const Profile = () => {

//     const [data, setData] = useState("");
//     const url = "https://jsonplaceholder.typicode.com/users";

//     useEffect(() => {
//         axios.get(url).then(response => {
//             setData(response.data);
//         })
//         .catch(error => {
//             console.log(error, "Ceci est une erreur");
//         })
//     }, [])


//     const styles = {
//         padding: 10,
//         margin: 10,
//         borderBottom: "1px solid #DDD"
//     }

//     return (
//         <Layout>
//            {/* {JSON.stringify(data)} */}

//            {data && data.map(user => (
//                <div style={styles} key={user.id}>
//                    <h1>{user.name}</h1>
//                    <div>Email: {user.email}</div>
//                    <div>Phone: {user.phone}</div>
//                </div>
//            ))}
//         </Layout>
//     )
// }

// export default Profile;