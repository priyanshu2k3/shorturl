const jwt = require('jsonwebtoken');

// Your secret key (should be stored securely, e.g., in environment variables)
const secretKey = process.env.secretKey;

// Function to verify and decode the JWT token
export const verifyAndDecodeToken = (token:string) => {
  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);
    // Token is valid and decoded contains the payload
    return { valid: true, decoded };
  } catch (error) {
    // Token is invalid or expired
    return { valid: false, error};
  }
};