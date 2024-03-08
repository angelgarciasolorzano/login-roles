import express from "express";
import passport from "passport";
import { isLoggedIn, isNotLoggedIn } from "../lib/auth.js";
import { checkRole } from "../lib/authCargo.js";

const router = express.Router();

router.get('/signin', isNotLoggedIn, (req, res) => {
  res.render('auth/signin');
})

router.get('/signup', isNotLoggedIn, (req, res) => {
  res.render('auth/signup');
});

router.post('/signin', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local.signin', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/signin');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      if (user.cargo === 'Administrador') {
        return res.redirect('/perfil/administrador');
      } else if (user.cargo === 'Usuario') {
        return res.redirect('/perfil/usuario');
      } else {
        return res.redirect('/perfil');
      }
    });
  })(req, res, next);
});

router.post('/signup', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local.signup', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/signup');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      if (user.cargo === 'Administrador') {
        return res.redirect('/perfil/administrador');
      } else if (user.cargo === 'Usuario') {
        return res.redirect('/perfil/usuario');
      } else {
        return res.redirect('/perfil');
      }
    });
  })(req, res, next);
});

router.get('/perfil/administrador', isLoggedIn, checkRole('Administrador'), (req, res) => {
  res.render('profile');
});

router.get('/perfil/usuario', isLoggedIn, checkRole('Usuario'), (req, res) => {
  res.render('profile');
});

router.get('/logout', (req, res, next) => {
  req.logout(req.user, err => {
    if (err) return next(err);
    res.redirect('/signin');
  });
});

export default router;