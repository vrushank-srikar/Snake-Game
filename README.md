
# Snake Game Application

## Description
This is a Snake game built with a Node.js backend and a web-based frontend. The game includes a server to handle game scores, making it a complete interactive experience.

## Project Structure
- **`package.json`**: Contains project metadata and dependency definitions.
- **`server.js`**: Main server script to handle API routes and server-side logic.
- **`models/Score.js`**: Mongoose model for managing and storing game scores in a MongoDB database.
- **`public/`**: Frontend files for the game, including:
  - `index.html` and `game.html`: HTML files for the main pages.
  - `script.js`: Client-side JavaScript logic for the game.
  - `styles.css`: Styling for the web pages.

## Prerequisites
To run this project, you need the following installed:
1. [Node.js](https://nodejs.org/) (v16 or higher recommended)
2. [MongoDB](https://www.mongodb.com/) (Ensure MongoDB is running locally or provide a connection string to a remote instance)

## Installation
1. **Clone or extract the project**:
   Extract the contents of the ZIP file or clone the repository.

2. **Navigate to the project directory**:
   ```bash
   cd snake
   ```

3. **Install dependencies**:
   Run the following command to install all required packages:
   ```bash
   npm install
   ```

## Configuration
1. **Setup MongoDB**:
   - Ensure MongoDB is installed and running locally on the default port (`27017`), or provide a remote connection string.
   - Update the MongoDB connection string in `server.js`. Look for a line like:
     ```javascript
     mongoose.connect('mongodb://localhost:27017/snake');
     ```
     Replace `'mongodb://localhost:27017/snake'` with your own connection string if needed.

2. **Optional: Change the server port**:
   The server runs on port `3000` by default. To change it, edit the following line in `server.js`:
   ```javascript
   const PORT = 3000;
   ```

## Running the Server
1. Start the MongoDB server (if running locally):
   ```bash
   mongod
   ```

2. Start the Node.js server:
   ```bash
   node server.js
   ```

3. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## Features
- **Snake Game**: A fun and interactive game accessible via the browser.
- **Score Management**: Scores are stored and managed in a MongoDB database.
- **Responsive Design**: The frontend adapts to various screen sizes.

## Troubleshooting
- **MongoDB Connection Error**: Ensure the MongoDB server is running and the connection string in `server.js` is correct.
- **Port Already in Use**: If port `3000` is in use, change it in `server.js` as explained above.

## License
This project is for educational and personal use. Modify and distribute as needed.
