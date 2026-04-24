
import { findRuleByCode, CommissionRules } from '../Rules/CommissionRules.js';
import { CommissionResult } from '../Models/CommissionResult.js';

/**
 * Servicio responsable de realizar los cálculos de comisión.
 */
export class CommissionService {

  /**
   * Obtiene la lista de reglas de comisión disponibles (países).
   * @returns {Array<{code: string, name: string, flag: string, rate: number}>} Los países y reglas soportados.
   */
  getCountries() {
    return CommissionRules;
  }

  /**
   * Calcula la comisión basada en la solicitud proporcionada.
   * @param {CommissionRequest} request - La solicitud que contiene los datos de ventas y el país.
   * @returns {CommissionResult} El resultado de la comisión calculada.
   * @throws {Error} Si la solicitud es inválida o el país no está soportado.
   */
  calculate(request) {
    const errors = request.validate();
    if (errors.length > 0) {
      throw new Error(errors[0]);
    }

    const rule = findRuleByCode(request.country);
    if (!rule) {
      throw new Error(`País no soportado: "${request.country}".`);
    }

    const base       = request.totalSales - request.discounts;
    const commission = base * rule.rate;

    return new CommissionResult({
      country:    rule.name,
      flag:       rule.flag,
      rate:       rule.rate,
      totalSales: request.totalSales,
      discounts:  request.discounts,
      base,
      commission,
    });
  }
}