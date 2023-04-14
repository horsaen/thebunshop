import Link from "next/link"
import styles from './Footer.module.css'

import { GoMarkGithub } from 'react-icons/go'
import { SiBun } from 'react-icons/si'

export default function Footer () {
    return (
        <div className={styles.footer}>
            <div>
                <span>{`Made with <3 by`} <a href="https://github.com/horsaen/">Horsaën</a></span>
                <a href="mailto:atealltheglue@protonmail.com">Abuse</a>
            </div>
            <div>
                <a href="https://github.com/horsaen"><GoMarkGithub /></a>
                <a href="https://bun.sh"><SiBun /></a>
            </div>
        </div>
    )
}