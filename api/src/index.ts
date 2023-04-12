import { Elysia, t } from 'elysia'
import { staticPlugin } from '@elysiajs/static'
import { cors } from '@elysiajs/cors'
import { Database } from 'bun:sqlite'

import fs from 'fs'

const cdnFolder = 'files'
const db = new Database('data.sqlite', {create: true})
db.run("CREATE TABLE IF NOT EXISTS uploads (id INTEGER PRIMARY KEY AUTOINCREMENT, file TEXT, time INTEGER, ip TEXT)")

if (!fs.existsSync(`${cdnFolder}`)) {
    fs.mkdirSync(`${cdnFolder}`)
}

const app = new Elysia()
    .use(cors())
    .use(staticPlugin({
        assets: "files",
        prefix: "/"
    }))
    .get('/', () => {
        const json = {
            "message": 200
        }
        return json
    })
    .post('/', async ({ body, body: {file}, set }) => {
        set.status = 201
        const construct = Date.now() + '-' + body.fileName.replace(/\s/g, "");
        Bun.write(`${cdnFolder}/` + construct, file)
        const json = {
            "message": construct
        }
        return json
    },
    {
        schema: {
            body: t.Object({
                fileName: t.String(),
                file: t.File()
            })
        }
    })
    .listen(3000)

console.log(`API server is running at ${app.server?.hostname}:${app.server?.port}`)