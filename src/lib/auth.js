export function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/signup');
}

export function isNotLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  if (req.user[0].cargo === 'Administrador') {
    return res.redirect('/perfil/administrador');
  } else  {
    return res.redirect('/perfil/usuario');
  }
}