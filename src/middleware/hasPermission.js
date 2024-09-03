const jwt = require("jsonwebtoken");
const PermissionRole = require("../models/PermissionRole");
const Permission = require("../models/Permission");

//permissions vai ser um array de permissões Ex: ['criar_usuario',  'ler_usuario']
function hasPermission(permissions) {
  return async (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).send({ message: "Token não fornecido" });
    }

    const token = req.headers.authorization;

    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    req.payload = decoded;

    try {
      const roles = await PermissionRole.findAll({
        where: {
          roleId: req.payload.roles.map((role) => role.id),
        },
        attributes: ["permissionId"],
        include: [{ model: Permission, as: "permissions" }],
      });

      //  some => Se pelo menos 1 for True, retorna True
      const existPermission = roles.some((role) => {
        const hasPermission = role.permissions.some((permissao) => {
          return permissions.includes(permissao.description);
        });
        return hasPermission;
      });

      if (!existPermission) {
        return res.status(401).send({message:"Você não tem permissão para acessar"});
      }

      next();
    } catch (error) {
      console.log(error.message);
      return res.status(401).send({message: "Autenticação falhou", cause: error.message})
    }
  };
}

module.exports = { hasPermission }

