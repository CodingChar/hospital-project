document.getElementById('registro-pacientes').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío del formulario

    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;
    const motivo = document.getElementById('motivo').value;

    // Validar los campos
    if (nombre === '' || edad === '' || motivo === '') {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Mostrar mensaje de éxito
    alert('Paciente registrado con éxito.');

    // Limpiar el formulario
    document.getElementById('registro-pacientes').reset();
});

