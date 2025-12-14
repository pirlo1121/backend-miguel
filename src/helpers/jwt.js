import jwt from 'jsonwebtoken'
export  function createToken (payload) {

    try{
        const key = process.env.JWT_SECRET;
        const token = jwt.sign(payload, key , {expiresIn: "1h"})
        return token;
    }catch(error) { 
        console.log(error)
    }
}


    

export function decodeToken (token){
    try {
        const key = process.env.JWT_SECRET;
        console.log('token', token)
        const decoded = jwt.verify(token, key);
        return{ok: true, payload: decoded};
    
    }catch(error){
      console.error('Error al decodificar el token', error);
      return { ok: false, error: error.message}
    }
       
}

