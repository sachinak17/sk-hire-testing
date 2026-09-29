/**
 * AnimatedBackground System
 * Inspired by motion-primitives animated-background component.
 * Provides fluid spring-physics sliding background pills for navigation bars,
 * tab switchers, and button groups in pure Vanilla JavaScript & CSS.
 */

export class AnimatedBackground {
  /**
   * @param {HTMLElement|string} container - The container element or selector
   * @param {Object} options - Configuration options
   */
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    if (!this.container) return;

    this.options = {
      itemSelector: options.itemSelector || 'button, a, .nav-item, .auth-tab-btn, .prep-tab-btn, .lang-tab-btn, .subcat-pill',
      activeClass: options.activeClass || 'active',
      pillClass: options.pillClass || 'animated-bg-pill',
      enableHover: options.enableHover !== undefined ? options.enableHover : true,
      transitionDuration: options.transitionDuration || '0.36s',
      transitionEasing: options.transitionEasing || 'cubic-bezier(0.16, 1, 0.3, 1)',
      onValueChange: options.onValueChange || null,
      customPillClass: options.customPillClass || '',
      ...options
    };

    this.pill = null;
    this.activeItem = null;
    this.hoveredItem = null;
    this.items = [];
    this.resizeObserver = null;
    this.mutationObserver = null;
    this.isInitialized = false;

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleResize = this.handleResize.bind(this);

    this.init();
  }

  init() {
    if (!this.container) return;

    // Ensure container has relative positioning for the absolute pill
    const computedPosition = window.getComputedStyle(this.container).position;
    if (computedPosition === 'static') {
      this.container.style.position = 'relative';
    }

    // Add marker class for CSS styling
    this.container.classList.add('has-animated-bg');

    // Create or retrieve pill element
    let pill = this.container.querySelector(`:scope > .${this.options.pillClass}`);
    if (!pill) {
      pill = document.createElement('div');
      pill.className = `${this.options.pillClass} ${this.options.customPillClass}`.trim();
      pill.setAttribute('aria-hidden', 'true');
      this.container.prepend(pill);
    }
    this.pill = pill;

    // Apply baseline inline styles for hardware-accelerated movement
    Object.assign(this.pill.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      pointerEvents: 'none',
      zIndex: '1',
      willChange: 'transform, width, height, opacity',
      transition: `transform ${this.options.transitionDuration} ${this.options.transitionEasing}, width ${this.options.transitionDuration} ${this.options.transitionEasing}, height ${this.options.transitionDuration} ${this.options.transitionEasing}, opacity 0.2s ease`,
      opacity: '0'
    });

    this.bindEvents();
    this.setupObservers();

    // Position initially after render tick
    requestAnimationFrame(() => {
      this.updateActiveFromDOM(true);
      setTimeout(() => {
        this.isInitialized = true;
      }, 50);
    });
  }

  getItems() {
    if (!this.container) return [];
    return Array.from(this.container.querySelectorAll(this.options.itemSelector));
  }

  bindEvents() {
    this.items = this.getItems();

    this.items.forEach(item => {
      // Ensure item sits above the pill
      if (!item.style.position || item.style.position === 'static') {
        item.style.position = 'relative';
      }
      item.style.zIndex = '2';

      if (this.options.enableHover) {
        item.addEventListener('mouseenter', this.handleMouseEnter);
      }
      item.addEventListener('click', this.handleClick);
    });

    if (this.options.enableHover) {
      this.container.addEventListener('mouseleave', this.handleMouseLeave);
    }
  }

  unbindEvents() {
    this.items.forEach(item => {
      item.removeEventListener('mouseenter', this.handleMouseEnter);
      item.removeEventListener('click', this.handleClick);
    });
    this.container.removeEventListener('mouseleave', this.handleMouseLeave);
  }

  setupObservers() {
    // 1. ResizeObserver for fluid responsiveness
    if (window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        this.updatePosition(this.hoveredItem || this.activeItem, !this.isInitialized);
      });
      this.resizeObserver.observe(this.container);
      this.items.forEach(item => this.resizeObserver.observe(item));
    } else {
      window.addEventListener('resize', this.handleResize);
    }

    // 2. MutationObserver to automatically detect active class changes from external scripts
    if (window.MutationObserver) {
      this.mutationObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const target = mutation.target;
            if (target.classList.contains(this.options.activeClass) && target !== this.activeItem) {
              this.activeItem = target;
              if (!this.hoveredItem) {
                this.updatePosition(this.activeItem);
              }
            }
          }
        }
      });

      this.items.forEach(item => {
        this.mutationObserver.observe(item, { attributes: true, attributeFilter: ['class'] });
      });
    }

    // 3. Document fonts ready handling for sharp text alignment
    if (document.fonts) {
      document.fonts.ready.then(() => {
        this.updatePosition(this.hoveredItem || this.activeItem, true);
      }).catch(() => {});
    }
  }

  handleMouseEnter(e) {
    const item = e.currentTarget;
    this.hoveredItem = item;
    this.updatePosition(item);
  }

  handleMouseLeave() {
    this.hoveredItem = null;
    if (this.activeItem) {
      this.updatePosition(this.activeItem);
    } else {
      this.updatePosition(null);
    }
  }

  handleClick(e) {
    const item = e.currentTarget;
    this.activeItem = item;
    this.updatePosition(item);

    if (typeof this.options.onValueChange === 'function') {
      const id = item.dataset.id || item.dataset.view || item.dataset.tab || item.id || null;
      this.options.onValueChange(id, item);
    }
  }

  handleResize() {
    this.updatePosition(this.hoveredItem || this.activeItem, true);
  }

  /**
   * Update the active item based on DOM class state
   * @param {boolean} immediate - Skip transition if true
   */
  updateActiveFromDOM(immediate = false) {
    this.items = this.getItems();
    const active = this.items.find(i => i.classList.contains(this.options.activeClass));
    this.activeItem = active || null;
    this.updatePosition(this.activeItem, immediate);
  }

  /**
   * Smoothly move the pill to target item
   * @param {HTMLElement|null} targetItem
   * @param {boolean} immediate
   */
  updatePosition(targetItem, immediate = false) {
    if (!this.pill || !this.container) return;

    if (!targetItem || targetItem.offsetParent === null) {
      this.pill.style.opacity = '0';
      return;
    }

    const containerRect = this.container.getBoundingClientRect();
    const itemRect = targetItem.getBoundingClientRect();

    const left = itemRect.left - containerRect.left + this.container.scrollLeft;
    const top = itemRect.top - containerRect.top + this.container.scrollTop;
    const width = itemRect.width;
    const height = itemRect.height;

    if (immediate) {
      this.pill.style.transition = 'none';
    }

    this.pill.style.transform = `translate3d(${left}px, ${top}px, 0)`;
    this.pill.style.width = `${width}px`;
    this.pill.style.height = `${height}px`;
    this.pill.style.opacity = '1';

    if (immediate) {
      // Force repaint then restore spring transition
      void this.pill.offsetHeight;
      this.pill.style.transition = `transform ${this.options.transitionDuration} ${this.options.transitionEasing}, width ${this.options.transitionDuration} ${this.options.transitionEasing}, height ${this.options.transitionDuration} ${this.options.transitionEasing}, opacity 0.2s ease`;
    }
  }

  /**
   * Programmatically set active item
   * @param {HTMLElement|string} itemOrSelector
   * @param {boolean} immediate
   */
  setActive(itemOrSelector, immediate = false) {
    const item = typeof itemOrSelector === 'string' 
      ? this.container.querySelector(itemOrSelector) 
      : itemOrSelector;

    if (item && this.items.includes(item)) {
      this.items.forEach(i => i.classList.remove(this.options.activeClass));
      item.classList.add(this.options.activeClass);
      this.activeItem = item;
      this.updatePosition(item, immediate);
    }
  }

  /**
   * Refresh position and child items
   * @param {boolean} immediate
   */
  refresh(immediate = false) {
    this.unbindEvents();
    this.bindEvents();
    this.updateActiveFromDOM(immediate);
  }

  /**
   * Destroy instance and clean up
   */
  destroy() {
    this.unbindEvents();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
    window.removeEventListener('resize', this.handleResize);
    if (this.pill && this.pill.parentNode) {
      this.pill.parentNode.removeChild(this.pill);
    }
    if (this.container) {
      this.container.classList.remove('has-animated-bg');
    }
  }
}

/**
 * Convenience helper to initialize animated background on any container
 */
export function initAnimatedBackground(container, options = {}) {
  const el = typeof container === 'string' ? document.querySelector(container) : container;
  if (!el) return null;
  return new AnimatedBackground(el, options);
}
