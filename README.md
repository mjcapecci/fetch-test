## Technology Choices

This sample project was built with Node.js and Express.

## Install

If you don't have node and npm installed locally, [please download them here](https://nodejs.org/en/download/).

After cloning the repo, please cd into the project root in your terminal (or open the project in your editor / IDE and use a built-in terminal) and run `npm install`. This will install all required dependencies to run the app.

## Usage

After the app is installed, you can start the server by running `npm run start`. This will launch the server on localhost:5000.

With the server running, you have access to the following routes:

| Type | Endpoint           | Description                                                                                        |
| ---- | ------------------ | -------------------------------------------------------------------------------------------------- |
| POST | /api/transactions  | Adds a new transaction and returns the added transaction                                           |
| GET  | /api/points/totals | Returns a list of point totals itemized by payer                                                   |
| POST | /api/points/spend  | Spends points and returns a receipt of the total points deducted from each respective payer's pool |
