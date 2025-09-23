// Importación de funciones para API, UI, filtros y tema visual
import {
  getEstudiantes,
  createEstudiante,
  deleteEstudiante,
  updateEstudiante
} from './api.js';

import {
  renderEstudiantes,
  toggleLoader,
  showNoResults
} from './ui.js';

import { applyFilters } from './filters.js';
import { initThemeToggle } from './theme.js';

// Referencias a elementos del DOM y variables para controlar edición
document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('resultsContainer');
  const inputNombre = document.getElementById('searchInput');
  const selectCarrera = document.getElementById('filterCareer');
  const selectSeniority = document.getElementById('filterSeniority');
  const btnBuscar = document.getElementById('btnSearch');
  const btnLimpiar = document.getElementById('btnClearFilters');
  const btnOpenAdd = document.getElementById('btnOpenAdd');
  const modal = document.getElementById('studentModal');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnCancelModal = document.getElementById('btnCancelModal');
  const btnSaveStudent = document.getElementById('btnSaveStudent');

  const inputModalNombre = document.getElementById('inputNombre');
  const inputModalCarrera = document.getElementById('inputCarrera');
  const inputModalSeniority = document.getElementById('inputSeniority');
  const inputModalAvatar = document.getElementById('inputAvatar');

  let estudiantes = [];
  let modoEdicion = false;
  let estudianteEditando = null;

  // Carga inicial de datos y renderizado en pantalla
   initThemeToggle();
  
    toggleLoader(true);
    estudiantes = await getEstudiantes();
    toggleLoader(false);
    renderEstudiantes(estudiantes, container);
    conectarBotones(estudiantes);
  
    // Aplicar filtros y mostrar resultados según lo seleccionado
     btnBuscar.addEventListener('click', () => {
        const filtrados = applyFilters(
          estudiantes,
          inputNombre.value,
          selectCarrera.value,
          selectSeniority.value
        );
        renderEstudiantes(filtrados, container);
        conectarBotones(filtrados);
        showNoResults(filtrados.length === 0);
      });
    
     btnLimpiar.addEventListener('click', () => {
        inputNombre.value = '';
        selectCarrera.value = '';
        selectSeniority.value = '';
        renderEstudiantes(estudiantes, container);
        conectarBotones(estudiantes);
        showNoResults(false);
      });

     btnOpenAdd.addEventListener('click', () => {
        modoEdicion = false;
        estudianteEditando = null;
        limpiarModal();
        modal.classList.add('is-active');
      });



});
