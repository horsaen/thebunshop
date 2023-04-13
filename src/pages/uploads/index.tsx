import Head from "next/head"
import Link from "next/link"
import { useState, useEffect } from 'react'
import Navbar from "@/components/Navbar"
import useSWR, {mutate} from "swr"
import axios from "axios"
import styles from './Upload.module.css'

import { BiLinkExternal } from 'react-icons/bi'

const api = process.env.NEXT_PUBLIC_APIBASE

const fetcher = url => axios.get(url).then(res => res.data)
var key = api + '/uploads/'

function UploadCard(props) {
    const date = new Date(props.time)
    return (
        <div className={styles.card}>
            <span>{props.file}</span>
            <span>{date.toLocaleTimeString() + " | " + date.toLocaleDateString()}</span>
            <div>
                <Link rel="noreferrer" target="_blank" href={api + "/upload/" + props.file}>
                    <BiLinkExternal />
                </Link>
            </div>
        </div>
    )
}
export default function Uploads () {

    const [secret, setSecret] = useState('')
    useEffect(() => {
        const secret = window.localStorage.getItem('secret')
        setSecret(secret || "")
    }, [])

    const {data} = useSWR(key + secret, fetcher)

    return (
        <>
            <Head>
                <title>Uploads</title>
            </Head>
            <Navbar />
            <div className={styles.page}>
                {data && data.map((data) => (
                    <UploadCard
                        key=''
                        file={data.file}
                        time={data.time}
                    />
                ))}
            </div>
        </>
    )
}