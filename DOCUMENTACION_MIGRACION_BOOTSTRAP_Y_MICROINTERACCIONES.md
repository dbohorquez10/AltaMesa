# Documentación Técnica: Migración a Bootstrap 5.3.3 y Suite de Microinteracciones
## AltaMesa Restaurant | Experiencia Culinaria Contemporánea

---

## 1. Resumen Ejecutivo de la Migración

La plataforma web de **AltaMesa Restaurant** fue migrada exitosamente a **Bootstrap 5.3.3**, manteniendo de forma íntegra la identidad visual y estética elegante (*Modo Oscuro Gastronómico* con acentos en oro noble `#d4af37`, tipografía editorial `Cinzel` y `Plus Jakarta Sans`, y superficies translúcidas).

### Principales Beneficios de la Migración:
1. **Sistema de Rejilla Responsivo (Grid & Flexbox):** Adaptación perfecta a smartphones, tablets, laptops y pantallas 4K mediante clases estándar (`container`, `row`, `col-*`, `g-4`).
2. **Componentes Oficiales de Bootstrap 5:**
   - **Navbar con Toggler:** Menú colapsable fluido para dispositivos móviles con animación personalizada.
   - **Offcanvas (`#cart-sidebar`):** Sustitución del sidebar casero por el componente oficial de Bootstrap, con soporte de teclado, desenfoque de fondo y gestos táctiles.
   - **Modals (`#dish-customization-dialog` y `#checkout-modal`):** Reemplazo de los elementos nativos `<dialog>` por modales Bootstrap con animación de entrada (`fade`), centrado vertical (`modal-dialog-centered`) y accesibilidad WAI-ARIA.
   - **Toasts (`#altamesa-toast-container`):** Notificaciones dinámicas flotantes no intrusivas para confirmaciones de carrito y reservas.
   - **Form Controls & Form Switches:** Campos estandarizados con soporte para estados de validación nativa y focus ring en oro noble.

---

## 2. Catálogo Detallado de Microinteracciones

A continuación se documenta **cada una de las microinteracciones** implementadas en la plataforma, especificando qué hace, su disparador, su comportamiento visual/táctil y su propósito en la experiencia de usuario (UX):

| # | Nombre de la Microinteracción | Elemento Objetivo | Disparador (Trigger) | Comportamiento Visual & Técnico | Propósito de UX |
|---|---|---|---|---|---|
| **1** | **Efecto Onda Ripple** | Todos los botones (`.btn`, `.btn-gold`, etc.) | Clic o tap del usuario (`pointerdown` / `click`) | Se genera un círculo de luz semitransparente que se expande radialmente (`@keyframes rippleAnimation`) desde las coordenadas exactas `(clientX, clientY)` del clic. | Brinda confirmación táctil inmediata al usuario de que su pulsación fue registrada. |
| **2** | **Partícula Flotante "+1"** | Botón "Añadir" en cada tarjeta de plato | Clic en el botón "Añadir" | Se crea un elemento flotante dorado con el texto `+1` que se eleva 60px y se desvanece (`@keyframes floatUpParticle`) hacia la barra de navegación. | Proporciona retroalimentación visual inmediata conectando la acción del usuario con la suma de un producto. |
| **3** | **Rebote Elástico en Contador del Carrito** | Badge del carrito (`#cart-count`) | Cambio en la cantidad total de platos del carrito | Se aplica una animación de rebote tipo resorte con overshoot (`@keyframes badgeBounce` con curva `cubic-bezier(0.175, 0.885, 0.32, 1.275)`). | Dirige la atención visual del usuario hacia el carrito sin necesidad de alertas molestas. |
| **4** | **Transición Glassmorphic de Navbar al Hacer Scroll** | Barra de navegación (`#navbar`) | Evento `window.scroll` al superar 40px | La barra reduce su altura de 80px a 70px, incrementa su opacidad al 95%, activa un filtro de desenfoque (`backdrop-filter: blur(12px)`) y proyecta un borde inferior dorado sutil. | Optimiza el espacio de lectura de la página mientras mantiene el menú siempre visible y elegante. |
| **5** | **Subrayado Dorado Expansivo en Enlaces** | Enlaces del menú (`.custom-nav-link`) | Hover o estado activo | Una línea dorada con degradado brota desde el centro hacia los extremos (`width: 0%` a `width: 80%`). | Indica claramente el objetivo interactivo y la sección actual de lectura. |
| **6** | **Chips de Categoría con Resorte y Resplandor** | Botones de filtro (`.filter-btn`) | Clic en "Todos", "Entradas", "Fuertes" o "Postres" | El chip activo escala sutilmente (`scale(1.04)`), adquiere fondo oro noble `#d4af37` y emite una sombra de resplandor (`box-shadow: 0 4px 14px var(--accent-glow)`). | Refuerza qué categoría está activa y evita que el usuario se sienta desorientado en la carta. |
| **7** | **Limpiador de Búsqueda con Rotación** | Botón "X" de búsqueda (`#btn-clear-search`) | Entrada de texto en el buscador / Clic en el botón | Aparece solo cuando hay texto escrito. Al hacer hover o clic, gira 90 grados y desvanece el término de búsqueda, devolviendo el foco al input. | Facilita restaurar la búsqueda con un solo clic de forma lúdica y veloz. |
| **8** | **Switches Dietéticos con Deslizamiento Suave** | Switches Vegetariano y Sin Gluten (`#filter-vegetarian-checkbox`, `#filter-gluten-checkbox`) | Cambio de estado (`change`) | La perla deslizante del switch corre con transición suave, iluminándose en color oro brillante al activarse. | Permite a comensales con restricciones dietéticas filtrar al instante con satisfacción táctil. |
| **9** | **Elevación 3D y Zoom de Imagen en Tarjetas** | Tarjetas de platos (`.dish-card`) | Hover del cursor | La tarjeta se eleva 6px (`translateY(-6px)`), proyecta una sombra profunda con aura dorada, y la fotografía del plato realiza un zoom suave de 8% (`scale(1.08)`). | Despierta el apetito visual y destaca la tarjeta sobre la que el cliente está considerando pedir. |
| **10** | **Checkboxes de Exclusiones con Resorte y Highlight** | Opciones en modal de personalización (`.custom-checkbox-container`) | Clic en una exclusión culinaria | El checkmark salta con un rebote elástico (`scale(1.1)`), proyecta sombra dorada y la fila completa se ilumina con fondo dorado tenue (`--accent-subtle`). | Confirmación inequívoca de las notas y exclusiones que se enviarán a cocina. |
| **11** | **Barra de Progreso a Beneficio VIP del Chef** | Barra en el carrito (`#cart-reward-progress-bar`) | Actualización del subtotal del carrito | Se anima la anchura de la barra con franjas animadas. Si el subtotal supera $120.000 COP, cambia de dorado a verde esmeralda y muestra *"¡Obsequio Gourmet Desbloqueado! 🍾"*. | Gamificación de la compra: incentiva a los comensales a agregar platos para obtener un postre o copa de cortesía. |
| **12** | **Desvanecimiento y Colapso al Eliminar Ítems** | Fila de producto en el carrito (`.cart-item`) | Clic en el botón eliminar o restar a 0 | El ítem se desplaza 60px a la derecha, colapsa su altura a 0 y desaparece suavemente en 320ms antes de ser retirado del `localStorage`. | Evita brincos o saltos bruscos en la lista de compras del cliente. |
| **13** | **Selector de Método de Pago con Tarjetas Iluminadas** | Opciones Efectivo / Tarjeta (`.payment-option-bs`) | Clic en el método deseado | La opción seleccionada se eleva 2px, adquiere borde oro y resplandor dorado, mientras conmuta los campos de tarjeta o la nota de efectivo. | Claridad inmediata sobre cómo pagará el cliente su orden. |
| **14** | **Detección Dinámica de Franquicia de Tarjeta** | Badge de franquicia (`#card-brand-badge`) | Escritura en el número de tarjeta (`input`) | Evalúa el número: si inicia con `4` muestra **VISA** en azul; con `51-55` o `22-27` muestra **Mastercard** en naranja; con `34/37` muestra **American Express** en cian. | Da seguridad y confianza al comensal de que su tarjeta fue identificada correctamente. |
| **15** | **Formateo Automático de Tarjeta (Espaciado y Máscaras)** | Campos de tarjeta (`#checkout-card-number`, `#checkout-card-expiry`) | Entrada de texto | Agrupa el número en bloques de 4 dígitos (`XXXX XXXX XXXX XXXX`) y la fecha en formato `MM/AA`. | Reduce drásticamente los errores de digitación de pagos. |
| **16** | **Sacudida (Shake) de Campos Inválidos** | Inputs requeridos de reserva y checkout | Intento de envío con datos incompletos | El campo vibra horizontalmente (`@keyframes fieldShake`) y se colorea de rojo carmesí con glow de alerta. | Indica al instante qué campo específico requiere atención sin mensajes confusos. |
| **17** | **Estado de Carga con Spinner en Botón de Pago** | Botón de Checkout (`#btn-confirm-checkout`) | Envío válido del formulario | El botón se desactiva y muestra un spinner giratorio de Bootstrap con el texto *"Procesando pago seguro 256-bit..."*. | Evita dobles clics accidentales y transmite seguridad financiera. |
| **18** | **Celebración con Lluvia de Confeti** | Pantalla de confirmación de pago | Transacción exitosa | Se genera un lienzo dinámico (`<canvas>`) con 90 partículas de confeti en oro, blanco y esmeralda con física de gravedad. | Genera un momento memorable y festivo tras realizar la compra. |
| **19** | **Dibujo SVG del Sello de Verificación** | Icono de éxito en reservas y pedidos (`.checkmark-svg`) | Confirmación exitosa | El círculo y el checkmark se dibujan progresivamente mediante trazo vectorial animado (`stroke-dashoffset`). | Refuerza la sensación de orden y reserva oficial certificada. |
| **20** | **Previsualización en Vivo del Ticket de Reserva** | Caja de ticket (`#reservation-preview-box`) | Escritura en los inputs de reserva | A medida que el cliente ingresa su nombre, cantidad de personas, fecha y hora, un ticket interactivo actualiza en tiempo real los datos del comensal. | El cliente valida exactamente lo que está agendando antes de hacer clic en enviar. |
| **21** | **Detección y Resaltado del Día de la Semana** | Horarios en ubicación (`#schedule-card`) | Carga de la página | Identifica el día actual (ej: Martes, Viernes, Domingo) y resalta esa fila con fondo dorado tenue y una etiqueta *"Hoy"*. Si es Lunes, avisa que está cerrado. | Respuesta instantánea a la duda más frecuente: *"¿Están abiertos hoy?"*. |
| **22** | **Botón Flotante "Volver Arriba"** | Botón flotante (`#btn-scroll-top`) | Scroll superior a 350px / Clic | Emerge con elevación en la esquina inferior derecha; al pulsarlo, desplaza suavemente la vista hasta la cima de la página. | Mejora la usabilidad en dispositivos móviles y páginas de alto contenido. |
| **23** | **Notificaciones Toast Flotantes** | Contenedor de Toasts (`#altamesa-toast-container`) | Acciones del usuario (Añadir plato, eliminar, validar) | Se desliza desde la derecha con el icono correspondiente y se auto-destruye suavemente tras 3.5 segundos. | Información concisa y no intrusiva de los eventos del sistema. |
| **24** | **Desenfoque y Nublado Óptico de Fondo en Subventanas** | Fondo del sitio (`.offcanvas-backdrop`, `.modal-backdrop`, `body.subwindow-active`) | Apertura del carrito o de cualquier ventana modal (plato, checkout) | Al desplegarse el offcanvas del carrito o modales, el fondo completo se atenúa y se nubla con filtro `backdrop-filter: blur(12px) saturate(135%) brightness(0.6)` y suavizado de contenido, destacando la subventana en primer plano con nitidez total. | Concentra la atención del usuario en el carrito/modal, reduce distracciones visuales y aporta una estética de app de lujo. |
| **25** | **Divisores y Separadores Ornamentales de Sección** | Límites entre Hero, Menú, Reservas, Ubicación y Footer | Scroll y navegación por la página | Insignias interactivas flotantes (`.section-divider-ornament`), destellos de gemas, halos de luz dorada (`.section::before`) y gradientes diferenciados por sección. | Marca de forma nítida la transición entre secciones de la página, eliminando la sensación de bloque plano y organizando la experiencia. |

---

## 3. Arquitectura de Archivos Modificados

- **`index.html`**:
  - Incorporación de CDNs de Bootstrap 5.3.3 CSS, Bootstrap Icons 1.11.3 y Bootstrap 5.3.3 JS Bundle.
  - Implementación del atributo `data-bs-theme="dark"`.
  - Estructuración de Navbar con `navbar-expand-lg` y botón toggler móvil.
  - Integración de Rejilla Bootstrap (`row`, `col-12 col-md-6 col-lg-4 col-xl-3`, `g-4`).
  - Conversión del Sidebar a **Bootstrap 5 Offcanvas** (`#cart-sidebar`).
  - Conversión de modales a **Bootstrap 5 Modals** (`#dish-customization-dialog` y `#checkout-modal`).
  - Contenedor flotante de **Bootstrap Toasts** (`#altamesa-toast-container`).
  - Botón flotante para retorno rápido al inicio (`#btn-scroll-top`).

- **`styles.css`**:
  - Definición completa del Design System en variables CSS nativas.
  - Integración armónica sobre Bootstrap sin perder los tonos dorados `#d4af37` ni el contraste negro carbón `#111111`.
  - Hojas de keyframes dedicadas para cada animación (`@keyframes rippleAnimation`, `@keyframes floatUpParticle`, `@keyframes badgeBounce`, `@keyframes fieldShake`, `@keyframes strokeCircle`, etc.).
  - Estilos de accesibilidad, contrastes altos y tipografías `Cinzel` y `Plus Jakarta Sans`.

- **`app.js`**:
  - Inicialización limpia de las APIs de Bootstrap 5 (`bootstrap.Modal`, `bootstrap.Offcanvas`, `bootstrap.Toast`).
  - Algoritmo de filtrado reactivo combinado (texto, categorías, vegetariano, celíaco y orden por precio).
  - Gestor de eventos de microinteracciones táctiles y sonoras-visuales.
  - Motor de confeti en `<canvas>` de alto rendimiento.
  - Formateo y validación de tarjetas bancarias en tiempo real con detección de franquicias.
  - Persistencia segura en `localStorage` con claves `altamesa_cart_items` y `altamesa_reservations`.

---

## 4. Guía de Pruebas de Microinteracciones

1. **Prueba de Carrito y Partícula Flotante:**
   - Ve a la sección *"Nuestra Carta"*.
   - Haz clic en *"Añadir"* sobre cualquier plato: observa la partícula dorada `+1` volar hacia arriba, el toast inferior aparecer y el contador del carrito rebotar elásticamente.
2. **Prueba de Barra de Meta VIP:**
   - Abre el carrito y agrega varios platos hasta superar los $120.000 COP: la barra se llenará dinámicamente y celebrará el desbloqueo del beneficio VIP.
3. **Prueba de Detección de Tarjeta:**
   - Haz clic en *"Proceder al Pago"*, selecciona *"Tarjeta Débito / Crédito"*.
   - Digita un número que empiece por `4`: observa cómo el badge cambia a **VISA**. Si digitas `51`, cambiará a **Mastercard**.
4. **Prueba de Validación con Sacudida:**
   - Intenta hacer clic en *"Confirmar Reserva de Mesa"* dejando el campo de nombre vacío: el campo vibrará con animación de sacudida y borde rojo carmesí.
5. **Prueba de Ticket en Tiempo Real:**
   - En el formulario de reservas, escribe tu nombre y fecha: observa cómo el recuadro inferior dibuja tu ticket en tiempo real.
