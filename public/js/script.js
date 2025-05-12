// Show or Hide the Buttons
window.addEventListener('scroll', function () {
  const goToBottom = document.getElementById('goToBottom');
  const backToTop = document.getElementById('backToTop');
  
  if (window.scrollY > 200) {
    goToBottom.style.display = 'block';
    backToTop.style.display = 'block';
  } else {
    goToBottom.style.display = 'none';
    backToTop.style.display = 'none';
  }
});

// Scroll to Bottom (corrected)
document.getElementById('goToBottom').addEventListener('click', function () {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});
// Scroll to Top
document.getElementById('backToTop').addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Bootstrap form validation
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


