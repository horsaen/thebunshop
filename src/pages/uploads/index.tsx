import Head from "next/head"
import Image from 'next/image'
import Link from "next/link"
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useState, useEffect } from 'react'
import Navbar from "@/components/Navbar"
import useSWR, {mutate} from "swr"
import axios from "axios"
import styles from './Upload.module.css'

import { AiFillDelete } from 'react-icons/ai'
import { BiLinkExternal, BiCopy } from 'react-icons/bi'

const api = process.env.NEXT_PUBLIC_APIBASE

const fetcher = url => axios.get(url).then(res => res.data)
var key = api + '/uploads/'

const loader = ({src}) => {
    return `${api}/upload/${src}`
}

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
            {props.extension ==  "jpg" || "gif" || "png" || "svg" || "heic" ?
                <div className={styles.fileImg}>
                    <Image alt="Uploaded file" src={props.file} width={125} height={125} loader={loader} />
                </div>
                :
                <div className={styles.fileImg}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 3a2 2 0 0 1 2-2h9.982a2 2 0 0 1 1.414.586l4.018 4.018A2 2 0 0 1 21 7.018V21a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm2-.5a.5.5 0 0 0-.5.5v18a.5.5 0 0 0 .5.5h14a.5.5 0 0 0 .5-.5V8.5h-4a2 2 0 0 1-2-2v-4Zm10 0v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 0-.146-.336l-4.018-4.018A.5.5 0 0 0 15 2.5Z"></path></svg>
                </div>
            }
            <div className={styles.textContainer}>
                <span>{props.file}</span>
                <span>{date.toLocaleTimeString() + " | " + date.toLocaleDateString()}</span>
            </div>
            <div className={styles.buttonContainer}>
                <button onClick={(e)=>deleteUpload(e)}><AiFillDelete /></button>
                <Link rel="noreferrer" target="_blank" href={api + "/upload/" + props.file}>
                    <BiLinkExternal />
                </Link>
                <CopyToClipboard text={api + '/upload/' + props.file}>
                    <button className={styles.copyButton} type="button">
                        <BiCopy />
                    </button>
                </CopyToClipboard>
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
                            key={data.file}
                            secret={data.secret}
                            file={data.file}
                            extension={data.extension}
                            time={data.time}
                        />
                        ))}
                    </div>
                }
            </div>
        </>
    )
}