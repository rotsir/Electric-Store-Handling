// Custom Testimonial Slider

document.addEventListener('DOMContentLoaded', () => {
  const sliderContainer = document.getElementById('testimonial-slider');
  
  if (sliderContainer) {
    const slides = Array.from(sliderContainer.querySelectorAll('.testimonial-slide'));
    if (slides.length === 0) return;

    // hide all except first
    slides.forEach((s, i) => {
      if (i !== 0) s.style.display = 'none';
      s.style.padding = '2rem';
      s.style.border = '2px solid var(--clr-dominant)';
      s.style.backgroundColor = 'var(--clr-surface)';
      s.style.position = 'relative';
    });

    let currentIndex = 0;

    const createControls = () => {
      const controls = document.createElement('div');
      controls.style.display = 'flex';
      controls.style.justifyContent = 'center';
      controls.style.gap = '1rem';
      controls.style.marginTop = '1rem';

      const prevBtn = document.createElement('button');
      prevBtn.innerHTML = '◄';
      prevBtn.className = 'btn btn-outline';
      prevBtn.style.padding = '0.5rem 1rem';
      
      const nextBtn = document.createElement('button');
      nextBtn.innerHTML = '►';
      nextBtn.className = 'btn btn-primary';
      nextBtn.style.padding = '0.5rem 1rem';

      controls.appendChild(prevBtn);
      controls.appendChild(nextBtn);
      sliderContainer.appendChild(controls);

      prevBtn.addEventListener('click', () => changeSlide(-1));
      nextBtn.addEventListener('click', () => changeSlide(1));
    };

    const changeSlide = (dir) => {
      slides[currentIndex].style.display = 'none';
      slides[currentIndex].classList.remove('slide-in');
      
      currentIndex += dir;
      if (currentIndex >= slides.length) currentIndex = 0;
      if (currentIndex < 0) currentIndex = slides.length - 1;

      slides[currentIndex].style.display = 'block';
      slides[currentIndex].classList.add('slide-in');
    };

    createControls();
    
    // Autoplay feature optional
    // setInterval(() => changeSlide(1), 5000);
  }
});
