// Datos de los indicadores económicos (diferencias en diferencias)
const indicatorsData = {
    pib: {
        name: "PIB per Cápita",
        description: "Compara el crecimiento económico de Colombia vs OCDE durante cada gobierno. Un resultado positivo indica que Colombia creció más que el promedio OCDE en ese período.",
        duque: {
            colombia: 7.9,
            ocde: 5.1,
            did: 2.8
        },
        petro: {
            colombia: 0.2,
            ocde: 2.3,
            did: -2.1
        }
    },
    desempleo: {
        name: "Desempleo",
        description: "Compara los cambios en desempleo de Colombia vs OCDE durante cada gobierno. Un resultado negativo indica que Colombia redujo más el desempleo que el promedio OCDE.",
        duque: {
            colombia: 1.1,
            ocde: -0.5,
            did: 1.6
        },
        petro: {
            colombia: -0.9,
            ocde: -0.1,
            did: -0.8
        }
    },
    inflacion: {
        name: "Inflación",
        description: "Compara los cambios en inflación de Colombia vs OCDE durante cada gobierno. Un resultado positivo indica que Colombia tuvo mayor incremento inflacionario que el promedio OCDE.",
        duque: {
            colombia: 7.0,
            ocde: 6.3,
            did: 0.7
        },
        petro: {
            colombia: -3.6,
            ocde: -5.4,
            did: 1.8
        }
    },
    deficit: {
        name: "Déficit Fiscal",
        description: "Compara los cambios en déficit fiscal de Colombia vs OCDE durante cada gobierno. Un resultado negativo indica que Colombia mejoró más su balance fiscal que el promedio OCDE.",
        duque: {
            colombia: 3.1,
            ocde: 4.6,
            did: -1.5
        },
        petro: {
            colombia: 0.5,
            ocde: -2.5,
            did: 3.0
        }
    },
    gini: {
        name: "Coeficiente GINI",
        description: "Compara los cambios en desigualdad de Colombia vs OCDE durante cada gobierno. Un resultado negativo indica que Colombia redujo más la desigualdad que el promedio OCDE.",
        duque: {
            colombia: 3.9,
            ocde: 0.0,
            did: 3.9
        },
        petro: {
            colombia: -0.5,
            ocde: 0.6,
            did: -1.1
        }
    },
    pobreza: {
        name: "Pobreza",
        description: "Compara los cambios en pobreza de Colombia vs OCDE durante cada gobierno. Un resultado negativo indica que Colombia redujo más la pobreza que el promedio OCDE.",
        duque: {
            colombia: 2.6,
            ocde: 0.5,
            did: 2.1
        },
        petro: {
            colombia: -3.6,
            ocde: 0.5,
            did: -4.1
        }
    },
    seguridad: {
        name: "Inseguridad (Homicidios/100k hab.)",
        description: "Compara los cambios en seguridad ciudadana de Colombia vs OCDE durante cada gobierno. Un resultado negativo indica que Colombia mejoró más su seguridad que el promedio OCDE.",
        duque: {
            colombia: -1.4,
            ocde: 0.0,
            did: -1.4
        },
        petro: {
            colombia: 1.0,
            ocde: 0.0,
            did: 1.0
        }
    },
    mortalidad: {
        name: "Mortalidad Infantil (por 1000 nacidos vivos)",
        description: "Compara los cambios en mortalidad infantil de Colombia vs OCDE durante cada gobierno. Un resultado negativo indica que Colombia redujo más la mortalidad infantil que el promedio OCDE.",
        duque: {
            colombia: -1.0,
            ocde: -0.25,
            did: -0.75
        },
        petro: {
            colombia: 1.0,
            ocde: 0.8,
            did: 0.2
        }
    }
};

// Variables globales
let currentIndicator = 'pib';
let animusDistortion;

// Elementos del DOM
const indicatorButtons = document.querySelectorAll('.indicator-btn');
const currentIndicatorName = document.getElementById('current-indicator-name');
const indicatorDescription = document.getElementById('indicator-description');

// Elementos de Duque
const duqueColombiaValue = document.getElementById('duque-colombia');
const duqueOcdeValue = document.getElementById('duque-ocde');
const duqueDidValue = document.getElementById('duque-did');
const duqueFill = document.getElementById('duque-fill');

// Elementos de Petro
const petroColombiaValue = document.getElementById('petro-colombia');
const petroOcdeValue = document.getElementById('petro-ocde');
const petroDidValue = document.getElementById('petro-did');
const petroFill = document.getElementById('petro-fill');

// Crear efecto Animus de distorsión con el cursor
function createAnimusEffect() {
    animusDistortion = document.createElement('div');
    animusDistortion.className = 'animus-distortion';
    document.body.appendChild(animusDistortion);

    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!isMoving) {
            isMoving = true;
            animusDistortion.style.opacity = '1';
            animusDistortion.style.transform = `translate(${mouseX - 100}px, ${mouseY - 100}px) scale(1)`;
            
            // Efecto de distorsión en el fondo
            document.body.style.setProperty('--mouse-x', mouseX + 'px');
            document.body.style.setProperty('--mouse-y', mouseY + 'px');
            
            setTimeout(() => {
                isMoving = false;
                animusDistortion.style.opacity = '0';
                animusDistortion.style.transform = `translate(${mouseX - 100}px, ${mouseY - 100}px) scale(0.8)`;
            }, 300);
        }
    });

    document.addEventListener('mouseleave', () => {
        animusDistortion.style.opacity = '0';
    });
}

// Función para formatear porcentajes
function formatPercentage(value) {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
}

// Función específica para formatear valores DiD con símbolos de crecimiento/decrecimiento
function formatDidPercentage(value) {
    const symbol = value > 0 ? '↑' : value < 0 ? '↓' : '';
    const sign = value >= 0 ? '+' : '';
    return `${symbol} ${sign}${value.toFixed(1)}%`;
}

// Función para calcular el ancho de la barra basado en el valor DiD
function calculateBarWidth(didValue) {
    // Normalizamos el valor para que esté entre 0 y 50% (la mitad de la barra)
    const maxValue = 5; // Valor máximo esperado para normalización
    const width = Math.min(Math.abs(didValue) / maxValue * 50, 50);
    return Math.max(width, 2); // Mínimo 2% para visibilidad
}

// Función para actualizar la visualización
function updateVisualization(indicator) {
    const data = indicatorsData[indicator];
    
    // Actualizar título y descripción
    currentIndicatorName.textContent = data.name;
    indicatorDescription.textContent = data.description;
    
    // Actualizar datos de Duque
    duqueColombiaValue.textContent = formatPercentage(data.duque.colombia);
    duqueOcdeValue.textContent = formatPercentage(data.duque.ocde);
    duqueDidValue.textContent = formatDidPercentage(data.duque.did);
    
    // Actualizar datos de Petro
    petroColombiaValue.textContent = formatPercentage(data.petro.colombia);
    petroOcdeValue.textContent = formatPercentage(data.petro.ocde);
    petroDidValue.textContent = formatDidPercentage(data.petro.did);
    
    // Actualizar barras de progreso
    updateProgressBar(duqueFill, data.duque.did);
    updateProgressBar(petroFill, data.petro.did);
    
    // Actualizar colores de los porcentajes
    updatePercentageColor(duqueDidValue, data.duque.did);
    updatePercentageColor(petroDidValue, data.petro.did);
    
    // Animar las barras
    setTimeout(() => {
        const duqueWidth = calculateBarWidth(data.duque.did);
        const petroWidth = calculateBarWidth(data.petro.did);
        
        duqueFill.style.width = `${duqueWidth}%`;
        petroFill.style.width = `${petroWidth}%`;
    }, 100);
}

// Función para actualizar una barra de progreso individual
function updateProgressBar(fillElement, didValue) {
    // Resetear la barra
    fillElement.style.width = '0%';
    
    // Remover clases anteriores
    fillElement.classList.remove('positive', 'negative');
    
    // Mantener siempre los colores originales de las barras
    if (fillElement.classList.contains('duque-fill')) {
        fillElement.style.background = 'linear-gradient(135deg, #87ceeb 0%, #5fb3d9 100%)';
    } else if (fillElement.classList.contains('petro-fill')) {
        fillElement.style.background = 'linear-gradient(135deg, #9966cc 0%, #7a4fb8 100%)';
    }
    
    // Agregar clase según el signo del valor
    if (didValue >= 0) {
        fillElement.classList.add('positive');
    } else {
        fillElement.classList.add('negative');
    }
}

// Lista de indicadores donde "menos es mejor" (colores invertidos)
const reversedColorIndicators = ['desempleo', 'inflacion', 'deficit', 'gini', 'pobreza', 'seguridad', 'mortalidad'];

// Función para actualizar el color del porcentaje
function updatePercentageColor(element, value) {
    element.classList.remove('positive', 'negative');
    
    // Determinar si este indicador requiere colores invertidos
    const isReversedIndicator = reversedColorIndicators.includes(currentIndicator);
    
    if (isReversedIndicator) {
        // Para indicadores "malos": positivo = rojo (malo), negativo = verde (bueno)
        if (value >= 0) {
            element.classList.add('negative'); // Rojo para valores positivos (malo)
        } else {
            element.classList.add('positive'); // Verde para valores negativos (bueno)
        }
    } else {
        // Para indicadores "buenos": positivo = verde (bueno), negativo = rojo (malo)
        if (value >= 0) {
            element.classList.add('positive'); // Verde para valores positivos (bueno)
        } else {
            element.classList.add('negative'); // Rojo para valores negativos (malo)
        }
    }
}

// Función para manejar el clic en los botones de indicadores
function handleIndicatorClick(event) {
    // Remover clase activa de todos los botones
    indicatorButtons.forEach(btn => btn.classList.remove('active'));
    
    // Agregar clase activa al botón clickeado
    event.target.classList.add('active');
    
    // Obtener el indicador seleccionado
    const selectedIndicator = event.target.dataset.indicator;
    currentIndicator = selectedIndicator;
    
    // Actualizar la visualización
    updateVisualization(selectedIndicator);
}

// Función para animar la entrada inicial
function animateInitialLoad() {
    const elements = document.querySelectorAll('.president-section, .current-indicator');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Función para manejar la responsividad
function handleResize() {
    // Reajustar las barras si es necesario
    updateVisualization(currentIndicator);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Crear efecto Animus
    createAnimusEffect();
    
    // Agregar event listeners a los botones de indicadores
    indicatorButtons.forEach(button => {
        button.addEventListener('click', handleIndicatorClick);
    });
    
    // Cargar la visualización inicial
    updateVisualization(currentIndicator);
    
    // Animar la carga inicial
    setTimeout(animateInitialLoad, 500);
    
    // Manejar redimensionamiento de ventana
    window.addEventListener('resize', handleResize);
});

// Función para smooth scroll al footer
function scrollToFooter() {
    document.querySelector('.footer').scrollIntoView({
        behavior: 'smooth'
    });
}

// Agregar efectos de hover mejorados
document.addEventListener('DOMContentLoaded', function() {
    // Efecto parallax suave en scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Efecto de iluminación en las barras de progreso
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 30px rgba(255, 255, 255, 0.2)';
        });
        
        bar.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
});

// Función para exportar datos (para desarrollo/debug)
function exportCurrentData() {
    const data = indicatorsData[currentIndicator];
    console.log('Datos actuales:', {
        indicator: currentIndicator,
        data: data
    });
    return data;
}

// Hacer algunas funciones globales para debugging
window.ColombiaStatsApp = {
    updateVisualization,
    exportCurrentData,
    indicatorsData,
    currentIndicator
};
