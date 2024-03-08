import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars"
import { join, dirname } from "path";
import session from "express-session";
import MySQLStoreFactory from "express-mysql-session";
import passport from "passport";
import { fileURLToPath } from "url";
import { database } from "./keys.js";

import authenticationRoutes from "./routes/authentication.js";
import indexRoutes from "./routes/index.js";
import './lib/passport.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const MySQLStore = MySQLStoreFactory(session);

app.set('port', process.env.PORT || 4000);
app.set('views', join(__dirname, 'views'));
app.engine('.hbs', engine({
  defaultLayout: 'main',
  layoutsDir: join(app.set('views'), 'layouts'),
  partialsDir: join(app.set('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use(session({
  secret: 'secret',
  saveUninitialized: false,
  resave: false,
  store: new MySQLStore(database)
}));

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (req.user && Array.isArray(req.user) && req.user.length > 0) {
    app.locals.user = req.user[0];
  } else {
    app.locals.user = null;
  }
  next();
});

app.use(indexRoutes);
app.use(authenticationRoutes);

app.use(express.static(join(__dirname, 'public')));

app.listen(app.get('port'), () => {
  console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});