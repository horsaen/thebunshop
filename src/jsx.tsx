import { Hono } from 'hono'
import { html } from 'hono/html'

const app = new Hono()

const css = `
  span {
    color: #fff;
  }
  body {
    margin: 0;
    background-color: #2a2a2a;
  }
`
// use this in order to remove no doctype error
const Layout = (props: {children?: any}) => html`
  <!DOCTYPE html>
  <html>
    <head>
      <title>The Bun Shop</title>
    </head>
    <body>
      ${props.children}
    </body>
  </html>
`

function Page () {
  return (
    <Layout>
      {/* better way of handling this ? */}
      <style>
        {css}
      </style>
      <span onClick={()=>console.log("hi")}>as</span>
    </Layout>
  )
}

app.get('/', (c) => {
  const foo = <Page />
  return c.html(foo)
})

const port = 3000
console.log(`Running at http://localhost:${port}`)

export default app
