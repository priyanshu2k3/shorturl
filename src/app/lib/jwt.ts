const jwt = require('jsonwebtoken');

// Your secret key (should be stored securely, e.g., in environment variables)
const secretKey = process.env.secretKey;

// Function to verify and decode the JWT token
export const verifyAndDecodeToken = (tokens:string) => {
  var decoded
  try {
    //EXTRACTING TOKEN
    const cookies = tokens.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === "token") {
        console.log(name,value,"in the jwtverify")
    // Verify the token
     decoded = jwt.verify(value, secretKey);
    console.log(name,value,"inthe jwtverify",decoded)
    return ({ valid: true, decoded })}
  
  }
  throw new Error('Token not found')
  
} catch (error) {
    // Token is invalid or expired
    return { valid: false,decoded};
  }
};
