import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import styles from '@/styles/Home.module.css'

import { FiUpload } from 'react-icons/fi'

export default function Home({ ip }) {
  const [uploadText, setUploadText] = useState("Upload File(s)")
  const fileHandler = (e) => {
    setUploadText(e.target.files[0].name)
  }
  return (
    <>
      <Head>
        <title>饺子馆 | {ip}</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.landing}>
          <div className={styles.container}>
            <div className={styles.title}>
              <div className={styles.text}>
                <span className={styles.pinyin}>jiǎo•​zi​•guǎn</span>
                <span className={styles.mando}>饺子馆</span>
              </div>
              <Image
                alt='bun'
                src={'/bun.png'}
                width={120}
                height={110}
              />
            </div>
            <div className={styles.input}>
              <input id="input" type="file" onChange={fileHandler} />
              <label htmlFor="input">
                <span><FiUpload /> {uploadText}</span>
              </label>
              {/* <span>{ip}</span> */}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}


export async function getServerSideProps({ req }) {
  const ip = req.headers['x-forwarded-for'] || "192.168.0.0"
  console.log(ip)
  return { props: { ip } }
}