const Permission = require("../models/Permission");
const PermissionRole = require("../models/PermissionRole");
const Role = require("../models/Role");
const User = require("../models/User");
const UserRole = require("../models/UserRole");



class RbacController {
  async createOnePermission(req, res) {
    try {
      
      const data = await req.body
  
      if (!data.description){
        return res.status(400).send("A Descrição é obrigatória!")
      }
  
      const permissions = await Permission.findOne({
        where: { description: data.description },
      })
  
      if (permissions) {
        return res.status(400).send("já existe uma permissão com essa descrição")
      }
  
      const newPermission = await Permission.create(data)
      return res.status(201).send(newPermission)
    } catch (error) {
      console.log(error.message)
      return res.status(500).send("Algo deu errado")
    }
  }

  async createOneRole(req, res) {
    try {
      const data = await req.body

      if(!data.description){
        return res.status(400).send("A Descrição é obrigatória")
      }

      const roles = await Role.findOne({
        where: { description: data.description},
      })

      if (roles) {
        return res.status(400).send("Já existe uma função com esta descriação")
      }

      const newRole = await Role.create(data)
      return res.status(201).send(newRole)      
    } catch (error) {
      console.log(error.message)
      return res.status(500).send("Algo deu errado")
    }
  }

  async listPermissions(req, res){
    const data = await Permission.findAll()

    return res.status(200).send(data)
  }

  async listRoles(req, res){
    const data = await Role.findAll()

    return res.status(200).send(data)
  }

  async listPermissionsByRole(req, res){
    try {
      
      const { id } = req.params
      const role = await Role.findOne({
        where: { id: id},
        include: [{model: Permission}],
      })
  
      if(!role){
        return res.status(404).send("Função não encontrada")
      }
  
      return res.status(200).send(role)
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Algo deu errado!");          
    }
  }

  async addRoleToUser(req, res){
    try {
      const { userId, roleId } = req.body
  
      if(!userId || roleId){
        return res.status(400).send("O id do usuário e/ou role é obrigatório")
      }
  
      const userExists = await User.findByPk(userId);
  
      const roleExists = await Role.findByPk(roleId);
  
      if (!userExists){
        return res.status(404).send("Usuário não encontrado")
      }
    
      if(!roleExists){
        return res.status(404).send("Função não encontrada")
      }

      const newUserRole = await UserRole.create({
        userId: userId,
        roleId: roleId
      }) 
      
      return res.status(201).send(newUserRole)
    } catch (error) {
      console.log(error.message);
       return res.status(500).send("Algo deu errado!");
    }
  }

  async addPermissionToRole(req, res) {
    try {
      const { permissionId, roleId } = req.body
      
      if (!permissionId || !roleId) {
        return res.status(400).send("O Id da permissão e/ou função é obrigatório")
      }

      const permissionExists = await Permission.findByPk(permissionId)
      const roleExists = await Role.findByPk(roleId)

      if(!roleExists){
        return res.status(400).send("Role não encontrada")
      }

      if(!permissionExists){
        return res.status(400).send("Permissão não encontrada")
      }

      const permissionRoleNew = await PermissionRole.create({
        permissionId: permissionId,
        roleId: roleId
      })
      return res.status(201).send(permissionRoleNew)
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Algo deu errado!");
    }


  }

}


module.exports = new RbacController();
