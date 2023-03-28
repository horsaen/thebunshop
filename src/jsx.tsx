import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

const app = new Hono()

function Thing () {
  return (
    <span>yay</span>
  )
}

function Page () {
  return (
    <html>
      <head>
        <title>hi</title>
      </head>
      <div>
        <span>hi</span>
        <Thing />
      </div>
    </html>
  )
}

app.get('/', (c) => {
  const foo = <Page />
  return c.html(foo)
})

const port = 3000
console.log(`Running at http://localhost:${port}`)

export default app
