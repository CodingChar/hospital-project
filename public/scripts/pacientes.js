const express = require("express");
const bodyParser = require("body-parser")

const serverUrl = 'http://54.39.139.122:2001s'; //RUTA POR DEFINIR

document.getElementById('createPatientForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    const response = await fetch(`${serverUrl}/patients`, { //
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, age})
    });
    
    const result = await response.json();
    document.getElementById('createResponse').textContent = result.message || 'Error creating patient'
});

document.getElementById('getAllPatients').addEventListener('click', async () => {
    const response = await fetch(`${serverUrl}/patinets`);
    const patients = await response.json();
    const patientsList = document.getElementById('patientsList');
    patientsList.innerHTML = '';
    patients.forEach(patient => {
        const li = document.createElement('li');
        li.textContent = `ID: ${patient.id}, name: ${patient.name}, Age: ${patient.age}`;
        patientsList.appendChild(li);
    });
});

document.getElementById('findPatientForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('findId').value;

    const response = await fetch(`${serverUrl}/patients/${id}`);
    const result = await response.json();
    document.getElementById('findResponse').textContent = result.name ? `Name: ${result.name}, Age: ${result.age}` : result.message || 'Error finding patient'
});