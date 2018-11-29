# Diamond Sweeper

To start the Application:

* Install the dependencies (via `yarn install` or `npm install`)
* Compile Assets: `npm run compile`
* Start the webserver: `npm start`
* Visit `http://localhost:3000` to see the application

If you have done the above steps correctly, you should see the below

![Screenshot](./initialboard.png)

If you make a change, run the last two steps above to see it reflected.

##### How to play the game
* Find all the diamonds hidden under the unknown boxes.
* If there is nothing inside the box, then you can do -
    * You can go to other boxes
    * Or you can click on the empty box for a tip, which will give you the direction to the nearest diamond in respective row and column.
* Game will end when you find all the diamonds in the board.