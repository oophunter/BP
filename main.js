class LottoTicket extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const numbers = this.getAttribute('numbers').split(',').map(Number);
        const sortedNumbers = numbers.sort((a, b) => a - b);

        const style = document.createElement('style');
        style.textContent = `
            .ticket {
                display: flex;
                gap: 5px;
            }
            .number {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: #eee;
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: bold;
            }
        `;

        const ticket = document.createElement('div');
        ticket.classList.add('ticket');

        sortedNumbers.forEach(number => {
            const numDiv = document.createElement('div');
            numDiv.classList.add('number');
            numDiv.textContent = number;
            ticket.appendChild(numDiv);
        });

        this.shadowRoot.append(style, ticket);
    }
}

customElements.define('lotto-ticket', LottoTicket);

document.getElementById('generate-btn').addEventListener('click', () => {
    const lottoTicketsContainer = document.getElementById('lotto-tickets');
    lottoTicketsContainer.innerHTML = '';

    for (let i = 0; i < 5; i++) {
        const numbers = generateLottoNumbers();
        const lottoTicket = document.createElement('lotto-ticket');
        lottoTicket.setAttribute('numbers', numbers.join(','));
        lottoTicketsContainer.appendChild(lottoTicket);
    }
});

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers);
}