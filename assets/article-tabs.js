  (function() {
    class TabSection extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        this.buttons = this.querySelectorAll('.tab-button');
        this.panels = this.querySelectorAll('.tab-panel');
        this.sliders = this.querySelectorAll('.slider-wrapper');
        this.arrows = this.querySelectorAll('.slider-arrow');
        
        this.setupEventListeners();
      }

      setupEventListeners() {
        this.buttons.forEach((button) => {
          button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            this.switchTab(tabId);
          });
        });

        this.arrows.forEach((arrow) => {
          arrow.addEventListener('click', () => {
            const sliderId = arrow.getAttribute('data-slider');
            const direction = arrow.getAttribute('data-direction');
            const slider = this.querySelector(`.slider-wrapper[data-slider="${sliderId}"]`);
            
            if (slider) {
              this.scrollSlider(slider, direction);
            }
          });
        });

        this.sliders.forEach((slider) => {
          slider.addEventListener('scroll', () => {
            this.updateArrowStates(slider);
          });
          this.updateArrowStates(slider);
        });
      }

      switchTab(tabId) {
        this.buttons.forEach((btn) => {
          const isActive = btn.getAttribute('data-tab') === tabId;
          btn.classList.toggle('active', isActive);
          btn.setAttribute('aria-selected', isActive);
        });

        this.panels.forEach((panel) => {
          const panelId = panel.getAttribute('id');
          const isActive = panelId === `tab-panel-${tabId}`;
          panel.classList.toggle('active', isActive);
        });
      }
    }

    customElements.define('tab-section', TabSection);
  })();

