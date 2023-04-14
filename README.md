# The Bun Shop

Built with Bun, ElysiaJS, and NextJS.

As NextJS understably tries to compile the API folder, the API is found in [a different git repo](https://github.com/horsaen/thebunshop-api)

## Development

Clone both repos:
```
git clone https://github.com/horsaen/thebunshop && git clone https://github.com/horsaen/thebunshop-api
```

Then install dependencies for both projects (preferably using a split terminal, CTRL + SHFT + 5 on VSCode):

Frontend:
```
pnpm i
```
Backend:
```
bun i
```

Then start both projects:

Frontend:
```
pnpm dev -p 3001
```
^^ start this using any port other than 3000, as the API runs on this port ^^

Backend:
```
bun dev
```

## Production

The same steps follow, but uncomment rate limiter, adjust cors and build the nextjs project. You're all set :3

## Screenshots

Will finish later

## Service files

I wrote service files :D

```
WIP
```

```
WIP
```