const { response } = require("express")
const express = require("express")
const app = express()

app.use(express.json())

const models = require('../models/index')
const paket = models.paket

app.get("/", async (request, response) =>{
    let dataPaket = await paket.findAll()
    return response.json(dataPaket)
})

app.post("/", async (request, response) => {
    let newPaket = {
        jenis_paket: request.body.jenis_paket,
        harga: request.body.harga
    }
    paket.create(newPaket)
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

app.put("/:id_paket", async(request,response) => {
    let param = {id_paket : request.params.id_paket}
    let newPaket = {
        jenis_paket: request.body.jenis_paket,
        harga: request.body.harga
    }
    paket.update(newPaket, {where: param})
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

app.delete("/:id_paket", async(request,response) => {
    let param = {id_paket : request.params.id_paket}
    paket.destroy({where:param})
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