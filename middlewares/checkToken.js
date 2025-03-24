const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extrai o token após "Bearer"

  if (!token) return res.status(401).json({ msg: "Acesso negado!" });

  try {
    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret); // Decodifica o token
    req.userId = decoded.id; // Adiciona o userId ao request
    next(); // Passa para o próximo middleware ou controlador
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: "Token inválido!" });
  }
};
