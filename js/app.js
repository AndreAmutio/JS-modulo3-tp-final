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

      btnCloseModal.addEventListener('click', cerrarModal);
        btnCancelModal.addEventListener('click', cerrarModal);
      
    // Validar campos y guardar estudiante (nuevo o editado)
        btnSaveStudent.addEventListener('click', async () => {
          const datos = {
            nombre: inputModalNombre.value,
            carrera: inputModalCarrera.value,
            seniority: inputModalSeniority.value,
            avatar: inputModalAvatar.value
          };
      
          if (!datos.nombre || !datos.carrera || !datos.avatar) {
            alert('Por favor completá todos los campos obligatorios.');
            return;
          }
      
          toggleLoader(true);
      
          if (modoEdicion && estudianteEditando) {
            await updateEstudiante(estudianteEditando.id, datos);
          } else {
            await createEstudiante(datos);
          }
      
          estudiantes = await getEstudiantes();
          toggleLoader(false);
          cerrarModal();
          renderEstudiantes(estudiantes, container);
          conectarBotones(estudiantes);
        });

   // Conectar botones de edición y eliminación a cada card

   function conectarBotones(estudiantes) {
       document.querySelectorAll('.btn-edit').forEach(btn => {
         btn.addEventListener('click', () => {
           const id = btn.dataset.id;
           const estudiante = estudiantes.find(e => e.id === id);
   
           inputModalNombre.value = estudiante.nombre;
           inputModalCarrera.value = estudiante.carrera;
           inputModalSeniority.value = estudiante.seniority;
           inputModalAvatar.value = estudiante.avatar;
   
           modoEdicion = true;
           estudianteEditando = estudiante;
           modal.classList.add('is-active');
         });
       });
   
       document.querySelectorAll('.btn-delete').forEach(btn => {
         btn.addEventListener('click', async () => {
           const id = btn.dataset.id;
           if (confirm('¿Estás segura de que querés eliminar este estudiante?')) {
             toggleLoader(true);
             await deleteEstudiante(id);
             estudiantes = await getEstudiantes();
             toggleLoader(false);
             renderEstudiantes(estudiantes, container);
             conectarBotones(estudiantes);
           }
         });
       });
     }  

  // Cerrar modal y resetear campos del formulario

    function cerrarModal() {
    modal.classList.remove('is-active');
    modoEdicion = false;
    estudianteEditando = null;
    limpiarModal();
  }

  function limpiarModal() {
    inputModalNombre.value = '';
    inputModalCarrera.value = '';
    inputModalSeniority.value = 'Junior';
    inputModalAvatar.value = '';
  }
});
