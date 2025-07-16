const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.overlay');
const dropdowns = document.querySelectorAll('.dropdown');


menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});


overlay.addEventListener('click', function() {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
});


dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    
 
    if (window.matchMedia('(max-width: 900px)').matches) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('open');
        });
    }
});


window.addEventListener('resize', function() {
    if (window.innerWidth > 900) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        
   
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('open');
        });
    }
});

  // Cart state
  let cart = [];
  let selectedSizes = {};
  

  // DOM elements
  const cartIcon = document.getElementById('cartIcon');
  const cartOverlay = document.getElementById('cartOverlay');
  const closeCart = document.getElementById('closeCart');
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');


  //new
  function disableAddToCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
      const productId = btn.dataset.id;
      if (!selectedSizes[productId]) {
        btn.setAttribute('disabled', 'true');
      }
    });
  }

//new - loaded
  function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      cart = JSON.parse(storedCart);
    }
      updateCartCount();
 }
  
  //new
  document.addEventListener("DOMContentLoaded", () => {
    loadCartFromLocalStorage();
    setupEventListeners();
    disableAddToCartButtons();
  });

//new
  function showAddedAnimation(btn) {
    btn.classList.add("added-animation");
    btn.textContent = "Added!";
    
    setTimeout(() => {
      btn.classList.remove("added-animation");
      btn.textContent = "Add to Cart";
    }, 1000);
  }


  // Set up event listeners
  function setupEventListeners() {
    // Size button clicks
    document.querySelectorAll('.size-btn').forEach(btn => {
      btn.addEventListener('click', handleSizeSelection);
    });

    // Add to cart button clicks
    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', handleAddToCart);
    });

    // Cart icon click
    cartIcon.addEventListener('click', openCart);

    // Close cart
    closeCart.addEventListener('click', () => {
      cartOverlay.style.display = 'none';
    });
  }

  // Handle size selection
  function handleSizeSelection(e) {
    const btn = e.target;
    const size = btn.dataset.size;
    const productId = btn.parentElement.dataset.productId;
    
    // Remove selection from other size buttons for this product
    btn.parentElement.querySelectorAll('.size-btn').forEach(sizeBtn => {
      sizeBtn.classList.remove('selected');
    });
    
    // Select this size
    btn.classList.add('selected');
    selectedSizes[productId] = size;
    
    // Enable add to cart button
    const addToCartBtn = document.querySelector('.add-to-cart[data-id="' + productId + '"]');
    if (addToCartBtn) {
    addToCartBtn.removeAttribute('disabled');
  }
}

  // Handle add to cart
  function handleAddToCart(e) {
    const btn = e.target;
    const productId = btn.dataset.id;
    const selectedSize = selectedSizes[productId];
   
    
    if (!selectedSize) return;
    
    const productName = btn.dataset.name;
    const productPrice = parseFloat(btn.dataset.price);
    const productImgSrc = btn.closest('.product').querySelector('img').src;
   
    alert("Item added to cart");
    
    // Add to cart
    cart.push({
      id: Date.now(), 
      productId,
      name: productName,
      price: productPrice,
      size: selectedSize,
      image: productImgSrc
  
    });
    
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    showAddedAnimation(btn);
  }

  // Show animation when added to cart
  function showAddedAnimation(btn) {
    const originalText = btn.textContent;
    btn.textContent = "Added!";
    btn.style.backgroundColor = "#27ae60";
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.backgroundColor = "";
    }, 1000);
  }

  // Update cart count - new
  function updateCartCount() {
    console.log("Cart count updated:", cart.length);
    cartCount.textContent = cart.length;
  }

  // Open cart
  function openCart() {
    renderCartItems();
    cartOverlay.style.display = 'flex';
  }

  // Render cart items
  function renderCartItems() {
    if (cart.length === 0) {
      cartItems.innerHTML = '<p>Your cart is empty.</p>';
      cartTotal.textContent = '0.00';
      return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
      total += item.price;
      
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <img src="${item.image}" width="60" height="60" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>Size: ${item.size}</p>
          <p>$${item.price.toFixed(2)}</p>
        </div>
        <button class="remove-btn" data-cart-item-id="${item.id}">&times;</button>
      `;
      
      cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = total.toFixed(2);
    
    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', handleRemoveCartItem);
    });
  }

  // Handle remove cart item
  function handleRemoveCartItem(e) {
    const btn = e.target;
    const cartItemId = parseInt(btn.dataset.cartItemId);
    
    cart = cart.filter(item => item.id !== cartItemId);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupEventListeners();
});

const envelope = document.getElementById('envelope');
    const envelopeContainer = document.getElementById('envelopeContainer');
    const hintText = document.querySelector('.hint-text');
    
    envelopeContainer.addEventListener('click', function() {
      envelope.classList.toggle('open');
      if (envelope.classList.contains('open')) {
        hintText.textContent = 'Tap again to close';
      } else {
        hintText.textContent = 'Tap the envelope to open';
      }
    });
    
    if ('ontouchstart' in window) {
      hintText.textContent = 'Tap the envelope to open';
    } else {
      hintText.textContent = 'Click the envelope to open';
    }
    