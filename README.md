<a href="https://appointment-booking-example.com" target="_blank"><h1 align="center">Online Booking</h1></a>

<p align="center"><b>For The Renewal Center</b></p>

---

<p align="center"><img src="./Client/public/project-screenshot.png"/></p>

---

## Status -- IN DEVELOPMENT

Currently working building the landing page and static content, as well as integrating with google calender and authentication.

## Run Locally

1. Clone the repo to you local device.
2. Install dependencies: `npm run addDependencies`.
3. Install <a href="https://docs.docker.com/get-docker/">Docker</a>.
4. Run `docker-compose -f docker-compose.dev.yml up -d` to start the application in development mode.
5. Run `npm run initDatabase` to run migrations and seed the database.
6. To watch for changes in the API directory `cd ./Api && npm run watch`.
