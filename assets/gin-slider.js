document.addEventListener('DOMContentLoaded', function() {
  const sliders = document.querySelectorAll('.gin-slider');
  
  sliders.forEach(slider => {
    const sliderElement = slider.querySelector('.slider');
    const dots = slider.querySelectorAll('.slider-dot');
    const prevButton = slider.querySelector('.slider-button--prev');
    const nextButton = slider.querySelector('.slider-button--next');
    const totalSlides = dots.length;
    
    // Handle dot clicks
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const slideWidth = sliderElement.children[0].offsetWidth;
        sliderElement.scrollTo({
          left: slideWidth * index,
          behavior: 'smooth'
        });
        updateActiveDot(dots, index);
        updateButtonStates(prevButton, nextButton, index, totalSlides);
      });
    });
    
    // Update active dot and button states on scroll
    sliderElement.addEventListener('scroll', () => {
      const slideWidth = sliderElement.children[0].offsetWidth;
      const currentSlide = Math.round(sliderElement.scrollLeft / slideWidth);
      updateActiveDot(dots, currentSlide);
      updateButtonStates(prevButton, nextButton, currentSlide, totalSlides);
    });
    
    // Update dots and button states when using prev/next buttons
    [prevButton, nextButton].forEach(button => {
      if (button) {
        button.addEventListener('click', () => {
          setTimeout(() => {
            const slideWidth = sliderElement.children[0].offsetWidth;
            const currentSlide = Math.round(sliderElement.scrollLeft / slideWidth);
            updateActiveDot(dots, currentSlide);
            updateButtonStates(prevButton, nextButton, currentSlide, totalSlides);
          }, 50);
        });
      }
    });
    
    // Initialize button states
    updateButtonStates(prevButton, nextButton, 0, totalSlides);
  });
  
  function updateActiveDot(dots, activeIndex) {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
    });
  }
  
  function updateButtonStates(prevButton, nextButton, currentSlide, totalSlides) {
    if (prevButton) {
      prevButton.classList.toggle('disabled', currentSlide === 0);
    }
    if (nextButton) {
      nextButton.classList.toggle('disabled', currentSlide === totalSlides - 1);
    }
  }
});