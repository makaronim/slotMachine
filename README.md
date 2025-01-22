BACKEND

I had a lot of thoughts on how to approach the backend side.
at first I tried to do everything with express-session
after developing the code, it looked unclean and hard to maintain.
So I decided to change it to persistent relation database
to have user and the "session" ie: Game stored
after creating the endpoints for the user, I started working on the game
start endpoint was pretty straight forward, cash out as well although I decided
to pass the remaining credits to the user and each fresh start will give him a fresh 10 credit start
the roll endpoint was pretty challenging
first I thought on how to map the slots symbols with their winning rewards
than for the roll mechanism I used Math.random times the symbols array.length
to get a random index on each of them.
the "cheat mechanism" approach is to check whether the user has more
then the credits and do a "house roll" and changing the first slot
of the user roll to the one the house rolled with the 30% or 60% used as
0.3 or 0.6 on the Math.random roll to give the house more chance of winning
on the range of the true statement. after validation with postman
to see the working endpoints I moved to the frontend

**let start configuring the backend**

`cd backend`

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

FRONTEND
When starting to create the frontend I knew there is a need for
state management so I decided to use React + vite because I'm more
familiar with the framework.
the frontend is pretty straight forward, make it look like a simple slot machine
with the buttons to roll, cash out and show the credits.

When signing in the backend basically creating the new session
so I already have it - so I decided to save it in the localStorage
to have the game data when changing routes, other than that everything is
going to and coming from the backend.

`cd frontend`
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
