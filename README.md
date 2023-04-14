# The Bun Shop

Built with Bun, ElysiaJS, and NextJS.

## Development

Simply clone the repo:
```
git clone https://github.com/horsaen/thebunshop
```

Make sure to edit the cors allowed link, found [here](api/src/index.ts). Or delete the entire {origin: "link"} statement entirely to accept all origins. Also make sure to edit both .env files accordingly, found [here](.env.production) and [here](.env.development). 

Also comment out the rate limiter for development.

Then run the dev server:

```
cd api && bun i && bun run --hot scr/index.ts
```
^^ must cd to dir in order to generate sqlite file in correct location ^^

Then run the frontend in a split terminal (CTRL + SHFT + 5 for VSCode):
```
pnpm i && pnpm dev -p 3001
```
^^ or any other port becuase it doesn't really matter, just not on port 3000 ^^

## Production

The same steps follow, but uncomment rate limiter, adjust cors and build the nextjs project. You're all set :3

## Screenshots

Will finish later