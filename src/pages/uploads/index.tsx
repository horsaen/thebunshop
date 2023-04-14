import Head from "next/head"
import Image from 'next/image'
import Link from "next/link"
import { useState, useEffect } from 'react'
import Navbar from "@/components/Navbar"
import useSWR, {mutate} from "swr"
import axios from "axios"
import styles from './Upload.module.css'

import { AiFillDelete } from 'react-icons/ai'
import { BiLinkExternal } from 'react-icons/bi'

const api = process.env.NEXT_PUBLIC_APIBASE

const fetcher = url => axios.get(url).then(res => res.data)
var key = api + '/uploads/'

function UploadCard(props) {
    const date = new Date(props.time)
    const deleteUpload = (e) => {
        e.preventDefault()
        axios
        .delete(api + '/upload/' + props.file)
        .then((res) => {
            if (res.status == 200) {
                mutate(key + props.secret)
            }
        })
    }
    return (
        <div className={styles.card}>
            <span>{props.file}</span>
            <span>{date.toLocaleTimeString() + " | " + date.toLocaleDateString()}</span>
            <div>
                <button onClick={(e)=>deleteUpload(e)}><AiFillDelete /></button>
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
                <title>饺子馆</title>
            </Head>
            <Navbar />
            <div className={styles.page}>
                {data && data[0] == undefined ?
                    <div className={styles.bun}>
                        <Image
                            alt="bun"
                            src={'/bun.png'}
                            width={120}
                            height={110}
                        />
                        <div>
                            <span>aw man, no files :(</span>
                            <Link href="/">upload one? :3</Link>
                        </div>
                    </div>
                :
                    <div className={styles.cardContainer}>
                    {data && data.map((data) => (
                        <UploadCard
                        key=''
                        secret={data.secret}
                        file={data.file}
                        time={data.time}
                        />
                        ))}
                    </div>
                }
            </div>
        </>
    )
}