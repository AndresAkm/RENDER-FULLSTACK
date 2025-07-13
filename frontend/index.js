const express = require("express")
const path = require("path")
const methodOverride = require("method-override")
const morgan = require("morgan")
require("dotenv").config()

const app = express()

// Configuración del motor de plantillas EJS
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Middlewares
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride("_method"))

// Archivos estáticos
app.use(express.static(path.join(__dirname, "static")))

// Rutas
const indexRoutes = require("./routes/index")
const clientesRoutes = require("./routes/clientes")
const productosRoutes = require("./routes/productos")
const usuariosRoutes = require("./routes/usuarios")

app.use("/", indexRoutes)
app.use("/clientes", clientesRoutes)
app.use("/productos", productosRoutes)
app.use("/usuarios", usuariosRoutes)

// Middleware de manejo de errores 404
app.use((req, res) => {
  res.status(404).render("pages/404", {
    title: "Página no encontrada",
    error: "La página que buscas no existe",
  })
})

// Middleware de manejo de errores del servidor
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render("pages/error", {
    title: "Error del servidor",
    error: "Algo salió mal en el servidor",
  })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🎨 Frontend ejecutándose en el puerto ${PORT}`)
  console.log(`🌐 Aplicación disponible en: http://localhost:${PORT}`)
})
