import jwt from 'jsonwebtoken';

// islogged in middleware
const isloggedIn = (req, res, next) => {
     // get token from cookies or headers
     const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    
    // if no token, unauthorized
     if (!token) {  
          return res.status(401).json({
               success: false,
               message: "Access denied. No token provided.",
          });
     }    
     try {
          // verify token
          const decoded = jwt.verify(token, process.env.JWT_SECRET);

          // attach user to request object
          req.user = decoded; 
          next();
     }    
     catch (error) {
          return res.status(400).json({
               success: false,
               message: "Invalid token.",
          });
     }    
}

// tutor check middleware
const isTutor = (req, res, next) => {
     if (req.user.role !== 'tutor') {
          return res.status(403).json({      
               success: false,
               message: "Access denied. Tutors only.",
          });
     }    
     next();
}    

export { isloggedIn, isTutor };