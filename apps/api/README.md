# versetime.net API
Node/Express/PostgreSQL API for versetime.net

## Installation

### Development

Docker is used to run 3 services:
1. API
2. Caddy (to provide HTTPS)
3. Postgresql (database)

First, clone the project into a new directory.

1. Ask Troy for the `.env` file
2. ```npm install```
4. Add `127.0.0.1 ui.realm7.local api.versetime.local` to your hosts file

## Start & stop the system
Start:

```docker-compose up```

Stop:

`CTRL-C` to kill the running containers, then:

```docker-compose down```

## Add the Certificate Authority to your browser

IMPORTANT: You'll need to add the Caddy CA root certificate to your OS or at least your browser.
Once you fire up the env, the file you need is found at `ca-certificates/root.crt`.

In the browser, look under security options and certificates, then authorities to find the place to add this root.crt.

### Production

1. Configure environment via pm2 ecosystem
2. ```npm install```
3. ```npm build```
4. Serve the ```dist``` directory

## Architecture
* Node
* Express
* PostgreSQL

## Connect to local developer database
Connect to the container:

```docker exec -it versetime-db "/bin/bash"```

Connect to the database from the container's shell:

```psql -h localhost -U api bible```

As root
```psql -h localhost bible```


Become root on production server

```sudo -u postgres psql```
