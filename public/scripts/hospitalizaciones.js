// klk mi gente aqui xbox wii con el oso yogi
const API_BASE_URL = "http://54.39.139.122:2001/hospitalizaciones"; // API

// OBTENER HOSPITALIZACIONES
async function fetchHospitalizaciones() {
  try {
    const response = await fetch(API_BASE_URL); 
    if (!response.ok) throw new Error("Error al obtener las hospitalizaciones");
    const data = await response.json();
    renderTable(data); 
  } catch (error) {
    console.error("Error al conectar con la API:", error);
    alert("Error al cargar las hospitalizaciones.");
  }
}

// RENDERIZAR TABLA (RECOMENDADO POR MI PANA COPILOT)
function renderTable(hospitalizaciones) {
  const tbody = document.getElementById("hospitalizaciones-tbody");
  tbody.innerHTML = ""; 

  hospitalizaciones.forEach((h) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${h.hospitalizacionID}</td>
      <td>${h.pacienteID}</td>
      <td>${h.fechaIngreso}</td>
      <td>${h.fechaAlta ?? "No definida"}</td>
      <td>${h.habitacion}</td>
      <td>${h.cama}</td>
      <td>${h.notaMedica}</td>
    `;
    tbody.appendChild(row);
  });
}

// AGREGAR HOSPITALIZACION
async function addHospitalizacion(event) {
  event.preventDefault();

  const pacienteID = document.getElementById("pacienteID").value;
  const fechaIngreso = document.getElementById("fechaIngreso").value;
  const fechaAlta = document.getElementById("fechaAlta").value || null;
  const habitacion = document.getElementById("habitacion").value;
  const cama = document.getElementById("cama").value;
  const notaMedica = document.getElementById("notaMedica").value;

  const nuevaHospitalizacion = {
    pacienteID,
    fechaIngreso,
    fechaAlta,
    habitacion,
    cama,
    notaMedica,
  };

  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaHospitalizacion),
    });

    if (!response.ok) throw new Error("Error al agregar hospitalización");
    alert("Hospitalización agregada exitosamente.");
    await fetchHospitalizaciones(); 
    document.getElementById("hospitalizacion-form").reset();
  } catch (error) {
    console.error("Error al conectar con la API:", error);
    alert("Error al agregar la hospitalización.");
  }
}

document.getElementById("hospitalizacion-form").addEventListener("submit", addHospitalizacion);
fetchHospitalizaciones(); 