/**
 * @file app.js
 * @description Lógica interactiva para la Landing Page de AltaMesa Restaurant.
 */

const STORAGE_KEYS = {
  CART: 'altamesa_cart_items',
  RESERVATIONS: 'altamesa_reservations'
};

const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0
});

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

const AppState = {
  cart: [],
  pendingDish: null,
  searchTerm: '',
  onlyVegetarian: false,
  onlyGlutenFree: false,
  sortBy: 'default',
  activeCategory: 'all'
};

const DOM = {
  navbar: document.getElementById('navbar'),
  cartToggleBtn: document.getElementById('cart-toggle-btn'),
  cartCountBadge: document.getElementById('cart-count'),
  currentYearSpan: document.getElementById('current-year'),

  menuContainer: document.getElementById('menu-container'),
  menuSearchInput: document.getElementById('menu-search-input'),
  filterVegCheckbox: document.getElementById('filter-vegetarian-checkbox'),
  filterGlutenCheckbox: document.getElementById('filter-gluten-checkbox'),
  sortSelect: document.getElementById('sort-select'),
  filterButtons: () => document.querySelectorAll('.filter-btn'),
  noResultsMsg: document.getElementById('no-results-msg'),

  dishModal: document.getElementById('dish-customization-dialog'),
  dishModalTitle: document.getElementById('modal-dish-title'),
  dishModalDesc: document.getElementById('modal-dish-desc'),
  dishModalPrice: document.getElementById('modal-dish-price'),
  dishModalCloseBtn: document.getElementById('btn-close-dish-modal'),
  dishModalConfirmBtn: document.getElementById('btn-confirm-add-cart'),
  modalExclusionsList: document.getElementById('modal-exclusions-list'),
  dishExclusionCheckboxes: () => document.querySelectorAll('input[name="dish-exclusion"]'),

  cartSidebar: document.getElementById('cart-sidebar'),
  cartOverlay: document.getElementById('cart-overlay'),
  cartCloseBtn: document.getElementById('cart-close-btn'),
  cartItemsContainer: document.getElementById('cart-items-container'),
  cartSubtotalPrice: document.getElementById('cart-subtotal-price'),
  btnProceedCheckout: document.getElementById('btn-proceed-checkout'),

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
  cardFields: document.getElementById('card-fields'),
  cashNote: document.getElementById('cash-note'),
  cardNumber: document.getElementById('checkout-card-number'),
  cardExpiry: document.getElementById('checkout-card-expiry'),
  cardCvv: document.getElementById('checkout-card-cvv'),
  cardHolder: document.getElementById('checkout-card-holder'),
  btnConfirmCheckout: document.getElementById('btn-confirm-checkout'),

  reservationForm: document.getElementById('reservation-form'),
  reservationSuccessContainer: document.getElementById('reservation-success-container'),
  reservationDetails: document.getElementById('reservation-details'),
  btnNewReservation: document.getElementById('btn-new-reservation'),
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
  }
};

function loadCartFromStorage() {
  try {
    const serializedCart = localStorage.getItem(STORAGE_KEYS.CART);
    if (serializedCart) {
      AppState.cart = JSON.parse(serializedCart);
    } else {
      AppState.cart = [];
    }
  } catch (error) {
    AppState.cart = [];
  }
  updateCartUI();
}

function saveCartToStorage() {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(AppState.cart));
  updateCartUI();
}

function saveReservationToStorage(reservationData) {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.RESERVATIONS) || '[]');
  existing.push(reservationData);
  localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(existing));
}

function initNavbarScrollEffect() {
  const handleScroll = () => {
    if (window.scrollY > 50) {
      DOM.navbar.classList.add('scrolled');
    } else {
      DOM.navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

function renderDishesMenu() {
  if (!DOM.menuContainer) return;
  DOM.menuContainer.innerHTML = '';
  
  let hasResults = false;
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
      hasResults = true;

      const catHeader = document.createElement('h3');
      catHeader.className = 'menu-category-title';
      catHeader.textContent = cat === 'Fuertes' ? 'Platos Fuertes' : cat;
      DOM.menuContainer.appendChild(catHeader);

      const grid = document.createElement('div');
      grid.className = 'dishes-grid';

      filteredDishes.forEach(dish => {
        const card = document.createElement('article');
        card.className = 'dish-card';
        card.setAttribute('data-id', dish.id.toString());

        const vegBadge = dish.isVegetarian ? `<span class="dish-badge-veg"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;"><path d="M12 22c4.97-4.97 8-9.4 8-14a8 8 0 1 0-16 0c0 4.6 3.03 9.03 8 14z"></path><path d="M12 22V12"></path></svg>Veg</span>` : '';
        const gfBadge = dish.isGlutenFree ? `<span class="dish-badge-veg" style="top: 3rem; background: rgba(212,175,55,0.9);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>Sin Gluten</span>` : '';

        card.innerHTML = `
          <div class="dish-image-wrapper">
            <img src="${dish.image}" alt="${dish.name}" class="dish-img" loading="lazy">
            ${vegBadge}
            ${gfBadge}
          </div>
          <div class="dish-body">
            <h3 class="dish-title">${dish.name}</h3>
            <p class="dish-desc">${dish.description}</p>
            <div class="dish-footer">
              <span class="dish-price">${currencyFormatter.format(dish.price)}</span>
              <button type="button" class="btn btn-secondary btn-sm btn-open-dish-modal" data-id="${dish.id}">
                Añadir
              </button>
            </div>
          </div>
        `;
        grid.appendChild(card);
      });
      DOM.menuContainer.appendChild(grid);
    }
  });

  if (!hasResults) {
    DOM.noResultsMsg.classList.remove('hidden');
  } else {
    DOM.noResultsMsg.classList.add('hidden');
  }

  DOM.menuContainer.querySelectorAll('.btn-open-dish-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const dishId = parseInt(e.currentTarget.getAttribute('data-id'), 10);
      openDishCustomizationModal(dishId);
    });
  });
}

function openDishCustomizationModal(dishId) {
  const dish = DISHES_CATALOG.find(d => d.id === dishId);
  if (!dish) return;

  AppState.pendingDish = dish;
  DOM.dishModalTitle.textContent = dish.name;
  DOM.dishModalDesc.textContent = dish.description;
  DOM.dishModalPrice.textContent = currencyFormatter.format(dish.price);

  DOM.modalExclusionsList.innerHTML = '';
  dish.customizations.forEach(cust => {
    DOM.modalExclusionsList.innerHTML += `
      <label class="custom-checkbox-container">
        <input type="checkbox" name="dish-exclusion" value="${cust}">
        <span class="checkbox-custom"></span>
        <span class="checkbox-label">${cust}</span>
      </label>
    `;
  });

  if (typeof DOM.dishModal.showModal === 'function') {
    DOM.dishModal.showModal();
  } else {
    DOM.dishModal.setAttribute('open', 'true');
  }
  document.body.classList.add('modal-open');
}

function closeDishCustomizationModal() {
  if (typeof DOM.dishModal.close === 'function') {
    DOM.dishModal.close();
  } else {
    DOM.dishModal.removeAttribute('open');
  }
  document.body.classList.remove('modal-open');
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

  saveCartToStorage();
  closeDishCustomizationModal();
  openCartSidebar();
}

function openCartSidebar() {
  DOM.cartSidebar.classList.add('open');
  DOM.cartSidebar.setAttribute('aria-hidden', 'false');
  DOM.cartOverlay.classList.add('active');
  DOM.cartOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCartSidebar() {
  DOM.cartSidebar.classList.remove('open');
  DOM.cartSidebar.setAttribute('aria-hidden', 'true');
  DOM.cartOverlay.classList.remove('active');
  DOM.cartOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function updateItemQuantity(uniqueKey, delta) {
  const itemIndex = AppState.cart.findIndex(item => item.uniqueKey === uniqueKey);
  if (itemIndex === -1) return;
  AppState.cart[itemIndex].quantity += delta;
  if (AppState.cart[itemIndex].quantity <= 0) {
    AppState.cart.splice(itemIndex, 1);
  }
  saveCartToStorage();
}

function updateCartUI() {
  const totalItems = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  DOM.cartCountBadge.textContent = totalItems.toString();
  DOM.cartCountBadge.style.transform = 'scale(1.25)';
  setTimeout(() => { DOM.cartCountBadge.style.transform = 'scale(1)'; }, 150);

  DOM.cartItemsContainer.innerHTML = '';

  if (AppState.cart.length === 0) {
    DOM.cartItemsContainer.innerHTML = `
      <div class="cart-empty-message" style="text-align: center; margin: auto 0; color: #9ca3af;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="opacity:0.5; margin-bottom:1rem;"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        <p>Tu carrito está vacío</p>
        <span style="font-size: 0.85rem;">Agrega deliciosos platos de nuestra carta</span>
      </div>`;
    DOM.cartSubtotalPrice.textContent = currencyFormatter.format(0);
    DOM.btnProceedCheckout.disabled = true;
    return;
  }

  let subtotal = 0;
  const fragment = document.createDocumentFragment();

  AppState.cart.forEach(item => {
    const itemSubtotal = item.price * item.quantity;
    subtotal += itemSubtotal;
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    const exclusionsHTML = item.exclusions.length > 0 ? `<div class="cart-item-exclusions">Nota: ${item.exclusions.join(', ')}</div>` : '';

    itemElement.innerHTML = `
      <div class="cart-item-header">
        <div>
          <h4 class="cart-item-name">${item.name}</h4>
          ${exclusionsHTML}
        </div>
      </div>
      <div class="cart-item-actions">
        <div class="quantity-control">
          <button type="button" class="btn-qty btn-decrease" data-key="${item.uniqueKey}">-</button>
          <span class="item-qty-value">${item.quantity}</span>
          <button type="button" class="btn-qty btn-increase" data-key="${item.uniqueKey}">+</button>
        </div>
        <div class="cart-item-price-subtotal">${currencyFormatter.format(itemSubtotal)}</div>
      </div>
    `;
    fragment.appendChild(itemElement);
  });
  DOM.cartItemsContainer.appendChild(fragment);

  DOM.cartItemsContainer.querySelectorAll('.btn-decrease').forEach(btn => btn.addEventListener('click', (e) => updateItemQuantity(e.currentTarget.getAttribute('data-key'), -1)));
  DOM.cartItemsContainer.querySelectorAll('.btn-increase').forEach(btn => btn.addEventListener('click', (e) => updateItemQuantity(e.currentTarget.getAttribute('data-key'), 1)));

  DOM.cartSubtotalPrice.textContent = currencyFormatter.format(subtotal);
  DOM.btnProceedCheckout.disabled = false;
}

function openCheckoutModal() {
  closeCartSidebar();
  const total = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  DOM.checkoutTotalSpan.textContent = currencyFormatter.format(total);
  Object.values(DOM.checkoutInputs).forEach(input => input.classList.remove('input-error'));
  if (typeof DOM.checkoutModal.showModal === 'function') { DOM.checkoutModal.showModal(); } else { DOM.checkoutModal.setAttribute('open', 'true'); }
  document.body.classList.add('modal-open');
}

function closeCheckoutModal() {
  if (typeof DOM.checkoutModal.close === 'function') { DOM.checkoutModal.close(); } else { DOM.checkoutModal.removeAttribute('open'); }
  document.body.classList.remove('modal-open');
}

function initPaymentToggle() {
  const toggle = (isCash) => {
    if (isCash) {
      DOM.cardFields.classList.add('hidden');
      DOM.cashNote.classList.remove('hidden');
    } else {
      DOM.cardFields.classList.remove('hidden');
      DOM.cashNote.classList.add('hidden');
    }
  };

  DOM.payCashRadio.addEventListener('change', () => toggle(true));
  DOM.payCardRadio.addEventListener('change', () => toggle(false));

  // Formateo automático de número de tarjeta (grupos de 4)
  DOM.cardNumber.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 16);
    val = val.replace(/(.{4})/g, '$1 ').trim();
    e.target.value = val;
  });

  // Formateo MM/AA para vencimiento
  DOM.cardExpiry.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2);
    e.target.value = val;
  });

  // Solo dígitos en CVV
  DOM.cardCvv.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
  });

  // Nombre en tarjeta en mayúsculas
  DOM.cardHolder.addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase();
  });
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  let hasError = false;
  const inputs = DOM.checkoutInputs;

  // Validar campos básicos
  [inputs.name, inputs.address, inputs.phone].forEach(field => {
    if (!field.value.trim()) { field.classList.add('input-error'); hasError = true; } else { field.classList.remove('input-error'); }
  });

  // Si eligió tarjeta, validar campos de tarjeta
  const isCard = DOM.payCardRadio.checked;
  if (isCard) {
    const cardFields = [DOM.cardNumber, DOM.cardExpiry, DOM.cardCvv, DOM.cardHolder];
    cardFields.forEach(field => {
      if (!field.value.trim()) { field.classList.add('input-error'); hasError = true; } else { field.classList.remove('input-error'); }
    });
    // Validación básica de formato de tarjeta
    if (DOM.cardNumber.value.replace(/\s/g, '').length < 16) { DOM.cardNumber.classList.add('input-error'); hasError = true; }
    if (DOM.cardExpiry.value.length < 5) { DOM.cardExpiry.classList.add('input-error'); hasError = true; }
    if (DOM.cardCvv.value.length < 3) { DOM.cardCvv.classList.add('input-error'); hasError = true; }
  }

  if (hasError) return;

  DOM.btnConfirmCheckout.disabled = true;
  DOM.btnConfirmCheckout.textContent = isCard ? 'Procesando pago seguro...' : 'Confirmando pedido...';

  setTimeout(() => {
    AppState.cart = [];
    saveCartToStorage();
    const orderNumber = Math.floor(100 + Math.random() * 900);
    const payMethod = isCard ? 'Tarjeta de crédito/débito' : 'Efectivo al recibir';
    DOM.checkoutContent.innerHTML = `
      <div class="checkout-success-view" style="padding: 3rem 1.5rem; text-align: center;">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <h2 style="font-family: var(--font-serif); font-size: 1.85rem; color: #ffffff; margin: 1rem 0 0.5rem 0;">Pedido Exitoso #${orderNumber}</h2>
        <p style="color: var(--accent-color); font-size: 0.85rem; margin-bottom: 1rem; font-weight: 600; letter-spacing: 0.05em;">${payMethod.toUpperCase()}</p>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 2rem;">Nuestro equipo de cocina ha comenzado la preparación de tu orden. Te notificaremos cuando esté en camino.</p>
        <button type="button" class="btn btn-primary" id="btn-close-success-checkout">Aceptar y Continuar</button>
      </div>
    `;
    document.getElementById('btn-close-success-checkout').addEventListener('click', () => { closeCheckoutModal(); location.reload(); });
  }, 1500);
}

function setupReservationDateLimits() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  DOM.resInputs.date.setAttribute('min', `${year}-${month}-${day}`);
}

function handleReservationSubmit(e) {
  e.preventDefault();
  let isValid = true;
  const { name, guests, date, time, notes } = DOM.resInputs;
  const { name: errName, guests: errGuests, date: errDate, time: errTime } = DOM.resErrors;

  errName.textContent = ''; errGuests.textContent = ''; errDate.textContent = ''; errTime.textContent = '';
  [name, guests, date, time].forEach(i => i.classList.remove('input-error'));

  if (!name.value.trim()) { errName.textContent = 'Requerido.'; name.classList.add('input-error'); isValid = false; }
  if (!guests.value) { errGuests.textContent = 'Requerido.'; guests.classList.add('input-error'); isValid = false; }
  if (!date.value) { 
    errDate.textContent = 'Requerido.'; date.classList.add('input-error'); isValid = false; 
  } else {
    const selectedDate = new Date(`${date.value}T00:00:00`);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (selectedDate < today) { errDate.textContent = 'Fecha inválida.'; date.classList.add('input-error'); isValid = false; }
  }
  if (!time.value) { errTime.textContent = 'Requerido.'; time.classList.add('input-error'); isValid = false; }

  if (!isValid) return;

  saveReservationToStorage({ id: Date.now(), name: name.value.trim(), guests: guests.value, date: date.value, time: time.value, notes: notes.value.trim(), createdAt: new Date().toISOString() });
  DOM.reservationForm.style.display = 'none';
  DOM.reservationSuccessContainer.classList.remove('hidden');
  DOM.reservationDetails.textContent = `A nombre de ${name.value.trim()}, para ${guests.value} persona(s) el ${date.value} a las ${time.value}.`;
}

function resetReservationForm() {
  DOM.reservationForm.reset();
  DOM.reservationForm.style.display = 'block';
  DOM.reservationSuccessContainer.classList.add('hidden');
}

function initializeApp() {
  if (DOM.currentYearSpan) DOM.currentYearSpan.textContent = new Date().getFullYear().toString();
  
  initNavbarScrollEffect();
  
  if (DOM.menuSearchInput) {
    DOM.menuSearchInput.addEventListener('input', (e) => { AppState.searchTerm = e.target.value; renderDishesMenu(); });
  }
  if (DOM.filterVegCheckbox) {
    DOM.filterVegCheckbox.addEventListener('change', (e) => { AppState.onlyVegetarian = e.target.checked; renderDishesMenu(); });
  }
  if (DOM.filterGlutenCheckbox) {
    DOM.filterGlutenCheckbox.addEventListener('change', (e) => { AppState.onlyGlutenFree = e.target.checked; renderDishesMenu(); });
  }
  if (DOM.sortSelect) {
    DOM.sortSelect.addEventListener('change', (e) => { AppState.sortBy = e.target.value; renderDishesMenu(); });
  }

  DOM.filterButtons().forEach(btn => {
    btn.addEventListener("click", (e) => {
      DOM.filterButtons().forEach(b => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
      AppState.activeCategory = e.currentTarget.getAttribute("data-category");
      renderDishesMenu();
    });
  });

  renderDishesMenu();

  DOM.dishModalCloseBtn.addEventListener('click', closeDishCustomizationModal);
  DOM.dishModalConfirmBtn.addEventListener('click', handleConfirmAddToCart);
  DOM.dishModal.addEventListener('click', (e) => {
    const dialogDimensions = DOM.dishModal.getBoundingClientRect();
    if (e.clientX < dialogDimensions.left || e.clientX > dialogDimensions.right || e.clientY < dialogDimensions.top || e.clientY > dialogDimensions.bottom) { closeDishCustomizationModal(); }
  });

  DOM.cartToggleBtn.addEventListener('click', openCartSidebar);
  DOM.cartCloseBtn.addEventListener('click', closeCartSidebar);
  DOM.cartOverlay.addEventListener('click', closeCartSidebar);
  DOM.btnProceedCheckout.addEventListener('click', openCheckoutModal);

  DOM.checkoutCloseBtn.addEventListener('click', closeCheckoutModal);
  DOM.checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  Object.values(DOM.checkoutInputs).forEach(input => input.addEventListener('input', () => input.classList.remove('input-error')));
  initPaymentToggle();

  setupReservationDateLimits();
  DOM.reservationForm.addEventListener('submit', handleReservationSubmit);
  DOM.btnNewReservation.addEventListener('click', resetReservationForm);

  loadCartFromStorage();
}

if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', initializeApp); } else { initializeApp(); }
