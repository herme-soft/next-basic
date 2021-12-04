import React, { useEffect } from "react"
import {Layout} from "../components/layout"
import Link from "next/link"
import axios from "axios"
import Head from "next/head"
// import Exemple from "../components/exemple"
import dynamic from "next/dynamic"

// Importer un composant de façon dynamique
// const Exemple = dynamic(() => import ("../components/exemple").then(mod => mod.Exemple), {ssr: false})

{/* CÔTÉ CLIENT */}

const Home = ({ data }) => {

  const styles = {
    padding: 10,
    margin: 10,
    borderBottom: "1px solid #DDD"
  }

  // console.log(process.env.API_ROOT) // Dans ce cas les variables sont disponibles côté serveur
  // console.log(process.env.NEXT_PUBLIC_API_ROOT) // En utilisant toujours NEXT_PUBLIC Les variables d'environnemets sont disponibles côté client

  // useEffect(() => {
  //   localStorage.setItem("jwt-token", "hf58665hdgd58fg");
  // }, [])

  return (
    <>
      <Head>
        <title>Liste des régions</title>
      </Head>

      <Layout>
        <div className="container-fluid">
            {/* <Exemple /> */}
            {data.map(region => (
                <div style={styles} key={region.code} >
                  <Link href="/region/[code]" as={`/region/${region.code}`} passHref>
                    <h1>{region.nom}</h1>
                  </Link>
                  <p>{region.code}</p>
                </div>
            ))}
        </div>
      </Layout>
    </>
  )
}

/** APPEL API CÔTÉ SERVEUR */

export const getServerSideProps = async(context) => { // Rendu côté client: Link ne fonctionne pas parce qu'il est disponible seulement au chargement complet de Javascript
  // const url = "https://geo.api.gouv.fr";
  const {data} = await axios.get(`${process.env.API_GEO}/regions`);

  // console.log(process.env.API_ROOT)

  return {
      props: {
        data
      }
  }
}

export default Home;