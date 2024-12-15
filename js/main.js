const formulario = document.getElementById("formulario");
const entradaUrl = document.getElementById("entrada-url");
const notificacion = document.getElementById("notificacion");
const tablaPersonajes = document.getElementById("tabla-personajes").querySelector("tbody");

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  const consulta = entradaUrl.value.trim();

  if (consulta.toLowerCase() !== "quotes") {
    notificacion.textContent = "Por favor, ingresa la palabra 'quotes'.";
    return;
  }

  notificacion.textContent = "";
  try {
    const respuesta = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=50`
    );
    if (!respuesta.ok) throw new Error("Error al obtener los datos.");

  const personajes = await respuesta.json();
  renderizarTabla(personajes);
  } catch (error) {
    notificacion.textContent = "Hubo un problema al cargar los datos.";
  }
});

function renderizarTabla(citas) {
  tablaPersonajes.innerHTML = "";
  citas.forEach((cita) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${cita.character || "Desconocido"}</td>
      <td>${cita.quote || "Sin frase"}</td>
      <td>
        <img src="${cita.image || ""}" 
            alt="${cita.character || "Sin foto"}" 
            style="width:100px;height:auto;"/>
      </td>
    `;
    tablaPersonajes.appendChild(fila);
  });
}


