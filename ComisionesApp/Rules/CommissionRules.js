
/**
 * Un arreglo inmutable que contiene las reglas de comisión soportadas para diferentes países.
 * @type {Array<{code: string, name: string, flag: string, rate: number}>}
 */
export const CommissionRules = Object.freeze([
  { code: 'India', name: 'India',          flag: '🇮🇳', rate: 0.10 },
  { code: 'US',    name: 'Estados Unidos', flag: '🇺🇸', rate: 0.15 },
  { code: 'UK',    name: 'Reino Unido',    flag: '🇬🇧', rate: 0.12 },
]);

/**
 * Busca una regla de comisión por su código de país.
 * @param {string} code - El código de país a buscar (ej. 'US', 'India').
 * @returns {Object|null} El objeto de la regla si se encuentra, o nulo si no.
 */
export function findRuleByCode(code) {
  return CommissionRules.find(r => r.code === code) ?? null;
}

/**
 * Verifica si un código de país dado es soportado.
 * @param {string} code - El código de país a verificar.
 * @returns {boolean} Verdadero si el país es soportado, falso en caso contrario.
 */
export function isCountrySupported(code) {
  return findRuleByCode(code) !== null;
}