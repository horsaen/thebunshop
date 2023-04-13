import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import axios from 'axios'
import styles from '@/styles/Home.module.css'

import { BiCopy } from 'react-icons/bi'
import { FiUpload } from 'react-icons/fi'

const api = process.env.NEXT_PUBLIC_APIBASE || ""

export default function Home({ ip }) {
  
  const [secret, setSecret] = useState('')

  useEffect(() => {
    if(window.localStorage.getItem('secret') == null) {
      let input = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      let output = ''
      for (let i = 0; i < 32; i++) {
        output += input.charAt(Math.floor(Math.random() * input.length));
      }
      window.localStorage.setItem('secret', output)
      setSecret(output)
    } else {
      setSecret(window.localStorage.getItem('secret') || "")
    }
  }, [])

  const [isUpload, setIsUpload] = useState(false)
  const [file, setFile] = useState('')
  const [uploadText, setUploadText] = useState("Upload File(s)")

  const [uploadRes, setUploadRes] = useState(null)

  const changeHandler = (e) => {
    setIsUpload(true)
    setFile(e.target.files[0])
    setUploadText(e.target.files[0].name)
  }

  const uploadHander = (e) => {
    e.preventDefault()
    const formData = new FormData()
      formData.append('secret', secret)
      formData.append('ip', ip)
      formData.append('fileName', uploadText)
      formData.append('file', file)
    axios
    .post(api, formData)
    .then((res) => {
      if (res.status == 201) {
        setUploadRes(res.data.message)
      }
    })
    .catch((err) => setUploadRes(err))
  }

  return (
    <>
      <Head>
        <title>{"饺子馆"}</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <div className={styles.landing}>
          <div className={styles.container}>
            <div className={styles.title}>
              <div className={styles.text}>
                <span className={styles.pinyin}>jiǎo•​zi​•guǎn</span>
                <span className={styles.mando}>饺子馆</span>
              </div>
              <a href="https://bun.sh/">
              <Image
                alt='bun'
                src={'/bun.png'}
                width={120}
                height={110}
                />
              </a>
            </div>
            <form onSubmit={uploadHander} className={styles.input}>
              <div>
                <input id="input" type="file" onChange={changeHandler} />
                <label htmlFor="input">
                  <span>{uploadText}</span>
                </label>
                {isUpload ?
                <button className={styles.uploadButton} type="submit"><FiUpload /></button>
                : null }
              </div>
              {uploadRes !== null ?
                <div className={styles.response}>
                  <Link rel="noreferrer" target="_blank" href={api + '/upload/' + uploadRes}>{uploadRes}</Link>
                  <CopyToClipboard text={api + '/upload/' + uploadRes}>
                    <button className={styles.copyButton} type="button">
                      <BiCopy />
                    </button>
                  </CopyToClipboard>
                </div>
              : null }
            </form>
          </div>
        </div>
      </main>
    </>
  )
}


export async function getServerSideProps({ req }) {
  const ip = req.headers['x-forwarded-for'] || "192.168.0.0"
  return { props: { ip } }
}