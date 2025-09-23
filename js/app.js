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