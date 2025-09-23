// Filtrado de estudiantes según criterios seleccionados
export function applyFilters(estudiantes, nombre, carrera, seniority) {
  return estudiantes.filter(est => {

  // Comparar nombre ignorando mayúsculas/minúsculas
    const matchNombre = est.nombre.toLowerCase().includes(nombre.toLowerCase());
  // Filtrar por carrera si se seleccionó una
    const matchCarrera = carrera ? est.carrera === carrera : true;
  // Filtrar por seniority
    const matchSeniority = seniority ? est.seniority === seniority : true;
  // Retornar solo los que cumplen con todos los criterios
    return matchNombre && matchCarrera && matchSeniority;
  });
}