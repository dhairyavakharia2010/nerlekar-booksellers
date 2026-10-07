(function() {
  'use strict';

  // --- Mobile menu toggle ---
  function initMobileMenu() {
    var openBtn = document.querySelector('[data-mobile-menu-open]');
    var closeBtn = document.querySelector('[data-mobile-menu-close]');
    var menu = document.querySelector('[data-mobile-menu]');
    var overlay = document.querySelector('[data-mobile-menu-overlay]');
    var categoryToggle = document.querySelector('[data-categories-toggle]');
    var categoryList = document.querySelector('[data-categories-list]');

    if (!openBtn || !menu) return;

    function open() {
      menu.classList.add('is-open');
      if (overlay) overlay.classList.add('is-visible');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      menu.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-visible');
      document.body.style.overflow = '';
    }

    if (openBtn) openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (overlay) overlay.addEventListener('click', close);

    if (categoryToggle && categoryList) {
      categoryToggle.addEventListener('click', function() {
        categoryList.classList.toggle('is-expanded');
        categoryToggle.classList.toggle('is-expanded');
      });
    }
  }

  // --- Header scroll effect ---
  function initHeaderScroll() {
    var header = document.querySelector('[data-site-header]');
    if (!header) return;
    var onScroll = function() {
      if (window.scrollY > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Quantity selectors ---
  function initQuantitySelectors() {
    document.querySelectorAll('[data-quantity-wrapper]').forEach(function(wrapper) {
      var input = wrapper.querySelector('[data-quantity-input]');
      var minus = wrapper.querySelector('[data-quantity-minus]');
      var plus = wrapper.querySelector('[data-quantity-plus]');

      if (minus) {
        minus.addEventListener('click', function() {
          var val = parseInt(input.value, 10) || 1;
          if (val > 1) {
            input.value = val - 1;
            dispatchChange(input);
          }
        });
      }
      if (plus) {
        plus.addEventListener('click', function() {
          var val = parseInt(input.value, 10) || 1;
          input.value = val + 1;
          dispatchChange(input);
        });
      }
    });
  }

  function dispatchChange(input) {
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // --- Cart fetch helpers ---
  function fetchCart() {
    return fetch(window.routes.cart_url + '.js', {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    }).then(function(r) { return r.json(); });
  }

  function updateCartCount() {
    fetchCart().then(function(cart) {
      var badges = document.querySelectorAll('[data-cart-count]');
      badges.forEach(function(badge) {
        badge.textContent = cart.item_count;
        badge.style.display = cart.item_count > 0 ? 'flex' : 'none';
      });
    });
  }

  // --- Add to cart (AJAX) ---
  function initAddToCart() {
    document.querySelectorAll('form[data-product-form]').forEach(function(form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var btn = form.querySelector('[data-add-to-cart-btn]');
        if (btn) {
          btn.disabled = true;
          btn.dataset.originalText = btn.innerHTML;
          btn.innerHTML = 'Adding...';
        }

        var formData = new FormData(form);
        fetch(window.routes.cart_add_url + '.js', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        })
        .then(function(r) { return r.json(); })
        .then(function() {
          if (btn) {
            btn.innerHTML = 'Added!';
            setTimeout(function() {
              btn.disabled = false;
              btn.innerHTML = btn.dataset.originalText;
            }, 1500);
          }
          updateCartCount();
          showToast('Added to cart');
        })
        .catch(function() {
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = btn.dataset.originalText;
          }
          showToast('Could not add item. Please try again.');
        });
      });
    });
  }

  // --- Toast ---
  function showToast(message) {
    var toast = document.querySelector('[data-toast]');
    if (!toast) return;
    var msg = toast.querySelector('[data-toast-message]');
    if (msg) msg.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function() {
      toast.classList.remove('is-visible');
    }, 3500);
  }

  // --- Toast dismiss ---
  function initToastDismiss() {
    var toast = document.querySelector('[data-toast]');
    var closeBtn = toast ? toast.querySelector('[data-toast-close]') : null;
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        toast.classList.remove('is-visible');
      });
    }
  }

  // --- Cart page quantity update ---
  function initCartUpdates() {
    document.querySelectorAll('[data-cart-quantity-form]').forEach(function(form) {
      var inputs = form.querySelectorAll('[data-quantity-input]');
      inputs.forEach(function(input) {
        input.addEventListener('change', function() {
          var key = input.getAttribute('data-line-key');
          var qty = parseInt(input.value, 10);
          fetch(window.routes.cart_change_url + '.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ id: key, quantity: qty })
          }).then(function(r) { return r.json(); }).then(function() {
            window.location.reload();
          });
        });
      });

      var removeBtns = form.querySelectorAll('[data-remove-item]');
      removeBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          var key = btn.getAttribute('data-line-key');
          fetch(window.routes.cart_change_url + '.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ id: key, quantity: 0 })
          }).then(function(r) { return r.json(); }).then(function() {
            window.location.reload();
          });
        });
      });
    });
  }

  // --- Predictive search ---
  function initPredictiveSearch() {
    var input = document.querySelector('[data-search-input]');
    var results = document.querySelector('[data-search-results]');
    if (!input || !results) return;

    var timer;
    input.addEventListener('input', function() {
      clearTimeout(timer);
      var query = input.value.trim();
      if (query.length < 2) {
        results.innerHTML = '';
        results.classList.remove('is-visible');
        return;
      }
      timer = setTimeout(function() {
        fetch('/search/suggest.json?q=' + encodeURIComponent(query) + '&resources[type]=product&resources[limit]=8')
          .then(function(r) { return r.json(); })
          .then(function(data) {
            var products = data.resources.results.products || [];
            if (products.length === 0) {
              results.innerHTML = '<p class="search-no-results">No books found for "' + query + '"</p>';
            } else {
              results.innerHTML = products.map(function(p) {
                var price = Shopify.formatMoney(p.price, '{{ shop.money_format }}');
                return '<a href="' + p.url + '" class="search-result-item">' +
                  '<span class="search-result-title">' + p.title + '</span>' +
                  '<span class="search-result-price">' + price + '</span>' +
                '</a>';
              }).join('');
            }
            results.classList.add('is-visible');
          });
      }, 300);
    });
  }

  // --- Search overlay toggle ---
  function initSearchOverlay() {
    var openBtn = document.querySelector('[data-search-open]');
    var closeBtn = document.querySelector('[data-search-close]');
    var overlay = document.querySelector('[data-search-overlay]');

    if (!overlay) return;

    function open() { overlay.classList.add('is-visible'); document.body.style.overflow = 'hidden'; }
    function close() { overlay.classList.remove('is-visible'); document.body.style.overflow = ''; }

    if (openBtn) openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') close();
    });
  }

  // --- Init all ---
  document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initHeaderScroll();
    initQuantitySelectors();
    initAddToCart();
    initToastDismiss();
    initCartUpdates();
    initPredictiveSearch();
    initSearchOverlay();
  });

  // Expose for inline calls
  window.NerlekarTheme = { showToast: showToast, updateCartCount: updateCartCount };
})();
