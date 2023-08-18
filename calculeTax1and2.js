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
      taxesPaid.push({ tax: 0.00 });
    } else if (op === 'sell') {
      let profit = quantity * unitCost - quantity * weightedAverage;
      totalProfitLoss += profit;
      if (totalProfitLoss >= 0) {
        let tax = totalProfitLoss * 0.2;
        taxesPaid.push({ tax: parseFloat(tax.toFixed(2)) });
      } else {
        taxesPaid.push({ tax: 0.00 });
        totalProfitLoss = 0;
      }
    }
  }

  return taxesPaid;
}

function processInput() {
  const rl = readline.createInterface
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
        taxesPaid.push({ tax: 0.00 });
      } else if (op === 'sell') {
        let profit = quantity * unitCost - quantity * weightedAverage;
        totalProfitLoss += profit;
        if (totalProfitLoss >= 0) {
          let tax = totalProfitLoss * 0.2;
          taxesPaid.push({ tax: parseFloat(tax.toFixed(2)) });
        } else {
          taxesPaid.push({ tax: 0.00 });
          totalProfitLoss = 0;
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
    let simulations = [];
  
    rl.on('line', (line) => {
      input += line;
      if (line.trim() === ']') {
        const operations = JSON.parse(input);
        const taxesPaid = calculateTax(operations);
        simulations.push(taxesPaid);
        input = '';
      }
    });
  
    rl.on('close', () => {
      simulations.forEach((taxesPaid) => {
        console.log(JSON.stringify(taxesPaid, null, 2));
      });
      process.exit(0);
    });
  }
  
  processInput();
}