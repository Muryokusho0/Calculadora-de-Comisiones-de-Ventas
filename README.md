# 🧮 Calculadora de Comisiones de Ventas

Aplicación web que permite a los vendedores calcular su comisión mensual según el país en el que operan y sus ventas totales.

---

## 📋 Descripción

La aplicación aplica automáticamente la tasa de comisión correspondiente al país seleccionado, descontando los descuentos aplicados a las ventas. El resultado muestra la base de cálculo, la tasa aplicada, la fórmula y el monto final de la comisión.

---

## 🌍 Reglas de negocio

| País           | Tasa | Fórmula                                      |
|----------------|------|----------------------------------------------|
| 🇮🇳 India       | 10%  | (Ventas Totales − Descuentos) × 10%          |
| 🇺🇸 Estados Unidos | 15% | (Ventas Totales − Descuentos) × 15%       |
| 🇬🇧 Reino Unido | 12%  | (Ventas Totales − Descuentos) × 12%          |

---

## 🗂️ Estructura del proyecto

```
comisiones-js/
├── models/
│   ├── CommissionRequest.js    # Datos de entrada + validaciones
│   └── CommissionResult.js     # Resultado inmutable del cálculo
├── rules/
│   └── CommissionRules.js      # Tasas de comisión por país
├── services/
│   └── CommissionService.js    # Lógica de negocio pura
├── ui/
│   └── CommissionController.js # Manejo del DOM y la interfaz
├── main.js                     # Punto de entrada
├── index.html                  # Estructura HTML
└── style.css                   # Estilos
```

---

## 🏗️ Arquitectura

El proyecto sigue una **arquitectura en capas** con separación clara de responsabilidades:

```
┌─────────────────────────────────┐
│        Capa de presentación     │  index.html · style.css
│    CommissionController.js      │  Maneja el DOM, sin lógica de negocio
├─────────────────────────────────┤
│      Capa de lógica de negocio  │  CommissionService.js
│                                 │  Calcula la comisión y valida los datos
├─────────────────────────────────┤
│          Capa de datos          │  CommissionRules.js
│                                 │  Configuración de tasas por país
│                                 │  CommissionRequest / CommissionResult
└─────────────────────────────────┘
```

**Principios aplicados:**
- **SRP** — cada clase tiene una única responsabilidad
- **OCP** — para agregar un país nuevo solo se modifica `CommissionRules.js`
- **Inmutabilidad** — `CommissionResult` usa `Object.freeze()` para evitar modificaciones accidentales
- **Separación de capas** — la UI no contiene lógica de negocio y la lógica no conoce el DOM

---

## 🚀 Cómo ejecutar

### Opción A — Live Server (recomendado)

1. Instala la extensión **Live Server** en VS Code
2. Abre la carpeta del proyecto en VS Code
3. Clic derecho en `index.html` → **Open with Live Server**
4. La app abre en `http://127.0.0.1:5500`

### Opción B — Abrir directo en el navegador

1. Descarga o clona el repositorio
2. Abre el archivo `index.html` directamente en el navegador

> **Nota:** No requiere instalar Node.js, npm ni ninguna dependencia externa.

---

## 💻 Tecnologías utilizadas

| Tecnología   | Uso                        |
|--------------|----------------------------|
| HTML5        | Estructura de la interfaz  |
| CSS3         | Estilos y animaciones      |
| JavaScript   | Lógica de negocio y UI     |

---

## 📸 Captura de la aplicación

![Calculadora de Comisiones](screenshot.png)

---

## 📁 Módulos explicados

### `CommissionRules.js`
Fuente única de verdad para las tasas de comisión. Para agregar un nuevo país basta con añadir una entrada en el array `CommissionRules`.

### `CommissionRequest.js`
Modelo de entrada con validaciones integradas. Verifica que el país esté seleccionado, que las ventas sean mayores a 0 y que los descuentos no superen las ventas.

### `CommissionResult.js`
Modelo de salida inmutable. Contiene propiedades calculadas como `ratePercent`, `commissionFmt` y `formula` listas para mostrar en la UI.

### `CommissionService.js`
Servicio de lógica de negocio puro. Recibe un `CommissionRequest`, aplica la regla del país y devuelve un `CommissionResult`. No conoce nada del DOM.

### `CommissionController.js`
Controlador de UI. Su única responsabilidad es leer los valores del formulario, llamar al servicio y renderizar el resultado en el DOM.

---

## 👤 Autor

Desarrollado como parte del caso de negocio: **Calculadora de Comisiones de Ventas**.