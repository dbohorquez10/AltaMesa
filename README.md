# 🍽️ AltaMesa — Experiencia Culinaria Premium

AltaMesa es una página web diseñada para un restaurante de alta cocina contemporánea, enfocada en ofrecer una experiencia digital elegante, intuitiva y funcional. El proyecto permite explorar el menú, personalizar platos, gestionar pedidos y simular reservas de mesa desde una interfaz moderna.

La aplicación combina diseño visual sofisticado con funcionalidades interactivas para facilitar la navegación y mejorar la experiencia del usuario.

## ✨ Características principales

- **Página de inicio:** presentación del restaurante con una identidad visual elegante y acceso rápido a las principales secciones.
- **Menú interactivo:** visualización de platos organizados por categorías.
- **Búsqueda de platos:** búsqueda por nombre o ingredientes.
- **Filtros por categoría:** navegación entre entradas, platos fuertes y postres.
- **Filtros alimentarios:** opciones para consultar platos vegetarianos y sin gluten.
- **Ordenamiento de precios:** organización de los platos de menor a mayor precio o viceversa.
- **Personalización de platos:** selección de preferencias y exclusiones antes de agregar un plato al carrito.
- **Carrito de pedidos:** visualización y gestión de los productos seleccionados.
- **Proceso de compra:** formulario para ingresar los datos de entrega y seleccionar un método de pago.
- **Reservas de mesa:** formulario para registrar nombre, fecha, hora, cantidad de personas y solicitudes especiales.
- **Ubicación y contacto:** información de la sede, mapa interactivo, horarios de atención y servicios disponibles.
- **Diseño adaptable:** interfaz diseñada para facilitar la navegación en distintos dispositivos.
- **Persistencia local:** almacenamiento de información del carrito y las reservas mediante las capacidades del navegador.

## 🛠️ Tecnologías utilizadas

- **HTML5:** estructura semántica de la página, formularios y componentes de la interfaz.
- **CSS3:** estilos visuales, distribución de elementos, diseño adaptable y animaciones.
- **JavaScript (Vanilla JS):** lógica del menú, filtros, personalización de platos, carrito, reservas y proceso de compra.
- **Google Fonts:** tipografías Cinzel y Plus Jakarta Sans.
- **Google Maps:** integración de un mapa para consultar la ubicación del restaurante.
- **LocalStorage:** persistencia local de información en el navegador.

## 📂 Estructura del proyecto

```text
AltaMesa/
├── index.html    # Estructura principal de la página
├── styles.css    # Diseño y estilos de la interfaz
├── app.js        # Lógica e interactividad
└── README.md     # Documentación del proyecto
```

## 🚀 Instalación y ejecución

### Requisitos previos

- Un navegador web moderno, como Google Chrome, Microsoft Edge o Firefox.
- Git, si deseas clonar el repositorio.
- Conexión a Internet para cargar Google Fonts y Google Maps.

### 1. Clonar el repositorio

```bash
git clone https://github.com/dbohorquez10/AltaMesa.git
```

### 2. Acceder al directorio

```bash
cd AltaMesa
```

### 3. Ejecutar la aplicación

Abre el archivo `index.html` directamente en tu navegador.

También puedes utilizar Visual Studio Code con la extensión Live Server para ejecutar la página mediante un servidor local.

No se requiere instalar dependencias ni utilizar un proceso de compilación.

## 📖 Guía de uso

### 1. Explorar el menú

Accede a la sección **Menú** para consultar los platos disponibles. Puedes utilizar la búsqueda, seleccionar categorías y aplicar filtros alimentarios.

### 2. Personalizar un plato

Selecciona un plato para consultar su descripción y ajustar las preferencias o exclusiones disponibles antes de agregarlo al pedido.

### 3. Gestionar el carrito

Abre el carrito para revisar los platos seleccionados y consultar el subtotal del pedido.

### 4. Realizar un pedido

Accede al proceso de compra e ingresa los datos solicitados para coordinar la entrega. Puedes seleccionar efectivo o tarjeta dentro del flujo de demostración.

### 5. Reservar una mesa

Dirígete a la sección **Reservas** y completa el formulario con tus datos, fecha, hora y número de personas. También puedes incluir peticiones especiales o informar sobre alergias.

### 6. Consultar la ubicación

Visita la sección **Ubicación y contacto** para consultar la dirección, visualizar el mapa y revisar los horarios de atención.

## ⚙️ Consideraciones técnicas

AltaMesa es un proyecto web desarrollado principalmente del lado del cliente.

- La interfaz y sus funcionalidades están implementadas con HTML, CSS y JavaScript.
- El almacenamiento local permite conservar información en el navegador, pero no sustituye una base de datos centralizada.
- Las reservas se gestionan mediante la lógica del lado del cliente y no representan una confirmación conectada a un sistema real de disponibilidad.
- El flujo de compra es una demostración y no incluye una pasarela de pagos integrada.
- La selección de tarjeta en la interfaz no implica que se procese una transacción bancaria.
- No se implementa un servicio backend para administrar usuarios, pedidos o reservas de forma centralizada.

**Importante:** antes de utilizar el sistema en un restaurante real, sería necesario incorporar un backend seguro, una base de datos y servicios adecuados para gestionar reservas, pedidos y pagos.

## 🎯 Objetivo del proyecto

Diseñar e implementar una experiencia web para un restaurante que integre presentación gastronómica, consulta de menú, personalización de platos, gestión de pedidos y reservas, aplicando principios de diseño de interfaces, organización del contenido e interactividad con tecnologías web fundamentales.

## 👨‍💻 Autores

- **Darwing Yailang Bohórquez Jaimes**
- **Laura Sofia Mantilla Hernandez**
- **Jenny Carolina Perez Montañez**
