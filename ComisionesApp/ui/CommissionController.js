// ui/CommissionController.js
// Única responsabilidad: leer el DOM, llamar al servicio y renderizar el resultado.
// No contiene lógica de negocio.

import { CommissionRequest } from '../Models/CommissionRequest.js';
import { CommissionService  } from '../Services/CommissionService.js';

/**
 * Controlador responsable de gestionar las interacciones de la interfaz de usuario, leer del DOM,
 * llamar a CommissionService y renderizar los resultados.
 */
export class CommissionController {
  /** @type {CommissionService} */
  #service;
  /** @type {Object<string, HTMLElement>} */
  #elements;

  /**
   * Crea una nueva instancia de CommissionController.
   */
  constructor() {
    this.#service = new CommissionService();
    this.#elements = {
      form:        document.getElementById('commissionForm'),
      country:     document.getElementById('country'),
      totalSales:  document.getElementById('totalSales'),
      discounts:   document.getElementById('discounts'),
      resultCard:  document.getElementById('resultCard'),
      errorBanner: document.getElementById('errorBanner'),
    };
  }

  /**
   * Inicializa el controlador, llena el selector de países y configura los "event listeners".
   */
  init() {
    this.#populateCountries();
    this.#elements.form.addEventListener('submit', e => this.#handleSubmit(e));
    this.#elements.form.querySelectorAll('select, input').forEach(el => {
      el.addEventListener('input', () => this.#clearFieldError(el));
    });
  }

  // ── Privados ──────────────────────────────────────────

  /**
   * Llena el menú desplegable de selección de país con los países disponibles.
   */
  #populateCountries() {
    const select = this.#elements.country;
    const countries = this.#service.getCountries();

    countries.forEach(({ code, name, flag }) => {
      const option = document.createElement('option');
      option.value       = code;
      option.textContent = `${flag} ${name}`;
      select.appendChild(option);
    });
  }

  /**
   * Maneja el envío del formulario, valida la entrada y desencadena el cálculo.
   * @param {Event} e - El evento de envío del formulario.
   */
  #handleSubmit(e) {
    e.preventDefault();
    this.#clearErrors();

    const request = new CommissionRequest(
      this.#elements.country.value,
      this.#elements.totalSales.value,
      this.#elements.discounts.value,
    );

    const errors = request.validate();
    if (errors.length > 0) {
      this.#showErrors(request);
      return;
    }

    try {
      const result = this.#service.calculate(request);
      this.#renderResult(result);
    } catch (err) {
      this.#showBanner(err.message);
    }
  }

  /**
   * Renderiza el resultado del cálculo en el DOM.
   * @param {CommissionResult} result - El resultado del cálculo de la comisión a renderizar.
   */
  #renderResult(result) {
    document.getElementById('resCountry').textContent  = `${result.flag} ${result.country} — ${result.ratePercent}`;
    document.getElementById('resBase').textContent     = result.baseFmt;
    document.getElementById('resRate').textContent     = result.ratePercent;
    document.getElementById('resAmount').textContent   = result.commissionFmt;
    document.getElementById('resFormula').textContent  = result.formula;

    const card = this.#elements.resultCard;
    card.classList.remove('visible');
    void card.offsetWidth; // fuerza reflow para reiniciar animación
    card.classList.add('visible');
  }

  /**
   * Resalta los campos que fallaron en la validación.
   * @param {CommissionRequest} request - La solicitud que falló en la validación.
   */
  #showErrors(request) {
    const fields = {
      country:    !request.country,
      totalSales: isNaN(request.totalSales) || request.totalSales <= 0,
      discounts:  request.discounts < 0 || request.discounts >= request.totalSales,
    };

    Object.entries(fields).forEach(([name, hasError]) => {
      const el = this.#elements[name];
      el.closest('.field')?.classList.toggle('invalid', hasError);
    });
  }

  /**
   * Borra el estado de error de validación de un campo específico.
   * @param {HTMLElement} el - El elemento de entrada del cual borrar el error.
   */
  #clearFieldError(el) {
    el.closest('.field')?.classList.remove('invalid');
    this.#elements.errorBanner.classList.remove('visible');
  }

  /**
   * Borra todos los errores de validación y oculta el banner de error.
   */
  #clearErrors() {
    document.querySelectorAll('.field.invalid').forEach(f => f.classList.remove('invalid'));
    this.#elements.errorBanner.classList.remove('visible');
  }

  /**
   * Muestra el banner de error con un mensaje específico.
   * @param {string} message - El mensaje de error a mostrar.
   */
  #showBanner(message) {
    this.#elements.errorBanner.textContent = message;
    this.#elements.errorBanner.classList.add('visible');
  }
}