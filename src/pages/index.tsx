import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ip}) {
  return (
    <>
      <Head>
        <title>饺子馆</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.landing}>
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
            <form>
              <input />
            </form>
            <span>{ip}</span>
            {/* <span>{ip}</span> */}
          </div>
        </div>
      </main>
    </>
  )
}


export async function getServerSideProps({ req }) {
  const ip = req.headers['x-forwarded-for'] || "192.135.564"
  console.log(ip)
  return { props: { ip } }
}