# React Chess Frontend for QuickMate

A modern, interactive chess game built with React. You can play the game at [QuickMate](https://quickmate.vercel.app "QuickMate")

<div align="center">
  <img height="467" width="831" alt="quickmate.vercel.app" title="LOL" src="https://images2.imgbox.com/4f/43/K3SosQbF_o.png" />
</div>

## Features

* Elegant and Modern Design
* Complete Single Page Application
* Interactive chessboard with drag-and-drop piece movement
* Legal move validation
* Game state management (turns, check, checkmate, etc.)
* Responsive design for desktop and mobile
* Allows 3 Game Modes
  1. Player vs Random Player on server
  2. Player vs Friend using room code
  3. Player vs Bot (Fairy Stockfish - Easy, Medium and Hard)
* Allows playing from both side black and white
* Player can offer and accept draw request between match
* Provides a playground chess board all the time
* Chess validation resides on server side

For Back-end features - [Rails Chess Features](https://github.com/EmAreAitch/rails_chess#features)

## Technologies Used

* [React](https://github.com/facebook/react)
* [Vite](https://github.com/vitejs/vite)
* [Material UI](https://github.com/mui/material-ui)
* [Rails Action Cable](https://www.npmjs.com/package/@rails/actioncable)
* [Notyf](https://github.com/caroso1222/notyf)
* [React Chessboard](https://github.com/Clariity/react-chessboard)
* [Immer](https://github.com/immerjs/immer)

For Back-end technologies - [Rails Chess Technologies](https://github.com/EmAreAitch/rails_chess#technologies-used)

## Future updates

* Move history
* Undo and Redo when playing with bots
* Reset board while in playground
* Chat with opponent

## Installation and Usage

You need to setup both front-end and back-end separately

### [Front-end Repository](https://github.com/EmAreAitch/react_chess)

1. Clone the repository
2. Install dependencies via `npm install`
3. Run server with `npm run dev`
4. Build with `npm run build`

### [Back-end Repository](https://github.com/EmAreAitch/rails_chess)

1. Clone the repository
2. Install dependencies via `bundle install`
3. Run server with `rails s`
4. For production you need to remove `config/credentials.yml.enc` first and then start the server

## Contact

* EmAreAitch Email - [dev.emareaitch@gmail.com](mailto\:dev.emareaitch@gmail.com)

## License

MIT License

Copyright (c) 2024 Mohammad Rahib Hasan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
