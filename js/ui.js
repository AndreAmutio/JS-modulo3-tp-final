// Renderizar cada estudiante como tarjeta con avatar, nombre, carrera y botones
export function renderEstudiantes(estudiantes, container) {
  container.innerHTML = '';
  estudiantes.forEach(est => {
    const card = document.createElement('div');
    card.className = 'column is-4';
    card.innerHTML = `
      <div class="card">
        <div class="card-image has-text-centered pt-4">
          <figure class="image is-128x128 is-inline-block">
            <img src="${est.avatar}" alt="${est.nombre}" style="object-fit: cover; border-radius: 50%;">
          </figure>
        </div>
        <div class="card-content has-text-centered">
          <p class="title is-5">${est.nombre}</p>
          <p class="subtitle is-6">${est.carrera} - ${est.seniority}</p>
          <div class="buttons is-centered mt-3">
            <button class="button is-warning btn-edit" data-id="${est.id}">Editar</button>
            <button class="button is-danger btn-delete" data-id="${est.id}">Eliminar</button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}