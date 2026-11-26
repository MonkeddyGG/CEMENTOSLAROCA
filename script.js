document.addEventListener('DOMContentLoaded', () => {
    // 1. Año dinámico en el Footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Menú Hamburguesa Responsive
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            });
        });
    }

    // 3. Efecto Scroll en Header y Enlace Activo
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 110;
            const sectionId = current.getAttribute('id');
            const navItem = document.querySelector(`.nav-list a[href*="${sectionId}"]`);

            if (navItem) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navItem.classList.add('active');
                } else {
                    navItem.classList.remove('active');
                }
            }
        });
    });

    // 4. Autocompletar producto en el cotizador desde las tarjetas
    const productLinks = document.querySelectorAll('.card-link[data-product]');
    const productSelect = document.getElementById('producto');

    productLinks.forEach(link => {
        link.addEventListener('click', () => {
            const selectedProduct = link.getAttribute('data-product');
            if (productSelect && selectedProduct) {
                productSelect.value = selectedProduct;
            }
        });
    });

    // 5. Filtro de Galería de Imágenes
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // 6. Lightbox para ampliar imágenes de galería
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h4').textContent;
            const desc = item.querySelector('p').textContent;

            lightboxImg.src = img.src;
            lightboxCaption.textContent = `${title} — ${desc}`;
            lightbox.classList.add('active');
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }

    // 7. Formulario de Cotización (Envío directo a WhatsApp o Correo)
    const quoteForm = document.getElementById('quoteForm');
    const btnEmailQuote = document.getElementById('btnEmailQuote');
    const formFeedback = document.getElementById('formFeedback');

    function getQuoteData() {
        const nombre = document.getElementById('nombre').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const producto = document.getElementById('producto').value;
        const cantidad = document.getElementById('cantidad').value.trim();
        const sucursal = document.getElementById('sucursal').value;
        const detalles = document.getElementById('detalles').value.trim() || 'Sin comentarios adicionales';

        return { nombre, telefono, producto, cantidad, sucursal, detalles };
    }

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = getQuoteData();

            const whatsappNumber = '524776702979';
            const message = `*NUEVA COTIZACIÓN - CEMENTO LA ROCA*%0A%0A` +
                `*Cliente:* ${encodeURIComponent(data.nombre)}%0A` +
                `*Teléfono:* ${encodeURIComponent(data.telefono)}%0A` +
                `*Material:* ${encodeURIComponent(data.producto)}%0A` +
                `*Cantidad:* ${encodeURIComponent(data.cantidad)}%0A` +
                `*Sucursal / Entrega:* ${encodeURIComponent(data.sucursal)}%0A` +
                `*Detalles:* ${encodeURIComponent(data.detalles)}`;

            formFeedback.style.color = '#1B8A3D';
            formFeedback.textContent = 'Redirigiendo a WhatsApp con los datos de tu cotización...';

            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        });
    }

    if (btnEmailQuote) {
        btnEmailQuote.addEventListener('click', () => {
            if (!quoteForm.checkValidity()) {
                quoteForm.reportValidity();
                return;
            }

            const data = getQuoteData();
            const emailTo = 'cementolaroca@gmail.com';
            const subject = encodeURIComponent(`Cotización Web: ${data.producto} - ${data.nombre}`);
            const body = encodeURIComponent(
                `Hola equipo de Cemento La Roca,\n\nSolicito una cotización con los siguientes datos:\n\n` +
                `- Nombre / Empresa: ${data.nombre}\n` +
                `- Teléfono de contacto: ${data.telefono}\n` +
                `- Material requerido: ${data.producto}\n` +
                `- Cantidad estimada: ${data.cantidad}\n` +
                `- Sucursal o Zona de entrega: ${data.sucursal}\n` +
                `- Detalles adicionales: ${data.detalles}\n\nQuedo atento a su respuesta.`
            );

            formFeedback.style.color = '#D92323';
            formFeedback.textContent = 'Abriendo tu cliente de correo para enviar a cementolaroca@gmail.com...';

            window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
        });
    }
});