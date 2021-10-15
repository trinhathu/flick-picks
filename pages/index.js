import React, { useState, useEffect } from 'react'
import fetch from 'node-fetch'
import Head from 'next/head'
import FlicksList from '../components/FlicksList'
import SearchForm from '../components/SearchForm'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [flicks, updateFlicks] = useState([])

  useEffect(async () => {
    const response = await fetch('/api/flicks')
    const body = await response.json()
    updateFlicks(body)
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Flick Picks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Flick Picks
        </h1>

        <SearchForm flicks={flicks} updateFlicks={updateFlicks} />

        <FlicksList flicks={flicks} updateFlicks={updateFlicks} />
      </main>
    </div>
  )
}
