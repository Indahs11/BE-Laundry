const express = require("express")
const md5 = require("md5")
const app = express()

app.use(express.json())

const models = require("../models/index")
const users = models.users

const {auth} = require("./login")
app.use(auth)

app.get("/", async (request, response) => {
    let dataUser = await users.findAll()
    return response.json(dataUser)
})

app.post("/", async (request, response) => {
    let newUser = {
        nama: request.body.nama,
        username: request.body.username,
        password: md5(request.body.password),
        role: request.body.role
    }
    users.create(newUser)
    .then(result => {
        response.json({
            message: `Data Berhasil Ditambahkan`,
            data: result
        })
    })
    .catch(error => {
        response.json({
            message: error.message
        })
    })
})

app.put("/:id_user", async(request,response) => {
    let param = {id_user : request.params.id_user}
    let newUser = {
        nama: request.body.nama,
        username: request.body.username,
        role: request.body.role
    }
    if(request.body.password){
        newUser.password = md5(request.body.password)
    }
    users.update(newUser, {where: param})
    .then(result => {
        response.json({
            message: `Data Berhasil Dirubah`,
            data: result
        })
    })
    .catch(error => {
        response.json({
            message: error.message
        })
    })
})
app.delete("/:id_user", async(request,response) => {
    let param = {id_user : request.params.id_user}
    users.destroy({where:param})
    .then(result => {
        response.json({
            message: `Data Berhasil Dihapus`
        })
    })
    .catch(error => {
        response.json({
            message: error.message
        })
    })
})
module.exports = app