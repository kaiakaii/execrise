function calculateThisAmount(play, perf) {
  let thisAmount = 0;
  switch (play.type) {
    case 'tragedy':
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case 'comedy':
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 * perf.audience;
      break;
    default:
      throw new Error(`unknown type: ${play.type}`);
  }
  return thisAmount;
}

function getFormat() {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;
}

function getVolumeCredits(volumeCredits, perf, play) {
  volumeCredits += Math.max(perf.audience - 30, 0);
  if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);
  return volumeCredits;
}

function getResultMessage(plays, perf, volumeCredits, totalAmount) {
  const play = plays[perf.playID];
  let thisAmount = calculateThisAmount(play, perf);
  volumeCredits = getVolumeCredits(volumeCredits, perf, play);
  totalAmount += thisAmount;
  return {play, thisAmount, volumeCredits, totalAmount};
}

function generateText(invoice, plays) {
  let result = `Statement for ${invoice.customer}\n`;
  let totalAmount = 0;
  let volumeCredits = 0;
  for (let perf of invoice.performances) {
    const resultMessage = getResultMessage(plays, perf, volumeCredits, totalAmount);
    volumeCredits = resultMessage.volumeCredits;
    totalAmount = resultMessage.totalAmount;
    result += ` ${resultMessage.play.name}: ${getFormat()(resultMessage.thisAmount / 100)} (${perf.audience} seats)\n`;
  }
  result += `Amount owed is ${getFormat()(totalAmount / 100)}\nYou earned ${volumeCredits} credits \n`;
  return result;
}
function generateHTML(invoice, plays) {
  let result = `<h1>Statement for ${invoice.customer}</h1>\n<table>\n<tr><th>play</th><th>seats</th><th>cost</th></tr>`;
  let totalAmount = 0;
  let volumeCredits = 0;
  for (let perf of invoice.performances) {
    const resultMessage = getResultMessage(plays, perf, volumeCredits, totalAmount);
    volumeCredits = resultMessage.volumeCredits;
    totalAmount = resultMessage.totalAmount;
    result += ` <tr><td>${resultMessage.play.name}</td><td>${perf.audience}</td><td>${getFormat()(resultMessage.thisAmount / 100)}</td></tr>\n`;
  }
  result += `</table>\n<p>Amount owed is <em>${getFormat()(totalAmount / 100)}</em></p>\n<p>You earned <em>${volumeCredits}</em> credits</p>\n`;
  return result;
}

function statement (invoice, plays) {
  return generateText(invoice, plays);
}
function statementHtml (invoice, plays) {
  return generateHTML(invoice, plays);
}

module.exports = {
  statement,statementHtml
};
