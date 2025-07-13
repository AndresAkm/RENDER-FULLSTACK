// JavaScript principal del frontend
document.addEventListener("DOMContentLoaded", () => {
  // Auto-ocultar alertas después de 5 segundos
  const alerts = document.querySelectorAll(".alert")
  alerts.forEach((alert) => {
    setTimeout(() => {
      const bsAlert = new window.bootstrap.Alert(alert)
      bsAlert.close()
    }, 5000)
  })

  // Confirmación para eliminaciones
  const deleteButtons = document.querySelectorAll('button[onclick*="confirm"]')
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (!confirm("¿Estás seguro de que deseas eliminar este elemento?")) {
        e.preventDefault()
        return false
      }
    })
  })

  // Validación de formularios
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      if (!form.checkValidity()) {
        e.preventDefault()
        e.stopPropagation()
      }
      form.classList.add("was-validated")
    })
  })

  // Sidebar toggle para móviles
  const sidebarToggle = document.querySelector('[data-bs-toggle="collapse"]')
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      const sidebar = document.querySelector("#sidebarMenu")
      sidebar.classList.toggle("show")
    })
  }
})

// Función para mostrar loader
function showLoader() {
  const loader = document.createElement("div")
  loader.className = "loader"
  loader.id = "pageLoader"
  document.body.appendChild(loader)
}

// Función para ocultar loader
function hideLoader() {
  const loader = document.getElementById("pageLoader")
  if (loader) {
    loader.remove()
  }
}

// Función para hacer requests AJAX
async function makeRequest(url, options = {}) {
  showLoader()
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error en la petición:", error)
    throw error
  } finally {
    hideLoader()
  }
}
