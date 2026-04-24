
/**
 * Representa el resultado del cálculo de una comisión.
 */
export class CommissionResult {
  /**
   * Crea una nueva instancia de CommissionResult.
   * @param {Object} params - Los parámetros de inicialización.
   * @param {string} params.country - El nombre del país.
   * @param {string} params.flag - La bandera en emoji del país.
   * @param {number} params.rate - La tasa de comisión.
   * @param {number} params.totalSales - El monto total de ventas.
   * @param {number} params.discounts - Los descuentos totales aplicados.
   * @param {number} params.base - El monto base utilizado para el cálculo (ventas - descuentos).
   * @param {number} params.commission - El monto de la comisión calculada.
   */
  constructor({ country, flag, rate, totalSales, discounts, base, commission }) {
    this.country    = country;
    this.flag       = flag;
    this.rate       = rate;
    this.totalSales = totalSales;
    this.discounts  = discounts;
    this.base       = base;
    this.commission = commission;

    Object.freeze(this);
  }

  /** @returns {string} La tasa de comisión formateada (ej. "15%"). */
  get ratePercent()    { return `${this.rate * 100}%`; }
  get commissionFmt()  { return this.#formatCurrency(this.commission); }
  get baseFmt()        { return this.#formatCurrency(this.base); }
  get totalSalesFmt()  { return this.#formatCurrency(this.totalSales); }
  get discountsFmt()   { return this.#formatCurrency(this.discounts); }

  /** @returns {string} La fórmula de cálculo completa formateada como cadena de texto. */
  get formula() {
    return `(${this.totalSalesFmt} − ${this.discountsFmt}) × ${this.ratePercent} = ${this.commissionFmt}`;
  }

  #formatCurrency(value) {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
  }
}