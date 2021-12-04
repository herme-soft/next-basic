import React from 'react'
import { Layout } from "../components/layout"
import axios from "axios"
import Head from "next/head"

const Departements = ({ data }) => {

    const styles = {
        padding: 10,
        margin: 10,
        borderBottom: "1px solid #DDD"
    }

    return (
        <>
            <Head>
                <title>Liste des départements</title>
            </Head>

            <Layout>
                {data.map(departement => (
                    <div style={styles} key={departement.code}>
                        <h1>{departement.nom}</h1>
                        <div>Code de département: {departement.code}</div>
                        <div>Code de la région: {departement.codeRegion}</div>
                    </div>
                ))}
            </Layout>
        </>
    )
}

export const getStaticProps = async() => {
    const url = "https://geo.api.gouv.fr/departements";
    const {data} = await axios.get(url);

    return {
        props: {
            data
        }
    }
}

// Departements.getInitialProps = async(context) => { //  Rendu côté serveur: Javascript se charge directement côté serveur (donc les données s'affiche tout de suite)
//     const url = "https://geo.api.gouv.fr/departements";
//     const {data} = await axios.get(url);

//     return {
//         data
//     }
// }

export default Departements
