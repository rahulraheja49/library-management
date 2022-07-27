# Library Management System

## Direct run

#### Instructions to run server after cloning:

- cd server
- npm i
- create .env file with your mongodb atlas uri as MONGO_URI
- add environment variable JWT_SECRET_BCRYPT (This is a string that shouldn't be revealed)
- npm start

#### Instructions to run client after cloning:

- cd client
- npm i
- npm start

## Run on docker

#### Instructions to build images:

##### Method 1

- Run the make file in the client and server by changing directories and running `make build` in each directory
- Run the make file in the main directory using `make run-dev`

##### Method 2

- Run the make file in the client and server by changing directories and running `make build` in each directory
- Run the command `docker compose -f "docker-compose-static.yml" up -d --build` on the terminal

#### Note:

If you have installed docker using the podman version, you might have to update `/etc/systemd/system/sockets.target.wants/podman.socket` SocketMode=0666. Then run `sudo systemctl daemon-reload` and then `sudo systemctl restart podman.socket`
