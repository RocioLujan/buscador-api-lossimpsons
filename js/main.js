const formulario = document.getElementById("formulario"); // Obtiene el formulario.
const entradaUrl = document.getElementById("entrada-url");  // Obtiene el campo de entrada de URL.
const notificacion = document.getElementById("notificacion"); // Obtiene el elemento de notificación.
const tablaPersonajes = document.getElementById("tabla-personajes").querySelector("tbody"); // Obtiene la tabla de personajes.

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault(); // Evita que el formulario se envíe.
  const consulta = entradaUrl.value.trim(); //Obtiene el valor ingresado por el usuario y elimina espacios en blanco al inicio y al final.

  if (consulta.toLowerCase() !== "quotes") {// Verifica si la entrada (sin distinguir mayúsculas/minúsculas) no es exactamente "quotes".
    notificacion.textContent = "Por favor, ingresa la palabra 'quotes'.";
    notificacion.style.color = "red"; // Cambia el color del texto de la notificación a rojo.
    return;
  }

  notificacion.textContent = ""; // Limpia el contenido de la notificación.
  try {
    const respuesta = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=50` // Realiza una solicitud GET a la API.
    );
    if (!respuesta.ok) throw new Error("Error al obtener los datos."); // Lanza un error si la respuesta no es exitosa.
    notificacion.textContent = "Datos cargados correctamente."; // Muestra un mensaje de éxito en la notificación.
    notificacion.style.color = "green"; // Cambia el color del texto de la notificación a verde.

  const personajes = await respuesta.json(); // Convierte la respuesta en un objeto JSON.
  renderizarTabla(personajes); // Llama a la función para renderizar la tabla con los personajes.
  } catch (error) {
    notificacion.textContent = "Hubo un problema al cargar los datos."; // Muestra un mensaje de error en la notificación.
    notificacion.style.color = "red"; // Cambia el color del texto de la notificación a rojo.
  }
});

function renderizarTabla(citas) {
  // Limpia el contenido previo de la tabla
  tablaPersonajes.innerHTML = "";

  // Si hay citas, se genera contenido; si no, muestra un mensaje vacío
  if (citas.length > 0) { // Verifica si hay citas en el arreglo.
      citas.forEach((cita) => {
          const fila = document.createElement("tr"); // Crea una fila para la tabla.
          fila.innerHTML = `
              <td>${cita.character || "Desconocido"}</td> 
              <td>${cita.quote || "Sin frase"}</td>
              <td>
                  <img src="${cita.image || ""}" 
                      alt="${cita.character || "Sin foto"}" 
                      style="width:100px;height:auto;"/>
              </td>
          `;
          tablaPersonajes.appendChild(fila); // Agrega la fila a la tabla.
      });
      // Muestra la tabla cuando se han agregado las filas
      document.getElementById("tabla-personajes").style.display = "table"; // Muestra la tabla
      document.getElementById("boton-imprimir").style.display = "inline-block" // Muestra el botón de impresión
  } else {
      notificacion.textContent = "No hay datos para mostrar.";
  }
}


