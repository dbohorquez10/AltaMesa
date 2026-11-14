/**
 * @file app.js
 * @description Lógica interactiva para la Landing Page de AltaMesa Restaurant.
 * Integrada 100% con Bootstrap 5.3.3 (Modals, Offcanvas, Toasts, Tooltips)
 * y enriquecida con microinteracciones táctiles, animaciones y respuestas visuales instantáneas.
 * 
 * Cada microinteracción está documentada con su propósito de UX, evento disparador y efecto visual.
 */

// =============================================================================
// 1. CONSTANTES, CATÁLOGO Y CONFIGURACIÓN INICIAL
// =============================================================================

const STORAGE_KEYS = {
  CART: 'altamesa_cart_items',
  RESERVATIONS: 'altamesa_reservations'
};

/** Formateador de moneda colombiana (COP) */
const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0
});

/** Meta VIP en el carrito para desbloquear beneficio gourmet de cortesía */
const VIP_REWARD_GOAL = 120000;

/** Catálogo de creaciones culinarias */
const DISHES_CATALOG = [
  { id: 1, name: "Carpaccio de Res con Trufa Blanca", description: "Finas láminas de lomo curado, alcaparras baby, queso Parmigiano madurado y un toque de aceite de trufa blanca.", price: 48000, isVegetarian: false, isGlutenFree: true, category: "Entradas", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=700&q=80", customizations: ["Sin alcaparras", "Sin queso", "Extra aceite de trufa"] },
  { id: 2, name: "Ostras Gratinadas al Champán", description: "Ostras frescas del pacífico horneadas con una suave crema de champán, espinacas tiernas y gratinado de queso gruyère.", price: 65000, isVegetarian: false, isGlutenFree: true, category: "Entradas", image: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=700&q=80", customizations: ["Sin espinacas", "Poco gratinado"] },
  { id: 3, name: "Tartar de Aguacate Hass & Palmitos", description: "Frescos palmitos macerados con aguacate, vinagreta de maracuyá, emulsión de cilantro y crocantes de maíz morado.", price: 42000, isVegetarian: true, isGlutenFree: true, category: "Entradas", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80", customizations: ["Sin cilantro", "Vinagreta aparte"] },
  { id: 4, name: "Burrata Trufada con Tomates Heirloom", description: "Suave queso burrata artesanal sobre tomates asados, pesto genovés y reducción de balsámico añejado.", price: 52000, isVegetarian: true, isGlutenFree: true, category: "Entradas", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80", customizations: ["Sin pesto", "Balsámico aparte"] },
  { id: 5, name: "Tomahawk Steak al Carbón de Quebracho", description: "Corte Tomahawk madurado 45 días, asado lentamente, servido con papas rústicas al romero y mantequilla de ajo asado.", price: 185000, isVegetarian: false, isGlutenFree: true, category: "Fuertes", image: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&w=700&q=80", customizations: ["Término Medio", "Término 3/4", "Bien Asado", "Sin mantequilla de ajo"] },
  { id: 6, name: "Lomo de Res en Reducción de Malbec", description: "Medallón de lomo a la brasa sobre puré trufado de papa criolla, espárragos glaseados y reducción de vino Malbec.", price: 84000, isVegetarian: false, isGlutenFree: true, category: "Fuertes", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=700&q=80", customizations: ["Término Medio", "Término 3/4", "Bien Asado", "Salsa aparte"] },
  { id: 7, name: "Magret de Pato con Frutos Rojos", description: "Pechuga de pato en su punto, coulis de frutos del bosque, puré de camote y vegetales glaseados.", price: 95000, isVegetarian: false, isGlutenFree: true, category: "Fuertes", image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=700&q=80", customizations: ["Término Medio", "Término 3/4", "Bien Asado", "Salsa aparte"] },
  { id: 8, name: "Salmón Noruego en Costra de Pistacho", description: "Filete de salmón fresco sobre risotto de cítricos y azafrán, bañado con reducción de maracuyá.", price: 92000, isVegetarian: false, isGlutenFree: true, category: "Fuertes", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=700&q=80", customizations: ["Salsa aparte", "Punto jugoso"] },
  { id: 9, name: "Risotto de Hongos Silvestres & Trufa", description: "Arroz arborio al dente con setas del bosque, aceite virgen de trufa blanca y queso Parmigiano Reggiano.", price: 68000, isVegetarian: true, isGlutenFree: false, category: "Fuertes", image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=700&q=80", customizations: ["Sin queso Parmigiano", "Extra aceite de trufa"] },
  { id: 10, name: "Esfera de Chocolate y Avellana", description: "Cúpula de chocolate oscuro al 70%, mousse de praliné de avellanas, bizcocho húmedo de cacao y oro comestible.", price: 35000, isVegetarian: true, isGlutenFree: false, category: "Postres", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=700&q=80", customizations: ["Sin frutos secos"] },
  { id: 11, name: "Cheesecake de Maracuyá Desestructurado", description: "Crema de queso mascarpone, crumble de galleta de almendras, esferas de gel de maracuyá y flores comestibles.", price: 28000, isVegetarian: true, isGlutenFree: false, category: "Postres", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=80", customizations: ["Sin flores", "Salsa extra"] },
  { id: 12, name: "Tiramisú de Pistacho Siciliano", description: "Clásico italiano reinventado con crema de pistachos de Sicilia, bizcochos bañados en espresso y lluvia de cacao amargo.", price: 32000, isVegetarian: true, isGlutenFree: false, category: "Postres", image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=700&q=80", customizations: ["Poco cacao", "Sin licor"] },
  { id: 13, name: "Ceviche de Langosta y Mango", description: "Frescos medallones de langosta marinados en leche de tigre al ají amarillo, dados de mango biche, cilantro y maíz chulpi.", price: 68000, isVegetarian: false, isGlutenFree: true, category: "Entradas", image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=700&q=80", customizations: ["Sin cilantro", "Poco picante", "Sin mango"] },
  { id: 14, name: "Pulpo a la Parrilla con Chimichurri", description: "Tentáculos de pulpo braseados lentamente, sobre cama de papines andinos aplastados, pimentón ahumado y chimichurri de la casa.", price: 89000, isVegetarian: false, isGlutenFree: true, category: "Fuertes", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=700&q=80", customizations: ["Sin chimichurri", "Punto más asado"] },
  { id: 15, name: "Costillas de Cordero en Costra de Hierbas", description: "Costillar de cordero patagónico al horno, costra de hierbas provenzales, puré rústico de arvejas y reducción de menta.", price: 110000, isVegetarian: false, isGlutenFree: false, category: "Fuertes", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=700&q=80", customizations: ["Término Medio", "Término 3/4", "Salsa aparte", "Sin costra de hierbas"] },
  { id: 16, name: "Volcán de Dulce de Leche", description: "Soufflé horneado al momento con corazón fundido de dulce de leche artesanal, acompañado de helado de vainilla en vaina.", price: 34000, isVegetarian: true, isGlutenFree: false, category: "Postres", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=700&q=80", customizations: ["Sin helado", "Helado aparte"] }
];

/** Estado Reactivo de la Aplicación */
const AppState = {
  cart: [],
  pendingDish: null,
  searchTerm: '',
  onlyVegetarian: false,
  onlyGlutenFree: false,
  sortBy: 'default',
  activeCategory: 'all',
  
  // Instancias Bootstrap 5 API
  bsCartOffcanvas: null,
  bsDishModal: null,
  bsCheckoutModal: null
};

// =============================================================================
// 2. REFERENCIAS AL DOM
// =============================================================================

const DOM = {
  navbar: document.getElementById('navbar'),
  cartToggleBtn: document.getElementById('cart-toggle-btn'),
  cartCountBadge: document.getElementById('cart-count'),
  currentYearSpan: document.getElementById('current-year'),
  btnScrollTop: document.getElementById('btn-scroll-top'),

  menuContainer: document.getElementById('menu-container'),
  menuSearchInput: document.getElementById('menu-search-input'),
  btnClearSearch: document.getElementById('btn-clear-search'),
  filterVegCheckbox: document.getElementById('filter-vegetarian-checkbox'),
  filterGlutenCheckbox: document.getElementById('filter-gluten-checkbox'),
  sortSelect: document.getElementById('sort-select'),
  filterButtons: () => document.querySelectorAll('.filter-btn'),
  noResultsMsg: document.getElementById('no-results-msg'),
  btnResetFilters: document.getElementById('btn-reset-filters'),
  resultsCountBadge: document.getElementById('results-count-badge'),

  dishModal: document.getElementById('dish-customization-dialog'),
  dishModalTitle: document.getElementById('modal-dish-title'),
  dishModalDesc: document.getElementById('modal-dish-desc'),
  dishModalPrice: document.getElementById('modal-dish-price'),
  dishModalCloseBtn: document.getElementById('btn-close-dish-modal'),
  dishModalConfirmBtn: document.getElementById('btn-confirm-add-cart'),
  modalExclusionsList: document.getElementById('modal-exclusions-list'),
  dishExclusionCheckboxes: () => document.querySelectorAll('input[name="dish-exclusion"]'),

  cartSidebar: document.getElementById('cart-sidebar'),
  cartCloseBtn: document.getElementById('cart-close-btn'),
  cartItemsContainer: document.getElementById('cart-items-container'),
  cartSubtotalPrice: document.getElementById('cart-subtotal-price'),
  btnProceedCheckout: document.getElementById('btn-proceed-checkout'),
  cartRewardProgressBar: document.getElementById('cart-reward-progress-bar'),
  cartRewardText: document.getElementById('cart-reward-text'),
  cartRewardStatus: document.getElementById('cart-reward-status'),

  checkoutModal: document.getElementById('checkout-modal'),
  checkoutContent: document.getElementById('checkout-dialog-content'),
  checkoutForm: document.getElementById('checkout-form'),
  checkoutCloseBtn: document.getElementById('btn-close-checkout-modal'),
  checkoutTotalSpan: document.getElementById('checkout-modal-total'),
  checkoutInputs: {
    name: document.getElementById('checkout-name'),
    address: document.getElementById('checkout-address'),
    phone: document.getElementById('checkout-phone')
  },
  payCashRadio: document.getElementById('pay-cash'),
  payCardRadio: document.getElementById('pay-card'),
  payCashLabel: document.getElementById('pay-cash-label'),
  payCardLabel: document.getElementById('pay-card-label'),
  cardFields: document.getElementById('card-fields'),
  cashNote: document.getElementById('cash-note'),
  cardNumber: document.getElementById('checkout-card-number'),
  cardExpiry: document.getElementById('checkout-card-expiry'),
  cardCvv: document.getElementById('checkout-card-cvv'),
  cardHolder: document.getElementById('checkout-card-holder'),
  cardBrandBadge: document.getElementById('card-brand-badge'),
  btnConfirmCheckout: document.getElementById('btn-confirm-checkout'),
  btnCheckoutLabel: document.getElementById('btn-checkout-label'),

  reservationForm: document.getElementById('reservation-form'),
  reservationSuccessContainer: document.getElementById('reservation-success-container'),
  reservationDetails: document.getElementById('reservation-details'),
  btnNewReservation: document.getElementById('btn-new-reservation'),
  reservationPreviewBox: document.getElementById('reservation-preview-box'),
  reservationPreviewText: document.getElementById('reservation-preview-text'),
  resInputs: {
    name: document.getElementById('res-name'),
    guests: document.getElementById('res-guests'),
    date: document.getElementById('res-date'),
    time: document.getElementById('res-time'),
    notes: document.getElementById('res-notes')
  },
  resErrors: {
    name: document.getElementById('res-name-error'),
    guests: document.getElementById('res-guests-error'),
    date: document.getElementById('res-date-error'),
    time: document.getElementById('res-time-error')
  },

  toastContainer: document.getElementById('altamesa-toast-container'),
  scheduleCard: document.getElementById('schedule-card'),
  businessStatusBadge: document.getElementById('business-status-badge')
};

// =============================================================================
// 3. SISTEMA DE MICROINTERACCIONES CORE
// =============================================================================

/**
 * MICROINTERACCIÓN 1: Efecto Onda Ripple en Botones
 * Qué hace: Genera un círculo de luz que se expande radialmente desde el punto exacto
 * donde el usuario hizo clic o pulsó con el dedo, dando respuesta visual táctil.
 */
function initRippleEffect() {
  document.addEventListener('click', (e) => {
    const targetBtn = e.target.closest('.ripple-btn, .btn');
    if (!targetBtn) return;

    const rect = targetBtn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const wave = document.createElement('span');
    wave.className = 'ripple-wave';
    wave.style.width = wave.style.height = `${size}px`;
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;

    targetBtn.appendChild(wave);
    setTimeout(() => wave.remove(), 650);
  });
}

/**
 * MICROINTERACCIÓN 2: Partícula Flotante "+1" Dorada
 * Qué hace: Al presionar "Añadir" en una tarjeta, lanza un elemento flotante "+1"
 * que se eleva y desvanece, conectando el producto directamente con el acto de compra.
 */
function triggerFloatingParticle(originElement) {
  if (!originElement) return;
  const rect = originElement.getBoundingClientRect();
  const particle = document.createElement('div');
  particle.className = 'floating-item-particle';
  particle.textContent = '+1';
  particle.style.left = `${rect.left + rect.width / 2 - 10}px`;
  particle.style.top = `${rect.top - 10}px`;

  document.body.appendChild(particle);
  setTimeout(() => particle.remove(), 900);
}

/**
 * MICROINTERACCIÓN 3: Notificación Flotante con Bootstrap 5 Toast
 * Qué hace: Despliega una alerta no intrusiva en la esquina inferior con icono temático,
 * confirmando al usuario la acción realizada (ej: "Plato añadido", "Reserva lista").
 */
function showToast(title, message, iconClass = 'bi-check-circle-fill text-gold') {
  if (!DOM.toastContainer) return;

  const toastId = `toast-${Date.now()}`;
  const toastEl = document.createElement('div');
  toastEl.className = 'toast custom-toast align-items-center border-0';
  toastEl.id = toastId;
  toastEl.setAttribute('role', 'alert');
  toastEl.setAttribute('aria-live', 'assertive');
  toastEl.setAttribute('aria-atomic', 'true');

  toastEl.innerHTML = `
    <div class="d-flex align-items-center">
      <div class="toast-body d-flex align-items-center gap-2 py-3 px-3">
        <i class="bi ${iconClass} fs-4 flex-shrink-0"></i>
        <div>
          <div class="fw-bold text-white small">${title}</div>
          <div class="text-light small opacity-75">${message}</div>
        </div>
      </div>
      <button type="button" class="btn-close btn-close-white me-3 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
    </div>
  `;

  DOM.toastContainer.appendChild(toastEl);
  if (window.bootstrap && bootstrap.Toast) {
    const bsToast = new bootstrap.Toast(toastEl, { delay: 3500 });
    bsToast.show();
    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
  } else {
    setTimeout(() => toastEl.remove(), 3500);
  }
}

/**
 * MICROINTERACCIÓN 4: Botón Flotante "Volver Arriba" Scroll-Driven
 * Qué hace: Monitorea el desplazamiento vertical. Al superar 350px aparece con elevación
 * y brillo suave; al hacer clic, desplaza la ventana con suavidad cinematográfica.
 */
function initScrollTopButton() {
  if (!DOM.btnScrollTop) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      DOM.btnScrollTop.classList.add('visible');
    } else {
      DOM.btnScrollTop.classList.remove('visible');
    }
  }, { passive: true });

  DOM.btnScrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * MICROINTERACCIÓN 5: Transición Glassmorphic de la Barra de Navegación
 * Qué hace: Al desplazarse hacia abajo, contrae sutilmente la altura del navbar,
 * aumenta el desenfoque de fondo y proyecta un borde inferior dorado sutil.
 */
function initNavbarScrollEffect() {
  const handleScroll = () => {
    if (window.scrollY > 40) {
      DOM.navbar.classList.add('scrolled');
    } else {
      DOM.navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * MICROINTERACCIÓN 6: Detección y Resaltado del Horario Actual
 * Qué hace: Comprueba el día actual de la semana (0: Domingo, 1: Lunes, etc.)
 * y resalta automáticamente en la tarjeta de contacto la fila correspondiente con borde dorado.
 */
function highlightCurrentScheduleDay() {
  const currentDay = new Date().getDay(); // 0 a 6
  const scheduleRows = document.querySelectorAll('.schedule-list li');
  scheduleRows.forEach(row => {
    const daysAttr = row.getAttribute('data-days');
    if (!daysAttr) return;
    const days = daysAttr.split(',').map(d => parseInt(d.trim(), 10));
    if (days.includes(currentDay)) {
      row.classList.add('schedule-today-active');
      const badge = document.createElement('span');
      badge.className = 'badge bg-gold text-dark ms-2 small fw-bold';
      badge.textContent = 'Hoy';
      row.querySelector('span:first-child').appendChild(badge);
    }
  });

  // Si hoy es lunes (cerrado)
  if (currentDay === 1 && DOM.businessStatusBadge) {
    DOM.businessStatusBadge.className = 'badge rounded-pill bg-danger-subtle text-danger border border-danger px-2 py-1 small';
    DOM.businessStatusBadge.innerHTML = '<span class="status-pulse-dot" style="background-color:#ef4444; box-shadow:0 0 8px #ef4444;"></span> Cerrado Hoy';
  }
}

/**
 * MICROINTERACCIÓN: Sistema de Desenfoque y Nublado para Subventanas & Carrito
 * Qué hace: Detecta la apertura del carrito (offcanvas) y de cualquier ventana modal
 * (personalización de plato, checkout de pago), aplicando la clase 'subwindow-active'
 * para coordinar el desenfoque óptico cinematográfico y oscurecimiento del fondo.
 */
function initSubwindowBlurSystem() {
  const elements = [DOM.cartSidebar, DOM.dishModal, DOM.checkoutModal].filter(Boolean);

  elements.forEach(element => {
    element.addEventListener('show.bs.offcanvas', () => {
      document.body.classList.add('subwindow-active');
    });
    element.addEventListener('show.bs.modal', () => {
      document.body.classList.add('subwindow-active');
    });

    element.addEventListener('hidden.bs.offcanvas', () => {
      const hasOtherOpen = document.querySelector('.modal.show, .offcanvas.show');
      if (!hasOtherOpen) {
        document.body.classList.remove('subwindow-active');
      }
    });
    element.addEventListener('hidden.bs.modal', () => {
      const hasOtherOpen = document.querySelector('.modal.show, .offcanvas.show');
      if (!hasOtherOpen) {
        document.body.classList.remove('subwindow-active');
      }
    });
  });
}

// =============================================================================
// 4. GESTIÓN DEL CARRITO (BOOTSTRAP 5 OFFCANVAS & REWARD PROGRESS)
// =============================================================================

function loadCartFromStorage() {
  try {
    const serializedCart = localStorage.getItem(STORAGE_KEYS.CART);
    AppState.cart = serializedCart ? JSON.parse(serializedCart) : [];
  } catch (error) {
    AppState.cart = [];
  }
  updateCartUI();
}

function saveCartToStorage() {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(AppState.cart));
  updateCartUI();
}

/**
 * MICROINTERACCIÓN 7: Rebote Elástico en el Contador Badge del Carrito
 * Qué hace: Aplica una animación CSS con overshoot (curva spring) cada vez que
 * la cantidad total de platos cambia, llamando la atención hacia el carrito.
 */
function triggerCartBadgeAnimation() {
  DOM.cartCountBadge.classList.remove('badge-bounce-animation');
  void DOM.cartCountBadge.offsetWidth; // Forzar reflow para reiniciar animación
  DOM.cartCountBadge.classList.add('badge-bounce-animation');
}

/**
 * MICROINTERACCIÓN 8: Barra de Progreso a Beneficio Gourmet en el Carrito
 * Qué hace: Muestra cuánto le falta al usuario para recibir un obsequio VIP del Chef
 * ($120.000 COP) y anima dinámicamente la barra de progreso a rayas doradas.
 */
function updateRewardProgress(subtotal) {
  if (!DOM.cartRewardProgressBar || !DOM.cartRewardStatus) return;

  const percentage = Math.min(100, Math.round((subtotal / VIP_REWARD_GOAL) * 100));
  DOM.cartRewardProgressBar.style.width = `${percentage}%`;
  DOM.cartRewardProgressBar.setAttribute('aria-valuenow', percentage);

  if (subtotal >= VIP_REWARD_GOAL) {
    DOM.cartRewardProgressBar.classList.remove('bg-gold');
    DOM.cartRewardProgressBar.classList.add('bg-success');
    DOM.cartRewardStatus.textContent = '¡DESBLOQUEADO!';
    DOM.cartRewardStatus.className = 'text-success fw-bold';
    DOM.cartRewardText.innerHTML = '<i class="bi bi-gift-fill text-success me-1"></i> ¡Obsequio Gourmet Desbloqueado! 🍾';
  } else {
    const remaining = VIP_REWARD_GOAL - subtotal;
    DOM.cartRewardProgressBar.classList.remove('bg-success');
    DOM.cartRewardProgressBar.classList.add('bg-gold');
    DOM.cartRewardStatus.textContent = currencyFormatter.format(remaining);
    DOM.cartRewardStatus.className = 'text-gold fw-bold';
    DOM.cartRewardText.innerHTML = '<i class="bi bi-gift-fill text-gold me-1"></i> Faltan para Obsequio VIP:';
  }
}

function updateCartUI() {
  const totalItems = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  DOM.cartCountBadge.textContent = totalItems.toString();
  triggerCartBadgeAnimation();

  DOM.cartItemsContainer.innerHTML = '';

  if (AppState.cart.length === 0) {
    DOM.cartItemsContainer.innerHTML = `
      <div class="cart-empty-message text-center my-auto py-5 text-muted">
        <i class="bi bi-bag-x display-3 text-gold opacity-50 mb-3 d-block"></i>
        <h5 class="text-white font-serif mb-1">Tu pedido está vacío</h5>
        <p class="small text-muted mb-3">Agrega tus creaciones favoritas desde la carta</p>
        <a href="#menu" class="btn btn-outline-gold btn-sm ripple-btn" data-bs-dismiss="offcanvas">
          Explorar la Carta
        </a>
      </div>`;
    DOM.cartSubtotalPrice.textContent = currencyFormatter.format(0);
    DOM.btnProceedCheckout.disabled = true;
    updateRewardProgress(0);
    return;
  }

  let subtotal = 0;
  const fragment = document.createDocumentFragment();

  AppState.cart.forEach(item => {
    const itemSubtotal = item.price * item.quantity;
    subtotal += itemSubtotal;

    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.setAttribute('data-key', item.uniqueKey);

    const exclusionsHTML = item.exclusions.length > 0 
      ? `<div class="cart-item-exclusions"><i class="bi bi-info-circle me-1"></i>${item.exclusions.join(', ')}</div>` 
      : '';

    itemElement.innerHTML = `
      <div class="d-flex justify-content-between align-items-start">
        <div class="pe-2">
          <h5 class="cart-item-name font-serif">${item.name}</h5>
          ${exclusionsHTML}
        </div>
        <button type="button" class="btn-remove-item btn p-0 text-muted hover-danger" data-key="${item.uniqueKey}" title="Eliminar plato" aria-label="Eliminar ${item.name}">
          <i class="bi bi-trash3 fs-6"></i>
        </button>
      </div>

      <div class="d-flex justify-content-between align-items-center mt-2 pt-2 border-top border-dark-subtle">
        <!-- Control Táctil de Cantidades con Rebote -->
        <div class="quantity-control">
          <button type="button" class="btn-qty btn-decrease" data-key="${item.uniqueKey}" aria-label="Restar una unidad">-</button>
          <span class="item-qty-value">${item.quantity}</span>
          <button type="button" class="btn-qty btn-increase" data-key="${item.uniqueKey}" aria-label="Añadir una unidad">+</button>
        </div>
        <div class="cart-item-price-subtotal">${currencyFormatter.format(itemSubtotal)}</div>
      </div>
    `;
    fragment.appendChild(itemElement);
  });

  DOM.cartItemsContainer.appendChild(fragment);

  // Listeners de control de cantidades
  DOM.cartItemsContainer.querySelectorAll('.btn-decrease').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const key = e.currentTarget.getAttribute('data-key');
      updateItemQuantity(key, -1);
    });
  });

  DOM.cartItemsContainer.querySelectorAll('.btn-increase').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const key = e.currentTarget.getAttribute('data-key');
      updateItemQuantity(key, 1);
    });
  });

  // Listener para botón de eliminación directa con microanimación de desvanecimiento
  DOM.cartItemsContainer.querySelectorAll('.btn-remove-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const key = e.currentTarget.getAttribute('data-key');
      animateAndRemoveItem(key);
    });
  });

  DOM.cartSubtotalPrice.textContent = currencyFormatter.format(subtotal);
  DOM.btnProceedCheckout.disabled = false;
  updateRewardProgress(subtotal);
}

/**
 * MICROINTERACCIÓN 9: Deslizamiento y Colapso al Eliminar Ítem del Carrito
 * Qué hace: Desplaza el ítem suavemente hacia la derecha con reducción de altura a cero
 * antes de retirarlo del almacenamiento, ofreciendo una transición fluida sin saltos abruptos.
 */
function animateAndRemoveItem(uniqueKey) {
  const itemEl = DOM.cartItemsContainer.querySelector(`[data-key="${uniqueKey}"]`);
  if (itemEl) {
    itemEl.classList.add('removing');
    setTimeout(() => {
      const itemIndex = AppState.cart.findIndex(i => i.uniqueKey === uniqueKey);
      if (itemIndex > -1) {
        AppState.cart.splice(itemIndex, 1);
        saveCartToStorage();
        showToast('Plato removido', 'Se ha retirado del pedido', 'bi-trash text-warning');
      }
    }, 320);
  } else {
    updateItemQuantity(uniqueKey, -9999);
  }
}

function updateItemQuantity(uniqueKey, delta) {
  const itemIndex = AppState.cart.findIndex(item => item.uniqueKey === uniqueKey);
  if (itemIndex === -1) return;

  if (AppState.cart[itemIndex].quantity + delta <= 0) {
    animateAndRemoveItem(uniqueKey);
    return;
  }

  AppState.cart[itemIndex].quantity += delta;
  saveCartToStorage();
}

function openCartSidebar() {
  if (AppState.bsCartOffcanvas) {
    AppState.bsCartOffcanvas.show();
  }
}

function closeCartSidebar() {
  if (AppState.bsCartOffcanvas) {
    AppState.bsCartOffcanvas.hide();
  }
}

// =============================================================================
// 5. CONSULTAR MENÚ Y FILTROS INTERACTIVOS
// =============================================================================

function renderDishesMenu() {
  if (!DOM.menuContainer) return;
  DOM.menuContainer.innerHTML = '';
  
  let totalMatches = 0;
  const categories = ['Entradas', 'Fuertes', 'Postres'];
  const categoriesToRender = AppState.activeCategory === 'all' ? categories : [AppState.activeCategory];

  let dishesToProcess = [...DISHES_CATALOG];
  
  if (AppState.sortBy === 'price-asc') {
    dishesToProcess.sort((a, b) => a.price - b.price);
  } else if (AppState.sortBy === 'price-desc') {
    dishesToProcess.sort((a, b) => b.price - a.price);
  }

  categoriesToRender.forEach(cat => {
    const filteredDishes = dishesToProcess.filter(dish => {
      const matchesSearch = dish.name.toLowerCase().includes(AppState.searchTerm.toLowerCase()) || 
                            dish.description.toLowerCase().includes(AppState.searchTerm.toLowerCase());
      const matchesVeg = AppState.onlyVegetarian ? dish.isVegetarian : true;
      const matchesGF = AppState.onlyGlutenFree ? dish.isGlutenFree : true;
      const matchesCat = dish.category === cat;
      return matchesSearch && matchesVeg && matchesGF && matchesCat;
    });

    if (filteredDishes.length > 0) {
      totalMatches += filteredDishes.length;

      // Título de la Categoría con Línea de Acento Dorada
      const catHeader = document.createElement('h3');
      catHeader.className = 'menu-category-title';
      catHeader.textContent = cat === 'Fuertes' ? 'Platos Fuertes' : cat;
      DOM.menuContainer.appendChild(catHeader);

      // Grid Bootstrap con Row y Col
      const gridRow = document.createElement('div');
      gridRow.className = 'row g-4';

      filteredDishes.forEach(dish => {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-12 col-md-6 col-lg-4 col-xl-3';

        const vegBadge = dish.isVegetarian 
          ? `<span class="dish-badge-veg" title="Apto para vegetarianos"><i class="bi bi-leaf-fill me-1"></i>Veg</span>` 
          : '';
        const gfBadge = dish.isGlutenFree 
          ? `<span class="dish-badge-gf" title="Sin gluten certificado"><i class="bi bi-shield-check me-1"></i>Sin Gluten</span>` 
          : '';

        colDiv.innerHTML = `
          <article class="dish-card h-100" data-id="${dish.id}">
            <div class="dish-image-wrapper">
              <img src="${dish.image}" alt="${dish.name}" class="dish-img" loading="lazy">
              ${vegBadge}
              ${gfBadge}
            </div>
            <div class="dish-body">
              <h4 class="dish-title">${dish.name}</h4>
              <p class="dish-desc">${dish.description}</p>
              <div class="dish-footer">
                <span class="dish-price">${currencyFormatter.format(dish.price)}</span>
                <button type="button" class="btn btn-open-dish-modal ripple-btn" data-id="${dish.id}" aria-label="Personalizar y añadir ${dish.name}">
                  <i class="bi bi-plus-lg me-1"></i> Añadir
                </button>
              </div>
            </div>
          </article>
        `;
        gridRow.appendChild(colDiv);
      });

      DOM.menuContainer.appendChild(gridRow);
    }
  });

  // Actualización del Estado Vacío y Contador Live
  if (totalMatches === 0) {
    DOM.noResultsMsg.classList.remove('d-none');
    if (DOM.resultsCountBadge) DOM.resultsCountBadge.textContent = '0 creaciones encontradas';
  } else {
    DOM.noResultsMsg.classList.add('d-none');
    if (DOM.resultsCountBadge) {
      DOM.resultsCountBadge.textContent = `${totalMatches} ${totalMatches === 1 ? 'creación disponible' : 'creaciones disponibles'}`;
    }
  }

  // Asignar listeners a los botones "Añadir"
  DOM.menuContainer.querySelectorAll('.btn-open-dish-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const dishId = parseInt(e.currentTarget.getAttribute('data-id'), 10);
      triggerFloatingParticle(e.currentTarget);
      openDishCustomizationModal(dishId);
    });
  });
}

// =============================================================================
// 6. MODAL DE PERSONALIZACIÓN DE PLATO (BOOTSTRAP 5 MODAL)
// =============================================================================

function openDishCustomizationModal(dishId) {
  const dish = DISHES_CATALOG.find(d => d.id === dishId);
  if (!dish) return;

  AppState.pendingDish = dish;
  DOM.dishModalTitle.textContent = dish.name;
  DOM.dishModalDesc.textContent = dish.description;
  DOM.dishModalPrice.textContent = currencyFormatter.format(dish.price);

  DOM.modalExclusionsList.innerHTML = '';
  
  dish.customizations.forEach((cust, idx) => {
    const label = document.createElement('label');
    label.className = 'custom-checkbox-container';
    label.innerHTML = `
      <input type="checkbox" name="dish-exclusion" value="${cust}" id="cust-${dish.id}-${idx}">
      <span class="checkbox-custom"></span>
      <span class="text-light small fw-medium">${cust}</span>
    `;

    /**
     * MICROINTERACCIÓN 10: Checkbox Spring Bounce con Highlight Activo
     * Qué hace: Al marcar o desmarcar una preferencia culinaria, aplica la clase .checked
     * que resalta la fila completa en oro sutil y activa el resorte en el checkmark.
     */
    label.querySelector('input').addEventListener('change', (e) => {
      if (e.target.checked) {
        label.classList.add('checked');
      } else {
        label.classList.remove('checked');
      }
    });

    DOM.modalExclusionsList.appendChild(label);
  });

  if (AppState.bsDishModal) {
    AppState.bsDishModal.show();
  }
}

function closeDishCustomizationModal() {
  if (AppState.bsDishModal) {
    AppState.bsDishModal.hide();
  }
  AppState.pendingDish = null;
}

function handleConfirmAddToCart() {
  if (!AppState.pendingDish) return;
  const selectedExclusions = [];
  DOM.dishExclusionCheckboxes().forEach(checkbox => {
    if (checkbox.checked) {
      selectedExclusions.push(checkbox.value);
    }
  });

  const exclusionsKey = selectedExclusions.sort().join('|');
  const uniqueKey = `${AppState.pendingDish.id}_${exclusionsKey}`;
  const existingItemIndex = AppState.cart.findIndex(item => item.uniqueKey === uniqueKey);

  if (existingItemIndex > -1) {
    AppState.cart[existingItemIndex].quantity += 1;
  } else {
    AppState.cart.push({
      uniqueKey: uniqueKey,
      id: AppState.pendingDish.id,
      name: AppState.pendingDish.name,
      price: AppState.pendingDish.price,
      exclusions: selectedExclusions,
      quantity: 1
    });
  }

  const addedDishName = AppState.pendingDish.name;
  saveCartToStorage();
  closeDishCustomizationModal();
  
  // Feedback inmediato al usuario
  showToast('¡Añadido al pedido!', `${addedDishName} se encuentra en tu carrito`, 'bi-bag-plus-fill text-gold');
  
  // Abrir suavemente el offcanvas del carrito para confirmar
  setTimeout(() => openCartSidebar(), 300);
}

// =============================================================================
// 7. CU: CHECKOUT DE PAGO (BOOTSTRAP 5 MODAL CON DETECCIÓN DE TARJETA)
// =============================================================================

function openCheckoutModal() {
  closeCartSidebar();
  const total = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  DOM.checkoutTotalSpan.textContent = currencyFormatter.format(total);
  
  // Limpiar estados de error previos
  Object.values(DOM.checkoutInputs).forEach(input => input.classList.remove('input-error'));
  [DOM.cardNumber, DOM.cardExpiry, DOM.cardCvv, DOM.cardHolder].forEach(i => i.classList.remove('input-error'));

  if (AppState.bsCheckoutModal) {
    AppState.bsCheckoutModal.show();
  }
}

function closeCheckoutModal() {
  if (AppState.bsCheckoutModal) {
    AppState.bsCheckoutModal.hide();
  }
}

/**
 * MICROINTERACCIÓN 11: Detección Dinámica de Franquicia de Tarjeta (Visa/Mastercard/Amex)
 * Qué hace: A medida que el cliente digita los primeros números, evalúa el prefijo BIN
 * y actualiza instantáneamente el badge visual con el logotipo y nombre de la franquicia.
 */
function detectCardBrand(number) {
  const clean = number.replace(/\D/g, '');
  if (!DOM.cardBrandBadge) return;

  if (/^4/.test(clean)) {
    DOM.cardBrandBadge.className = 'badge bg-primary text-white';
    DOM.cardBrandBadge.innerHTML = '<i class="bi bi-credit-card-2-front-fill me-1"></i> VISA';
  } else if (/^(5[1-5]|2[2-7])/.test(clean)) {
    DOM.cardBrandBadge.className = 'badge bg-warning text-dark';
    DOM.cardBrandBadge.innerHTML = '<i class="bi bi-credit-card-fill me-1"></i> Mastercard';
  } else if (/^3[47]/.test(clean)) {
    DOM.cardBrandBadge.className = 'badge bg-info text-dark';
    DOM.cardBrandBadge.innerHTML = '<i class="bi bi-credit-card-2-back me-1"></i> American Express';
  } else {
    DOM.cardBrandBadge.className = 'badge bg-secondary';
    DOM.cardBrandBadge.innerHTML = '<i class="bi bi-credit-card me-1"></i> Tarjeta';
  }
}

function initPaymentToggle() {
  const toggle = (isCash) => {
    if (isCash) {
      DOM.cardFields.classList.add('d-none');
      DOM.cashNote.classList.remove('d-none');
      DOM.payCashLabel.classList.add('active');
      DOM.payCardLabel.classList.remove('active');
    } else {
      DOM.cardFields.classList.remove('d-none');
      DOM.cashNote.classList.add('d-none');
      DOM.payCashLabel.classList.remove('active');
      DOM.payCardLabel.classList.add('active');
    }
  };

  DOM.payCashRadio.addEventListener('change', () => toggle(true));
  DOM.payCardRadio.addEventListener('change', () => toggle(false));
  DOM.payCashLabel.addEventListener('click', () => { DOM.payCashRadio.checked = true; toggle(true); });
  DOM.payCardLabel.addEventListener('click', () => { DOM.payCardRadio.checked = true; toggle(false); });

  // MICROINTERACCIÓN: Formateo automático de número de tarjeta en bloques de 4 dígitos
  DOM.cardNumber.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 16);
    val = val.replace(/(.{4})/g, '$1 ').trim();
    e.target.value = val;
    detectCardBrand(val);
  });

  // MICROINTERACCIÓN: Formateo automático de fecha de vencimiento MM/AA
  DOM.cardExpiry.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2);
    e.target.value = val;
  });

  // Solo dígitos en CVV
  DOM.cardCvv.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
  });

  // Nombre del tarjetahabiente en mayúsculas
  DOM.cardHolder.addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase();
  });
}

/**
 * MICROINTERACCIÓN 12: Celebración con Confeti para Pedido Exitoso
 * Qué hace: Lanza partículas de confeti dorado y blanco sobre el modal al confirmar el pago.
 */
function launchCelebrationConfetti() {
  const canvas = document.createElement('canvas');
  canvas.className = 'confetti-canvas';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#d4af37', '#ffffff', '#b5952f', '#f9fafb', '#22c55e'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.8) * 16,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1
    });
  }

  let animationFrame;
  function updateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // Gravedad
      p.alpha -= 0.015;

      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.restore();
      }
    });

    if (alive) {
      animationFrame = requestAnimationFrame(updateConfetti);
    } else {
      cancelAnimationFrame(animationFrame);
      canvas.remove();
    }
  }

  updateConfetti();
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  let hasError = false;
  const inputs = DOM.checkoutInputs;

  // Validar campos de entrega
  [inputs.name, inputs.address, inputs.phone].forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('input-error');
      hasError = true;
    } else {
      field.classList.remove('input-error');
    }
  });

  const isCard = DOM.payCardRadio.checked;
  if (isCard) {
    const cardFields = [DOM.cardNumber, DOM.cardExpiry, DOM.cardCvv, DOM.cardHolder];
    cardFields.forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('input-error');
        hasError = true;
      } else {
        field.classList.remove('input-error');
      }
    });

    if (DOM.cardNumber.value.replace(/\s/g, '').length < 16) {
      DOM.cardNumber.classList.add('input-error');
      hasError = true;
    }
    if (DOM.cardExpiry.value.length < 5) {
      DOM.cardExpiry.classList.add('input-error');
      hasError = true;
    }
    if (DOM.cardCvv.value.length < 3) {
      DOM.cardCvv.classList.add('input-error');
      hasError = true;
    }
  }

  if (hasError) {
    showToast('Campos requeridos', 'Por favor verifica los campos resaltados en rojo', 'bi-exclamation-triangle-fill text-danger');
    return;
  }

  // MICROINTERACCIÓN: Estado de carga interactivo con spinner
  DOM.btnConfirmCheckout.disabled = true;
  DOM.btnConfirmCheckout.innerHTML = `
    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
    ${isCard ? 'Procesando pago seguro 256-bit...' : 'Coordinando despacho...'}
  `;

  setTimeout(() => {
    AppState.cart = [];
    saveCartToStorage();
    launchCelebrationConfetti();

    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const payMethod = isCard ? 'Tarjeta Débito/Crédito' : 'Efectivo contra entrega';

    DOM.checkoutContent.innerHTML = `
      <div class="checkout-success-view py-5 px-3 text-center">
        <div class="mb-3">
          <svg class="checkmark-svg mx-auto" width="68" height="68" viewBox="0 0 52 52">
            <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
            <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>
        <h2 class="font-serif text-white fs-3 mb-2">¡Orden Confirmada #${orderNumber}!</h2>
        <span class="badge bg-gold text-dark fw-bold mb-3 px-3 py-2 text-uppercase tracking-wide">${payMethod}</span>
        <p class="text-muted small mx-auto col-md-10 mb-4">
          Nuestra brigada de cocina ha comenzado la confección de tu menú. Te enviaremos una notificación cuando el despacho gourmet esté en camino.
        </p>
        <button type="button" class="btn btn-gold px-4 py-2 fw-semibold ripple-btn" id="btn-close-success-checkout">
          Aceptar y Continuar
        </button>
      </div>
    `;

    document.getElementById('btn-close-success-checkout').addEventListener('click', () => {
      closeCheckoutModal();
      location.reload();
    });
  }, 1400);
}

// =============================================================================
// 8. CU: RESERVA DE MESA (LIVE PREVIEW TICKET & VALIDACIONES)
// =============================================================================

function setupReservationDateLimits() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  DOM.resInputs.date.setAttribute('min', `${year}-${month}-${day}`);
}

/**
 * MICROINTERACCIÓN 13: Previsualización de Ticket de Reserva en Tiempo Real
 * Qué hace: A medida que el usuario escribe su nombre, escoge fecha, hora o cantidad de comensales,
 * el ticket interactivo se actualiza al instante con los datos ingresados.
 */
function updateReservationLivePreview() {
  const { name, guests, date, time } = DOM.resInputs;
  if (!DOM.reservationPreviewBox || !DOM.reservationPreviewText) return;

  if (name.value.trim() || guests.value || date.value || time.value) {
    DOM.reservationPreviewBox.classList.remove('d-none');
    const guestLabel = guests.options[guests.selectedIndex]?.text || `${guests.value} personas`;
    DOM.reservationPreviewText.innerHTML = `
      <div class="d-flex flex-wrap gap-3">
        <div><strong class="text-gold">Comensal:</strong> ${name.value.trim() || 'Por definir'}</div>
        <div><strong class="text-gold">Mesa:</strong> ${guests.value ? guestLabel : 'Por definir'}</div>
        <div><strong class="text-gold">Fecha:</strong> ${date.value || 'Por definir'}</div>
        <div><strong class="text-gold">Hora:</strong> ${time.value || 'Por definir'}</div>
      </div>
    `;
  } else {
    DOM.reservationPreviewBox.classList.add('d-none');
  }
}

function handleReservationSubmit(e) {
  e.preventDefault();
  let isValid = true;
  const { name, guests, date, time, notes } = DOM.resInputs;
  const { name: errName, guests: errGuests, date: errDate, time: errTime } = DOM.resErrors;

  errName.textContent = ''; 
  errGuests.textContent = ''; 
  errDate.textContent = ''; 
  errTime.textContent = '';
  [name, guests, date, time].forEach(i => i.classList.remove('input-error'));

  if (!name.value.trim()) { 
    errName.textContent = 'El nombre completo es requerido.'; 
    name.classList.add('input-error'); 
    isValid = false; 
  }
  if (!guests.value) { 
    errGuests.textContent = 'Por favor selecciona la cantidad de personas.'; 
    guests.classList.add('input-error'); 
    isValid = false; 
  }
  if (!date.value) { 
    errDate.textContent = 'Selecciona una fecha válida.'; 
    date.classList.add('input-error'); 
    isValid = false; 
  } else {
    const selectedDate = new Date(`${date.value}T00:00:00`);
    const today = new Date(); 
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) { 
      errDate.textContent = 'No puedes reservar en una fecha anterior a hoy.'; 
      date.classList.add('input-error'); 
      isValid = false; 
    }
  }
  if (!time.value) { 
    errTime.textContent = 'Indica la hora estimada de llegada.'; 
    time.classList.add('input-error'); 
    isValid = false; 
  }

  if (!isValid) {
    showToast('Verifica la reserva', 'Completa los campos obligatorios para agendar', 'bi-exclamation-circle text-danger');
    return;
  }

  // Guardar en almacenamiento local
  saveReservationToStorage({ 
    id: Date.now(), 
    name: name.value.trim(), 
    guests: guests.value, 
    date: date.value, 
    time: time.value, 
    notes: notes.value.trim(), 
    createdAt: new Date().toISOString() 
  });

  DOM.reservationForm.classList.add('d-none');
  DOM.reservationSuccessContainer.classList.remove('d-none');
  DOM.reservationDetails.innerHTML = `
    Reserva confirmada a nombre de <strong class="text-white">${name.value.trim()}</strong>.<br>
    Mesa para <strong class="text-white">${guests.value} persona(s)</strong> programada para el día 
    <strong class="text-white">${date.value}</strong> a las <strong class="text-white">${time.value}</strong>.
  `;

  showToast('¡Mesa Agendada!', `Te esperamos el ${date.value} a las ${time.value}`, 'bi-calendar-check-fill text-gold');
}

function resetReservationForm() {
  DOM.reservationForm.reset();
  DOM.reservationForm.classList.remove('d-none');
  DOM.reservationSuccessContainer.classList.add('d-none');
  if (DOM.reservationPreviewBox) DOM.reservationPreviewBox.classList.add('d-none');
}

function saveReservationToStorage(reservationData) {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.RESERVATIONS) || '[]');
  existing.push(reservationData);
  localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(existing));
}

// =============================================================================
// 9. INICIALIZACIÓN GENERAL DE LA APLICACIÓN
// =============================================================================

function initializeApp() {
  // Año actual dinámico en el footer
  if (DOM.currentYearSpan) {
    DOM.currentYearSpan.textContent = new Date().getFullYear().toString();
  }

  // Inicializar componentes Bootstrap 5 API
  if (window.bootstrap) {
    if (DOM.dishModal) {
      AppState.bsDishModal = bootstrap.Modal.getOrCreateInstance(DOM.dishModal);
    }
    if (DOM.checkoutModal) {
      AppState.bsCheckoutModal = bootstrap.Modal.getOrCreateInstance(DOM.checkoutModal);
    }
    if (DOM.cartSidebar) {
      AppState.bsCartOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(DOM.cartSidebar);
    }
  }

  // Microinteracciones globales
  initRippleEffect();
  initScrollTopButton();
  initNavbarScrollEffect();
  highlightCurrentScheduleDay();
  initSubwindowBlurSystem();

  // Búsqueda en vivo con botón interactivo de limpieza
  if (DOM.menuSearchInput) {
    DOM.menuSearchInput.addEventListener('input', (e) => {
      AppState.searchTerm = e.target.value;
      if (DOM.btnClearSearch) {
        if (AppState.searchTerm.length > 0) {
          DOM.btnClearSearch.classList.remove('d-none');
        } else {
          DOM.btnClearSearch.classList.add('d-none');
        }
      }
      renderDishesMenu();
    });
  }

  if (DOM.btnClearSearch) {
    DOM.btnClearSearch.addEventListener('click', () => {
      DOM.menuSearchInput.value = '';
      AppState.searchTerm = '';
      DOM.btnClearSearch.classList.add('d-none');
      renderDishesMenu();
      DOM.menuSearchInput.focus();
    });
  }

  // Switches dietéticos
  if (DOM.filterVegCheckbox) {
    DOM.filterVegCheckbox.addEventListener('change', (e) => {
      AppState.onlyVegetarian = e.target.checked;
      renderDishesMenu();
    });
  }

  if (DOM.filterGlutenCheckbox) {
    DOM.filterGlutenCheckbox.addEventListener('change', (e) => {
      AppState.onlyGlutenFree = e.target.checked;
      renderDishesMenu();
    });
  }

  // Selector de orden
  if (DOM.sortSelect) {
    DOM.sortSelect.addEventListener('change', (e) => {
      AppState.sortBy = e.target.value;
      renderDishesMenu();
    });
  }

  // Chips de categoría
  DOM.filterButtons().forEach(btn => {
    btn.addEventListener('click', (e) => {
      DOM.filterButtons().forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      AppState.activeCategory = e.currentTarget.getAttribute('data-category');
      renderDishesMenu();
    });
  });

  // Botón restablecer filtros en estado vacío
  if (DOM.btnResetFilters) {
    DOM.btnResetFilters.addEventListener('click', () => {
      AppState.searchTerm = '';
      AppState.activeCategory = 'all';
      AppState.onlyVegetarian = false;
      AppState.onlyGlutenFree = false;
      AppState.sortBy = 'default';

      if (DOM.menuSearchInput) DOM.menuSearchInput.value = '';
      if (DOM.btnClearSearch) DOM.btnClearSearch.classList.add('d-none');
      if (DOM.filterVegCheckbox) DOM.filterVegCheckbox.checked = false;
      if (DOM.filterGlutenCheckbox) DOM.filterGlutenCheckbox.checked = false;
      if (DOM.sortSelect) DOM.sortSelect.value = 'default';

      DOM.filterButtons().forEach(b => {
        if (b.getAttribute('data-category') === 'all') b.classList.add('active');
        else b.classList.remove('active');
      });

      renderDishesMenu();
    });
  }

  // Render inicial de la carta
  renderDishesMenu();

  // Listeners del modal de personalización
  if (DOM.dishModalConfirmBtn) {
    DOM.dishModalConfirmBtn.addEventListener('click', handleConfirmAddToCart);
  }

  // Listeners del checkout
  if (DOM.btnProceedCheckout) {
    DOM.btnProceedCheckout.addEventListener('click', openCheckoutModal);
  }
  if (DOM.checkoutForm) {
    DOM.checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  }
  Object.values(DOM.checkoutInputs).forEach(input => {
    if (input) input.addEventListener('input', () => input.classList.remove('input-error'));
  });
  initPaymentToggle();

  // Listeners de reserva
  setupReservationDateLimits();
  if (DOM.reservationForm) {
    DOM.reservationForm.addEventListener('submit', handleReservationSubmit);
  }
  if (DOM.btnNewReservation) {
    DOM.btnNewReservation.addEventListener('click', resetReservationForm);
  }

  // Listeners para la previsualización en vivo del ticket de reserva
  Object.values(DOM.resInputs).forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        input.classList.remove('input-error');
        updateReservationLivePreview();
      });
      input.addEventListener('change', updateReservationLivePreview);
    }
  });

  // Cargar carrito previo del cliente
  loadCartFromStorage();
}

// Arranque condicional al cargar el documento
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
