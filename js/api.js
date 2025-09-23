// URL base para acceder a los datos de estudiantes en MockAPI
const API_URL = 'https://68d0b153e6c0cbeb39a23376.mockapi.io/api/estudiantes'; 

// Obtener todos los estudiantes desde la API
export async function getEstudiantes() {
  const res = await fetch(API_URL);
  return res.json();
}

// Crear un nuevo estudiante en la base de datos
export async function createEstudiante(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

// Actualizar estudiante existente por ID
export async function updateEstudiante(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

