
/**
 * Representa una solicitud para calcular una comisión.
 */
export class CommissionRequest {
  /**
   * Crea una nueva instancia de CommissionRequest.
   * @param {string} country - El código del país.
   * @param {number|string} totalSales - El monto total de ventas.
   * @param {number|string} [discounts=0] - Los descuentos totales aplicados.
   */
  constructor(country, totalSales, discounts = 0) {
    this.country    = country;
    this.totalSales = parseFloat(totalSales);
    this.discounts  = parseFloat(discounts) || 0;
  }

  /**
   * Valida los datos de la solicitud de comisión.
   * @returns {string[]} Un arreglo de mensajes de error de validación. Vacío si es válido.
   */
  validate() {
    const errors = [];

    if (!this.country)
      errors.push('Selecciona un país.');

    if (isNaN(this.totalSales) || this.totalSales <= 0)
      errors.push('Las ventas deben ser mayores a 0.');

    if (this.discounts < 0)
      errors.push('Los descuentos no pueden ser negativos.');

    if (this.discounts >= this.totalSales)
      errors.push('Los descuentos no pueden igualar o superar las ventas.');

    return errors;
  }

  /**
   * Verifica si la solicitud es válida.
   * @returns {boolean} Verdadero si la solicitud es válida, falso en caso contrario.
   */
  isValid() {
    return this.validate().length === 0;
  }
}