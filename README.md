# ColombiaStats Dashboard

Un **Dashboard Interactivo de Análisis Económico Comparativo** para Colombia, que utiliza la metodología de Diferencias en Diferencias (DiD) para evaluar el desempeño relativo de 8 indicadores clave durante los gobiernos de Iván Duque (2018-2022) y Gustavo Petro (2022-2024), en comparación con el promedio de la OCDE.

## 📌 Características

- Visualización dinámica de 8 indicadores económicos:
  - PIB per cápita
  - Desempleo
  - Inflación
  - Déficit Fiscal
  - Coeficiente GINI
  - Pobreza
  - Inseguridad (Homicidios por 100k habitantes)
  - Mortalidad Infantil (por 1000 nacidos vivos)
- Cálculo automatizado de **Diferencias en Diferencias (DiD)** para cada indicador
- Código de colores intuitivo (verde/rojo) según desempeño relativo
- Iconos SVG vectoriales personalizados para cada indicador
- Diseño responsivo y animaciones estilo Animus 3.0
- Fuentes de datos oficiales: DANE, Banco Mundial, OCDE, OMS, MinSalud, MinDefensa, DatosMacro

## 🚀 Tecnologías

- HTML5 & CSS3
- JavaScript (Vanilla JS)
- SVG para iconografía
- Animaciones CSS avanzadas (matrix y pulsos)

## 🎯 Instalación y Uso

1. Clona este repositorio:
   ```bash
   git clone https://github.com/XxHurtadoxX/ColombiaStats.git
   ```
2. Accede a la carpeta del proyecto:
   ```bash
   cd ColombiaStats
   ```
3. Abre `index.html` en tu navegador preferido:
   ```bash
   $BROWSER index.html
   ```

## 📂 Estructura del Proyecto

```
ColombiaStats/
├─ index.html       # Página principal del dashboard
├─ styles.css       # Estilos y animaciones
├─ script.js        # Lógica de datos y cálculos DiD
├─ README.md        # Documentación del proyecto
└─ assets/          # (Opcional) Imágenes o recursos adicionales
```

## 📊 Metodología DiD

La técnica de **Diferencias en Diferencias** compara el cambio en un indicador para Colombia entre dos periodos presidenciales contra el cambio en el mismo indicador para un grupo de control (OCDE). Esto ayuda a aislar el efecto de las políticas internas frente a tendencias globales.

## 🗂 Fuentes de Datos

- DANE (Colombia)
- Banco Mundial
- OCDE
- OMS
- Ministerio de Salud y Protección Social
- Ministerio de Defensa Nacional
- DatosMacro

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor abre un _issue_ o un _pull request_.

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
