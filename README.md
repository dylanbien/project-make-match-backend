# Chenblog backend

*a backend for the Chenblog project*
On this branch, a new User model was added to tag each post with their author and restrict post addition, edits, and deletion to signed-in users. To do this, authentication was enabled for our project. When signing up, users send a new email and password to the backend. This password is salted and hashed and stored in the database. A JWT is returned to the user afterwards and after they sign in in the future. We use Passport.js to handle salted/hashed password generation and comparison.

## What worked
Everything. For once everything worked on basilically the first try.

## What didn't
Juggling two repos at once and keeping the Mongo shell, the frontend, and the backend all running on my computer was very difficult. If I didn't have a second monitor this would've been very painful.

[deployed url](https://chenblog-auth-api.onrender.com)
