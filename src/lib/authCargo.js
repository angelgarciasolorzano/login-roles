export const checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      if (req.user[0].cargo === requiredRole) {
        next();
      } else {
        res.status(403).send('No tienes permisos para acceder a esta página');
      }
    } else {
      res.status(401).send('No has iniciado sesión');
    }
  };
};
