const { Router } = require("express");
const rbacRoutes = require("./rbac.route");
const userRoutes = require("./user.route");

const routes = Router()

routes.use('/rbac', rbacRoutes)
routes.use('/user', userRoutes)

module.exports = routes