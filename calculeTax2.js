const readline = require('readline');

function calculateTax(operations) {
  let weightedAverage = 0;
  let totalQuantity = 0;
  let totalProfitLoss = 0;
  let taxesPaid = [];

  for (let operation of operations) {
    const { operation: op, 'unit-cost': unitCost, quantity } = operation;

    if (op === 'buy') {
      totalQuantity += quantity;
      weightedAverage = ((totalQuantity - quantity) * weightedAverage + quantity * unitCost) / totalQuantity;
      taxesPaid.push({ tax: 0 });
    } else if (op === 'sell') {
      let profit = quantity * unitCost - quantity * weightedAverage;
      totalProfitLoss += profit;
      if (totalProfitLoss >= 0) {
        let tax = totalProfitLoss * 0.2;
        taxesPaid.push({ tax: parseFloat(tax.toFixed(2)) });
      } else {
        taxesPaid.push({ tax: 0 });
      }
    }
  }

  return taxesPaid;
}

function processInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let input = '';

  rl.on('line', (line) => {
    input += line;
  });

  rl.on('close', () => {
    const lines = input.trim().split('\n');
    const taxesPaid = lines.map((line) => {
      const operations = JSON.parse(line);
      return calculateTax(operations);
    });
    console.log(JSON.stringify(taxesPaid, null, 2)); // Imprimir a saída formatada em JSON
    process.exit(0); // Sair do programa após ler todas as linhas de entrada
  });
}

processInput();


// [{"operation":"buy", "unit-cost":10.00, "quantity": 10000}, {"operation":"sell", "unit-cost":20.00, "quantity": 5000}, {"operation":"sell", "unit-cost":5.00, "quantity": 5000}]