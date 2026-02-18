document.addEventListener('DOMContentLoaded', function () {
    const existingModal = document.getElementById('imageModal');
    const modal = existingModal || createModal();
    const modalImg = modal.querySelector('#modalImage');
    const closeBtn = modal.querySelector('.close');

    const pageImages = Array.from(document.querySelectorAll('img')).filter(img => {
        if (img.closest('.modal')) {
            return false;
        }

        const isNoZoom = img.dataset.noZoom === 'true' || img.classList.contains('no-zoom');
        return !isNoZoom;
    });

    pageImages.forEach(img => {
        img.classList.add('zoomable-image');
        img.addEventListener('click', function () {
            openModal(this);
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', function (event) {
        const clickedCloseButton = event.target === closeBtn;

        if (!clickedCloseButton) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    function openModal(image) {
        modalImg.src = image.currentSrc || image.src;
        modalImg.alt = image.alt || 'Image agrandie';
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        modalImg.src = '';
        document.body.style.overflow = '';
    }

    function createModal() {
        const modalEl = document.createElement('div');
        modalEl.id = 'imageModal';
        modalEl.className = 'modal';

        const closeEl = document.createElement('span');
        closeEl.className = 'close';
        closeEl.innerHTML = '&times;';

        const imgEl = document.createElement('img');
        imgEl.className = 'modal-content';
        imgEl.id = 'modalImage';
        imgEl.alt = '';

        modalEl.appendChild(closeEl);
        modalEl.appendChild(imgEl);
        document.body.appendChild(modalEl);

        return modalEl;
    }
});
