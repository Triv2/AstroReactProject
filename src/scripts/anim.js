const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
      if (entry.isIntersecting) {
          entry.target.classList.add('show');
      } else {
          entry.target.classList.remove('show');
      }
  });
});

const fadeElements = document.querySelector('.fadeleft');
fadeElements.forEach((el) => {observer.observe(el)});

const section = document.querySelector('section');