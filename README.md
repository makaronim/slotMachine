`cd backend`

BACKEND

- `npm i`;

TECH used -

1. nodejs + express
2. typescript
3. docker for the mySQL database;

folder structure -

src/

- app.ts main entry of the server
- controllers/
- db/
- helpers/
- interfaces/
- modules/
- routes/

to run the backend first please start the database
there is a docker-compose file to run `docker-compose up -d`
this command will pull the docker mysql image and set up a database
with default root user and example as password with database called casino_db

after the process is completed inside the `src/db/scripts`
you can find table schemas to run in order to have the tables required for the project.

to run the project when integrating the DB is finished
run the command `npm run dev`

the server should be up and running

`cd frontend`

FRONTEND

- `npm i`

TEACH used -

1. React + React router
2. vite
3. axios
4. typescript

folder structure -

src/

- App.tsx the main entry of the app
- components/
- http/
- types/
- views/

**Please note there is no authentication such as JWT_token for example,**
so the routes are available and not protected.
the flow in order for the project to work properly is as follows

1. create new user with the sign-up action(should be the index route '/')
2. sign in(should be the route '/sign-in')
3. you should see a screen with a start button, once you click it the game will start
