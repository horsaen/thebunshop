# The Bun Shop

Built with Bun, ElysiaJS, and NextJS.

## Development

Clone the repo:
```
git clone https://github.com/horsaen/thebunshop
```

Then install dependencies:
```
cd thebunshop && pnpm i && cd api && bun i
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

The same steps follow, but uncomment rate limiter, adjust cors, and build the nextjs project. You're all set :3

## Screenshots

- [Landing](/docs/screenshots/desktop/landing.png)
- [Upload](/docs/screenshots/desktop/upload.png)
- [Upload List](/docs/screenshots/desktop/uploads.png)

- [Mobile Landing](/docs/screenshots/mobile/landing.png)
- [Mobile Upload](/docs/screenshots/mobile/upload.png)
- [Mobile Upload List](/docs/screenshots/mobile/single.png)
- [Mobile Upload List 2](/docs/screenshots/mobile/double.png)
- [Empty Upload List](/docs/screenshots/mobile/no%20more%20womp%20womp.png)

## Service files

I wrote service files :D

```systemd
[Unit]
Description=thebunshop frontend service
After=network.target

[Service]
User=<USER>
Group=<USER>
Type=simple
KillMode=control-group
WorkingDirectory=<THEBUNSHOP DIRECTORY>
ExecStart=/bin/bash -c "npx next start -p <PORTNUMBER>"
Restart=on-failure
RestartSec=3

[Install]
WantedBy=mutli-user.target
```
^^ remember to build :)

Well i thought much like running `/bin/bash -c "npx next start -p <PORTNUMBER>"` there would've been no problem, but due to some random bin location shenanigans /bin/bash is unable to find the bin files for bun itself, so make sure bun is installed to a user that the sevice file can access. then find the directory of the bin file using `which bun` and then substitute the output for the <BUN BIN DIRECTORY> in the service file :|

```
[Unit]
Description=thebunshop api service
After=network.target

[Service]
User=<USER>
Group=<USER>
Type=simple
KillMode=control-group
WorkingDirectory=<THEBUNSHOP DIRECTORY>/api
ExecStart=<BUN BIN DIRECTORY> run src/index.ts"
Restart=on-failure
RestartSec=3

[Install]
WantedBy=mutli-user.target
```