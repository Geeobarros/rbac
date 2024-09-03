const { Router } = require('express')
const RbacController = require('../controllers/RbacController')

const RbacRouter = new Router()

RbacRouter.post('/createOnePermission', RbacController.createOnePermission)
RbacRouter.post('/createOneRole', RbacController.createOneRole)
RbacRouter.get('/listPermissions', RbacController.listPermissions)
RbacRouter.get('/listRoles', RbacController.listRoles)
RbacRouter.get('/:id', RbacController.listPermissionsByRole)
RbacRouter.post('/addRoleToUser', RbacController.addRoleToUser)
RbacRouter.post('/addPermissionToRole', RbacController.addPermissionToRole)

module.exports = RbacRouter