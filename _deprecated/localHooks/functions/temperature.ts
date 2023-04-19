import extend from '../utils/logger'
const log = extend('temperature')

/**
 * Convert temperatures
 * 
 * @param {number}
 * @returns converted temperature
 * 
 * @example
 * import t from './temperature.js'
 * 
 * 
 * 
 * let t_1 = t.c_f(100) // 212
 * let t_2 = t.fromCelsius.toFahrenheit(100) // 212
 * let formula = t.formulas.c_f // 'T(°F) = T(°C) × 1.8 + 32'
 */

const temperature = {
    fromCelsius: {
        toFahrenheit:   (c: number) => c * 1.8 + 32,
        toKelvin:       (c: number) => c + 273.15,
        toRankine:      (c: number) => (c + 273.15) * 1.8
    },

    fromFahrenheit: {
        toCelsius:      (f: number) => (f - 32) / 1.8,
        toKelvin:       (f: number) => (f + 459.67) * (5/9),
        toRankine:      (f: number) => f + 459.67
    },

    fromKelvin:{
        toFahrenheit:   (k: number) => k * 1.8 - 459.67,
        toCelsius:      (k: number) => k - 273.15,
        toRankine:      (k: number) => k * 1.8
    },

    fromRankine: {
        toCelsius:      (r: number) => (r - 491.67) * (5/9),
        toKelvin:       (r: number) => r * (5/9),
        toFahrenheit:   (r: number) => r - 459.67
    },

    c_f: (t: number) => temperature.fromCelsius.toFahrenheit(t),
    c_k: (t: number) => temperature.fromCelsius.toKelvin(t),
    c_r: (t: number) => temperature.fromCelsius.toRankine(t),

    f_c: (t: number) => temperature.fromFahrenheit.toCelsius(t),
    f_k: (t: number) => temperature.fromFahrenheit.toKelvin(t),
    f_r: (t: number) => temperature.fromFahrenheit.toRankine(t),

    k_f: (t: number) => temperature.fromKelvin.toFahrenheit(t),
    k_c: (t: number) => temperature.fromKelvin.toCelsius(t),
    k_r: (t: number) => temperature.fromKelvin.toRankine(t),

    r_c: (t: number) => temperature.fromRankine.toCelsius(t),
    r_k: (t: number) => temperature.fromRankine.toKelvin(t),
    r_f: (t: number) => temperature.fromRankine.toFahrenheit(t),

    formulas: {
        c_f: `T(°F) = T(°C) × 1.8 + 32`,
        c_k: `T(K) = T(°C) + 273.15`,
        c_r: `T(°R) = (T(°C) + 273.15) × 1.8`,
        k_f: `T(°F) = T(K) × 1.8 - 459.67`,
        k_c: `T(°C) = T(K) - 273.15`,
        k_r: `T(°R) = T(K) × 1.8`,
        f_c: `T(°C) = (T(°F) - 32) / 1.8`,
        f_k: `T(K) = (T(°F) + 459.67)× 5/9`,
        f_r: `T(°R) = T(°F) + 459.67`,
        r_c: `T(°C) = (T(°R) - 491.67) × 5/9`,
        r_f: `T(°F) = T(°R) - 459.67`,
        r_k: `T(K) = T(°R) × 5/9`,

    }
}

// log(temperature.c_f(100))
// log(temperature.fromCelsius.toFahrenheit(100))
// log(temperature.formulas.c_f)

export default temperature