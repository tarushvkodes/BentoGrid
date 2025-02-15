document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid-container');
    let page = 1;

    function createGridItem(imageUrl, text, type) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        
        if (type === 'image') {
            gridItem.classList.add('image-only');
            const img = document.createElement('img');
            img.src = imageUrl;
            // Add load event to ensure proper sizing
            img.onload = () => {
                gridItem.style.width = `${img.naturalWidth}px`;
                gridItem.style.height = `${img.naturalHeight}px`;
            };
            gridItem.appendChild(img);
        } else if (type === 'text') {
            gridItem.classList.add('text-only');
            const p = document.createElement('p');
            p.textContent = text;
            gridItem.appendChild(p);
        } else if (type === 'creator') {
            gridItem.classList.add('text-only', 'creator');
            const p = document.createElement('p');
            p.textContent = text;
            gridItem.appendChild(p);
        }
        return gridItem;
    }

    const texts = [
        'Welcome to BentoGrid!',
        'Easily create your own grid.',
        'Add your own images and text.',
        'Perfect for presentations.'
    ];

    function populateGrid(page) {
        for (let i = 0; i < 10; i++) {
            const width = 200 + Math.floor(Math.random() * 100);
            const height = 300 + Math.floor(Math.random() * 100);
            const imageUrl = `https://picsum.photos/${width}/${height}?random=${page * 10 + i}`;
            const gridItem = createGridItem(imageUrl, '', 'image');
            gridContainer.appendChild(gridItem);
        }
    }

    // Initial population with text boxes
    for (let i = 0; i < texts.length; i++) {
        const gridItem = createGridItem('', texts[i], 'text');
        gridContainer.appendChild(gridItem);
    }

    // Add creator text without extra spacing
    const creatorItem = createGridItem('', 'Created by Tarushv Kosgi', 'creator');
    gridContainer.appendChild(creatorItem);

    populateGrid(page);

    // Infinite scroll functionality
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            page++;
            populateGrid(page);
        }
    });
});