
function showTab(tabId) {
    let tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(function(content) {
        content.style.display = 'none';
    });
    document.getElementById(tabId).style.display = 'block';
}

function addToPortfolio(symbol, ltp, change, volume, action) {
    let portfolio = document.getElementById('portfolio');
    if (!document.querySelector('#portfolio table')) {
        let table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Symbol</th>
                    <th>LTP</th>
                    <th>% Chng</th>
                    <th>Volume</th>
                    <th>Quantity</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
        portfolio.appendChild(table);
    }

    let existingRow = document.querySelector(`#portfolio table tbody tr[data-symbol="${symbol}"]`);
    if (existingRow) {
        let quantityCell = existingRow.querySelector('.quantity');
        let currentQuantity = parseInt(quantityCell.textContent, 10);
        quantityCell.textContent = currentQuantity + 1;
    } else {
        let tableBody = document.querySelector('#portfolio table tbody');

        let row = document.createElement('tr');
        row.setAttribute('data-symbol', symbol); 
        row.innerHTML = `
            <td>${symbol}</td>
            <td>${ltp}</td>
            <td>${change}</td>
            <td>${volume}</td>
            <td class="quantity">1</td>
            <td>
                <button onclick="changeQuantity('${symbol}', -1)">-</button>
                <button onclick="changeQuantity('${symbol}', 1)">+</button>
                <button>${action.toUpperCase()}</button>
            </td>
        `;
        tableBody.appendChild(row);
    }
    showTab('portfolio');
}

function changeQuantity(symbol, change) {
    let row = document.querySelector(`#portfolio table tbody tr[data-symbol="${symbol}"]`);
    if (row) {
        let quantityCell = row.querySelector('.quantity');
        let currentQuantity = parseInt(quantityCell.textContent, 10);
        let newQuantity = currentQuantity + change;

        if (newQuantity < 1) {
            newQuantity = 1;
        }

        quantityCell.textContent = newQuantity;
    }
}

function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });
    document.getElementById(tabName).style.display = 'block';
}
