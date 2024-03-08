import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import helpers from "../lib/helpers.js";
import pool from "../database.js";

passport.use('local.signin', new LocalStrategy({
  usernameField: 'usuario',
  passwordField: 'contra',
  passReqToCallback: true
}, async (req, usuario, contra, done) => {
  const rows = await pool.query('SELECT * FROM Usuario WHERE usuario = ?', [usuario]);

  if(rows.length > 0) {
    const user = rows[0][0];
    console.log(user);
    const validPassword = await helpers.matchPassword(contra, user.contra);

    if(validPassword) {
      done(null, user);
    } else {
      done(null, false);
    }
  } else {
    return done(null, false);
  }
}));

passport.use('local.signup', new LocalStrategy({
  usernameField: 'usuario',
  passwordField: 'contra',
  passReqToCallback: true
}, async (req, usuario, contra, done) => {
  const { cargo } = req.body;
  const newUser = { usuario, contra, cargo };
  console.log(newUser);

  newUser.contra = await helpers.encryptPassword(contra);
  const result = await pool.query('INSERT INTO Usuario SET ?', [newUser]);
  newUser.id = result[0].insertId;
  console.log(newUser);

  return done(null, newUser);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const result = await pool.query('SELECT * FROM Usuario WHERE id = ?', [id]);
  done(null, result[0]);
});