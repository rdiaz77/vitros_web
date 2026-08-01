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

  /* --- Menú móvil ---
     iOS Safari no respeta de forma confiable `overflow:hidden` en <body> para
     bloquear el scroll de fondo. Combinado con `position:fixed` en el panel
     del menú, esto puede hacer que el panel se dibuje relativo a la posición
     de scroll que tenía la página al abrirlo, en vez del tope real de la
     pantalla — dando la sensación de que el menú "no se despliega completo".
     Se fija el <body> en su lugar (position:fixed + top negativo) y se
     restaura el scroll exacto al cerrar, que es el patrón robusto para iOS. */
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  let lockedScrollY = 0;
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const opening = !mainNav.classList.contains('open');
      navToggle.classList.toggle('open', opening);
      mainNav.classList.toggle('open', opening);
      if (opening) {
        lockedScrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${lockedScrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
      } else {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        window.scrollTo(0, lockedScrollY);
      }
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

  /* --- Envío de formularios reales vía Web3Forms --- */
  document.querySelectorAll('form[data-web3form]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const feedback = form.querySelector('.form-feedback');
      const button = form.querySelector('button[type="submit"]');
      const buttonLabel = button ? button.innerHTML : '';

      if (button) { button.disabled = true; button.style.opacity = '0.7'; }
      if (feedback) { feedback.classList.remove('show'); feedback.style.color = ''; feedback.style.background = ''; }

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form).entries()))
        });
        const result = await response.json();

        if (feedback) {
          if (result.success) {
            feedback.textContent = '¡Gracias! Tu mensaje fue enviado. Nuestro equipo te contactará a la brevedad.';
          } else {
            feedback.textContent = 'No pudimos enviar tu mensaje. Intenta nuevamente o escríbenos directo a ventas@vitroscience.cl.';
            feedback.style.color = '#b3261e';
            feedback.style.background = 'rgba(179,38,30,0.1)';
          }
          feedback.classList.add('show');
        }
        if (result.success) form.reset();
      } catch (err) {
        if (feedback) {
          feedback.textContent = 'No pudimos enviar tu mensaje. Intenta nuevamente o escríbenos directo a ventas@vitroscience.cl.';
          feedback.style.color = '#b3261e';
          feedback.style.background = 'rgba(179,38,30,0.1)';
          feedback.classList.add('show');
        }
      } finally {
        if (button) { button.disabled = false; button.style.opacity = ''; button.innerHTML = buttonLabel; }
      }
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
