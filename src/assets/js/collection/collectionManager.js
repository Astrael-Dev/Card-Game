document.addEventListener('DOMContentLoaded', function() {
    const collections = {
        origin: originPackCards,
        chaos: chaosPackCards,
        tropical: tropicalPackCards
    };

    const collectionContainers = {
        origin: document.getElementById('originCards'),
        chaos: document.getElementById('chaosCards'),
        tropical: document.getElementById('tropicalCards')
    };

    Object.keys(collections).forEach(pack => {
        const cards = collections[pack];
        const container = collectionContainers[pack];

        cards.forEach(card => {
            const cardSlot = document.createElement('div');
            cardSlot.className = 'card-slot';
            cardSlot.innerHTML = `
                <img src="${card.image}" alt="${card.name}">
                <div class="quantity">x1</div>
                <div class="rarity">${card.rarity}</div>
            `;
            container.appendChild(cardSlot);
        });
    });

    window.addCardToCollection = function(pack, card) {
        const container = collectionContainers[pack];
        const cardSlot = document.createElement('div');
        cardSlot.className = 'card-slot';
        cardSlot.innerHTML = `
            <img src="${card.image}" alt="${card.name}">
            <div class="quantity">x1</div>
            <div class="rarity">${card.rarity}</div>
        `;
        container.appendChild(cardSlot);
    };
});