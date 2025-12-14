import { decodeToken } from "../helpers/jwt.js";

export function validarToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  console.log('aqui' + token)
  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "token no proporcionado",
    });
  }

  console.log("tok midd", token);
  const result = decodeToken(token);

  if (!result.ok) {
    return res.status(403).json({
      ok: false,
      message: "token inavlido o expirado",
      error: result.error,
    });
  }

  req.userId = result.payload.id;
  req.user = result.payload;

  next();
}

export function isActive(req, res, next) {
  try {
    console.log(req.user)
    const verified =  req.user.verified;
    if(!verified ){
    return res.status(403).json({ ok: false, msg: "Acceso denegado  usuario no verificado" });
        
    }
    next();

  } catch (error) {
    console.log(error)
    return res.status(500).json({ ok: false, msg: "Error en verificar" });

  }
}
