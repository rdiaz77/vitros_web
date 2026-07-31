/* ==========================================================================
   Vitroscience SpA — comportamiento global del sitio
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* --- Header: sombra al hacer scroll --- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 12);

    const backToTop = document.getElementById('back-to-top');
    if (backToTop) backToTop.classList.toggle('show', window.scrollY > 600);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Menú móvil --- */
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      mainNav.classList.toggle('open');
      document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
    });
  }

  /* --- Mega menú: toggle táctil en pantallas pequeñas --- */
  document.querySelectorAll('.main-nav > ul > li.has-mega > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 1080) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  /* --- Scroll reveal con IntersectionObserver --- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach((el, i) => {
      el.style.setProperty('--i', i % 8);
      io.observe(el);
    });
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* --- Botón volver arriba --- */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* --- Tabs producto --- */
  const tabNav = document.querySelector('.tab-nav');
  if (tabNav) {
    const buttons = tabNav.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab)?.classList.add('active');
      });
    });
  }

  /* --- Galería de producto --- */
  const thumbs = document.querySelectorAll('.gallery-thumbs button');
  const galleryMain = document.querySelector('.gallery-main');
  if (thumbs.length && galleryMain) {
    thumbs.forEach(t => {
      t.addEventListener('click', () => {
        thumbs.forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        galleryMain.innerHTML = t.innerHTML;
      });
    });
  }

  /* --- Tabs portal clientes (Iniciar sesión / Crear cuenta) --- */
  const loginTabs = document.querySelector('.login-tabs');
  if (loginTabs) {
    const buttons = loginTabs.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.login-panel').forEach(p => p.classList.add('is-hidden'));
        document.getElementById(btn.dataset.panel)?.classList.remove('is-hidden');
      });
    });
  }

  /* --- Envío de formularios (mock, sin backend) --- */
  document.querySelectorAll('form[data-mock-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = form.querySelector('.form-feedback');
      if (feedback) {
        feedback.textContent = '¡Gracias! Tu solicitud fue registrada. Nuestro equipo te contactará a la brevedad.';
        feedback.classList.add('show');
      }
      form.reset();
    });
  });

  /* --- Correo ofuscado (evita que bots de spam lo lean desde el HTML) --- */
  document.querySelectorAll('.mail-obfuscated').forEach(el => {
    const email = `${el.dataset.mailUser}@${el.dataset.mailDomain}`;
    el.textContent = email;
    el.setAttribute('role', 'link');
    el.setAttribute('tabindex', '0');
    const open = () => { window.location.href = `mailto:${email}`; };
    el.addEventListener('click', open);
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });

  /* --- Año dinámico en footer --- */
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
});
