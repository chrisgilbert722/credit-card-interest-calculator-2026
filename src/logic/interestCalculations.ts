export interface InterestInput {
    balance: number;
    apr: number;
    monthlyPayment: number;
}

export interface InterestResult {
    monthlyInterestCost: number;
    totalInterestPaid: number;
    payoffMonths: number;
    payoffYears: number;
    totalAmountPaid: number;
    balance: number;
    apr: number;
    monthlyPayment: number;
    monthlyInterestRate: number;
    firstMonthPrincipal: number;
    canPayOff: boolean;
    payoffMessage: string;
}

export function calculateInterest(input: InterestInput): InterestResult {
    const balance = Math.max(0, input.balance);
    const apr = Math.max(0, Math.min(100, input.apr));
    const monthlyPayment = Math.max(0, input.monthlyPayment);

    const monthlyInterestRate = apr / 100 / 12;

    // Calculate first month's interest
    const monthlyInterestCost = balance * monthlyInterestRate;

    // Calculate first month's principal payment
    const firstMonthPrincipal = Math.max(0, monthlyPayment - monthlyInterestCost);

    // Check if payment covers interest
    const canPayOff = monthlyPayment > monthlyInterestCost || apr === 0;

    // Simulate payoff
    let remainingBalance = balance;
    let totalInterestPaid = 0;
    let payoffMonths = 0;
    const maxMonths = 600; // 50 years cap

    if (canPayOff && balance > 0 && monthlyPayment > 0) {
        while (remainingBalance > 0.01 && payoffMonths < maxMonths) {
            // Calculate interest for this month
            const monthInterest = remainingBalance * monthlyInterestRate;
            totalInterestPaid += monthInterest;

            // Add interest to balance
            remainingBalance += monthInterest;

            // Apply payment
            const payment = Math.min(monthlyPayment, remainingBalance);
            remainingBalance -= payment;

            payoffMonths++;
        }
    } else if (balance > 0 && monthlyPayment > 0 && !canPayOff) {
        // Payment doesn't cover interest
        payoffMonths = maxMonths;
        // Estimate interest (rough approximation)
        totalInterestPaid = monthlyInterestCost * maxMonths;
    }

    const payoffYears = payoffMonths / 12;
    const totalAmountPaid = balance + totalInterestPaid;

    // Generate payoff message
    let payoffMessage: string;
    if (balance === 0) {
        payoffMessage = 'No balance to pay';
    } else if (monthlyPayment === 0) {
        payoffMessage = 'Enter a monthly payment';
    } else if (!canPayOff) {
        payoffMessage = 'Payment does not cover monthly interest';
    } else if (payoffMonths >= maxMonths) {
        payoffMessage = 'Payoff exceeds 50 years';
    } else if (payoffMonths <= 12) {
        payoffMessage = 'Payoff within 1 year';
    } else if (payoffMonths <= 36) {
        payoffMessage = 'Payoff within 3 years';
    } else {
        payoffMessage = 'Consider increasing payment to reduce interest';
    }

    return {
        monthlyInterestCost,
        totalInterestPaid,
        payoffMonths,
        payoffYears,
        totalAmountPaid,
        balance,
        apr,
        monthlyPayment,
        monthlyInterestRate,
        firstMonthPrincipal,
        canPayOff,
        payoffMessage
    };
}
