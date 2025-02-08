document.addEventListener('DOMContentLoaded', function() {
    const packs = [
        { name: 'Pack Origin', price: 100, logo: 'originlog.png', back: 'originback.png', class: 'origin', cards: originPackCards },
        { name: 'Pack Chaos', price: 200, logo: 'chaoslogo.png', back: 'chaosback.png', class: 'chaos', cards: chaosPackCards },
        { name: 'Pack Tropical', price: 300, logo: 'tropicallogo.png', back: 'tropicalback.png', class: 'tropical', cards: tropicalPackCards }
    ];

    const packsContainer = document.getElementById('packs-container');
    const cardsContainer = document.getElementById('cards-container');
    const cardsModal = document.getElementById('cardsModal');
    const modalSound = document.getElementById('modalSound'); // Get the audio element

    packs.forEach(pack => {
        const packItem = document.createElement('div');
        packItem.className = `pack-item ${pack.class || ''}`;
        packItem.innerHTML = `
            <h3>Pack <img src="assets/images/packlogo/${pack.logo}" alt="${pack.name} Logo"></h3>
            <img src="assets/images/cardbacks/${pack.back}" alt="Card Back" class="card-back-image">
            <p>Prix: $${pack.price}</p>
            <button onclick="buyPack('${pack.name}', ${pack.price}, '${pack.back}', ${JSON.stringify(pack.cards)}')">Acheter</button>
        `;
        packsContainer.appendChild(packItem);
    });

    window.buyPack = function(packName, packPrice, packBack, packCards) {
        const userMoneyElement = document.getElementById('user-money');
        let userMoney = parseInt(userMoneyElement.textContent.replace('$', ''));
        if (userMoney >= packPrice) {
            userMoney -= packPrice;
            userMoneyElement.textContent = `$${userMoney}`;
            displayCards(packName, packBack, JSON.parse(packCards));
        } else {
            alert('Vous n\'avez pas assez d\'argent.');
        }
    };

    function displayCards(packName, packBack, packCards) {
        const rarities = [
            { name: 'Commune', probability: 33.33, image: 'commune.png' },
            { name: 'Atypique', probability: 25, image: 'atypique.png' },
            { name: 'Rare', probability: 15, image: 'rare.png' },
            { name: 'Épique', probability: 10, image: 'epique.png' },
            { name: 'Légendaire', probability: 7, image: 'legendaire.png' },
            { name: 'Mythique', probability: 5, image: 'mythique.png' },
            { name: 'Exotique', probability: 3, image: 'exotique.png' },
            { name: 'Marché Noir', probability: 1, image: 'marchenoir.png' }
        ];

        cardsContainer.innerHTML = ''; // Clear previous cards
        cardsModal.style.display = 'block'; // Show modal
        modalSound.play(); // Play the modal sound effect

        let cardsFlipped = 0;

        for (let i = 0; i < 8; i++) { // Generate 8 cards
            const card = document.createElement('div');
            card.className = 'card';
            const cardInner = document.createElement('div');
            cardInner.className = 'card-inner';
            const cardFront = document.createElement('div');
            cardFront.className = 'card-front';
            cardFront.style.backgroundImage = `url('assets/images/cardbacks/${packBack}')`;
            const cardBack = document.createElement('div');
            cardBack.className = 'card-back';
            cardBack.innerHTML = '<p>Placeholder</p>';
            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            card.appendChild(cardInner);
            cardsContainer.appendChild(card);

            const rarityElement = document.createElement('img');
            rarityElement.className = 'card-rarity';
            rarityElement.style.display = 'none'; // Hide initially
            card.appendChild(rarityElement);

            card.addEventListener('click', function() {
                if (!cardInner.classList.contains('flipped')) {
                    cardInner.classList.add('flipped');
                    cardInner.style.transform = 'rotateY(180deg)';
                    const rarity = getRarity(rarities);
                    const cardData = getCardByRarity(packCards, rarity);
                    cardFront.style.backgroundImage = `url('${cardData.image}')`;
                    rarityElement.src = `assets/images/raretés/${rarity.image}`;
                    rarityElement.style.display = 'block'; // Show rarity image
                    cardsFlipped++;
                    addCardToCollection(packName, cardData);
                    if (cardsFlipped === 8) { // Check if all 8 cards are flipped
                        setTimeout(() => {
                            cardsModal.style.display = 'none';
                        }, 10000); // Hide modal after 10 seconds
                    }
                }
            });
        }
    }

    function getRarity(rarities) {
        const random = Math.random() * 100;
        let cumulativeProbability = 0;
        for (const rarity of rarities) {
            cumulativeProbability += rarity.probability;
            if (random <= cumulativeProbability) {
                return rarity;
            }
        }
        return rarities[0]; // Default to the first rarity if none matched
    }

    function getCardByRarity(cards, rarity) {
        const filteredCards = cards.filter(card => card.rarity === rarity.name);
        return filteredCards[Math.floor(Math.random() * filteredCards.length)];
    }

    function addCardToCollection(packName, cardData) {
        // Implement the logic to add the card to the user's collection
        console.log(`Added ${cardData.name} from ${packName} to the collection.`);
    }
});