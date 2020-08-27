const test = require('ava');
const { statement } = require('../src/statement');

test('ALLAudience>30 test', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 55,
            },
            {
                'playID': 'as-like',
                'audience': 35,
            },
            {
                'playID': 'othello',
                'audience': 40,
            },
        ],
    };


    const plays = {
        'hamlet': {
            'name': 'Hamlet',
            'type': 'tragedy',
        },
        'as-like': {
            'name': 'As You Like It',
            'type': 'comedy',
        },
        'othello': {
            'name': 'Othello',
            'type': 'tragedy',
        },
    };
    const result = statement(invoice, plays);
    t.is(result, 'Statement for BigCo\n' +
        ' Hamlet: $650.00 (55 seats)\n' +
        ' As You Like It: $580.00 (35 seats)\n' +
        ' Othello: $500.00 (40 seats)\n' +
        'Amount owed is $1,730.00\n' +
        'You earned 47 credits \n');
});


test('TragedyAudience<=30 test', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 30,
            }
        ],
    };
    const plays = {
        'hamlet': {
            'name': 'Hamlet',
            'type': 'tragedy',
        }
    };
    const result = statement(invoice, plays);
    t.is(result, 'Statement for BigCo\n' +
        ' Hamlet: $400.00 (30 seats)\n' +
        'Amount owed is $400.00\n' +
        'You earned 0 credits \n');
});

test('TragedyAudience>30 test', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 31,
            }
        ],
    };
    const plays = {
        'hamlet': {
            'name': 'Hamlet',
            'type': 'tragedy',
        }
    };
    const result = statement(invoice, plays);
    t.is(result, 'Statement for BigCo\n' +
        ' Hamlet: $410.00 (31 seats)\n' +
        'Amount owed is $410.00\n' +
        'You earned 1 credits \n');
});
test('comedyAudience<=20 test', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'as-like',
                'audience': 20,
            }
        ],
    };
    const plays = {
        'as-like': {
            'name': 'As You Like It',
            'type': 'comedy',
        }
    };
    const result = statement(invoice, plays);
    t.is(result, 'Statement for BigCo\n' +
        ' As You Like It: $360.00 (20 seats)\n' +
        'Amount owed is $360.00\n' +
        'You earned 4 credits \n');
});

