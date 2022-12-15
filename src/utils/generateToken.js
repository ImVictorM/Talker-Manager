function generateToken() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  const MAX_TOKEN_LENGTH = 16;
  while (token.length < MAX_TOKEN_LENGTH) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }
  return token;
}

module.exports = { generateToken };
