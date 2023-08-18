const readline = require('readline');

function calculateTax(operations) {
  return operations.map(({ operation: op, 'unit-cost': unitCost, quantity }) => {
    let weightedAverage = 0;
    let totalQuantity = 0;

    if (op === 'buy') {
      totalQuantity += quantity;
      weightedAverage = ((totalQuantity - quantity) * weightedAverage + quantity * unitCost) / totalQuantity;
      return { tax: 0 };
    } else if (op === 'sell') {
      let profit = quantity * unitCost - quantity * weightedAverage;
      if (profit > 0) {
        let tax = profit * 0.2;
        return { tax: Math.round(tax) };
      } else {
        return { tax: 0 };
      }
    }
  });
}

function processInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let input = '';

  rl.on('line', (line) => {
    if (line.trim() === '') {
      return; // Ignorar linhas vazias
    }

    const operations = JSON.parse(line);
    const taxResult = calculateTax(operations);
    console.log(JSON.stringify(taxResult)); // Imprimir o valor após anexar o JSON de entrada
  });

  rl.on('close', () => {
    process.exit(0); // Sair do programa após ler todas as linhas de entrada
  });
}

processInput();


// entrada 1: [{"operation":"buy", "unit-cost":10.00, "quantity": 100}, {"operation":"sell", "unit-cost":15.00, "quantity": 50}, {"operation":"sell", "unit-cost":15.00, "quantity": 50}]