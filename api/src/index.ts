// const query = 'INSERT INTO uploads (secret, ip, file, time) VALUES ("asdfasdfas", "192.168.0.0", "file.png", "12341234")'
// ^^ this is helpful because i am dumb

import { Elysia, t } from 'elysia'
import { staticPlugin } from '@elysiajs/static'
import { cors } from '@elysiajs/cors'
import { Database } from 'bun:sqlite'
import { rateLimit } from 'elysia-rate-limit'

import fs from 'fs'

const cdnFolder = 'files'
const db = new Database('data.sqlite', {create: true})

function sqlstr(s) {
    return "'"+s.replace(/'/g, "''")+"'";
}

db.run("CREATE TABLE IF NOT EXISTS uploads (id INTEGER PRIMARY KEY AUTOINCREMENT, secret TEXT, ip TEXT, file TEXT, extension TEXT, time INTEGER)")

if (!fs.existsSync(`${cdnFolder}`)) {
    fs.mkdirSync(`${cdnFolder}`)
}

const app = new Elysia()
    .use(cors({
        origin: "https://bunshop.horsaen.com"
    }))
    // .use(rateLimit({
    //     responseMessage: "too many requests :("
    // }))
    .use(staticPlugin({
        assets: "files",
        prefix: "/upload"
    }))
    // exclude because don't need
    // .get('/', () => {
    //     const json = db.query('SELECT * FROM uploads').all()
    //     return json
    // })
    .get('/uploads/:id', ({ params: { id }}) => {
        const json = db.query('SELECT secret, file, extension, time FROM uploads WHERE secret = ?').all(id)
        return json
    })
    .post('/', async ({ body, body: {file}, set }) => {
        set.status = 201
        if (body.secret.length !== 32) {
            set.status = 500
            const json = {
                "message": "INVALID SECRET"
            }
            return json
        }
        const construct = Date.now() + '-' + body.fileName.replace(/\s/g, "");

        var ext
        if (body.fileName.includes(".")) {
            ext = body.fileName.split('.').pop();
        } else {
            ext = ""
        }

        Bun.write(`${cdnFolder}/` + construct, file)

        const query = 'INSERT INTO uploads (secret, ip, file, extension, time) VALUES ('+sqlstr(body.secret)+', '+sqlstr(body.ip)+', '+sqlstr(construct)+', '+sqlstr(ext)+', '+Date.now()+')'
        db.run(query)

        const json = {
            "message": construct
        }

        return json
    },
    {
        schema: {
            body: t.Object({
                secret: t.String(),
                ip: t.String(),
                fileName: t.String(),
                file: t.File()
            })
        }
    })
    .delete('/upload/:id', async ({params: { id }, set}) => {
        const query = db.query('DELETE FROM uploads WHERE file = ?')
        query.run(id)
        fs.unlinkSync(`${cdnFolder}/` + id)
        const json = {
            message: "Deleted :("
        }
        return json
    })
    .listen(3000)

console.log(`API server is running at ${app.server?.hostname}:${app.server?.port}`)