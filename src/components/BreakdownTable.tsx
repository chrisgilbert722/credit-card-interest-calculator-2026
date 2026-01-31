import React from 'react';
import type { InterestResult } from '../logic/interestCalculations';

interface BreakdownTableProps {
    result: InterestResult;
}

const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(val);
};

const formatTime = (months: number): string => {
    if (months >= 600) {
        return '50+ years';
    }
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) {
        return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
    if (remainingMonths === 0) {
        return `${years} year${years !== 1 ? 's' : ''}`;
    }
    return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
};

export const BreakdownTable: React.FC<BreakdownTableProps> = ({ result }) => {
    const balanceRows = [
        { label: 'Estimated Current Balance', value: formatMoney(result.balance), isTotal: false },
        { label: 'Annual Percentage Rate (APR)', value: `${result.apr.toFixed(2)}%`, isTotal: false },
        { label: 'Monthly Interest Rate', value: `${(result.monthlyInterestRate * 100).toFixed(3)}%`, isTotal: false },
    ];

    const interestRows = [
        { label: 'Estimated Monthly Interest Charge', value: formatMoney(result.monthlyInterestCost), isTotal: false },
        { label: 'Estimated Monthly Principal Paid', value: formatMoney(result.firstMonthPrincipal), isTotal: false },
        { label: 'Estimated Monthly Payment', value: formatMoney(result.monthlyPayment), isTotal: true },
    ];

    const payoffRows = [
        { label: 'Estimated Payoff Duration', value: formatTime(result.payoffMonths), isTotal: false },
        { label: 'Estimated Total Interest Paid', value: formatMoney(result.totalInterestPaid), isTotal: false },
        { label: 'Estimated Total Amount Paid', value: formatMoney(result.totalAmountPaid), isTotal: true },
    ];

    const renderTable = (rows: Array<{ label: string; value: string; isTotal: boolean }>, isLast = false) => (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
            <tbody>
                {rows.map((row, idx) => (
                    <tr key={idx} style={{
                        borderBottom: (isLast && idx === rows.length - 1) ? 'none' : '1px solid var(--color-border)',
                        backgroundColor: idx % 2 === 0 ? 'transparent' : '#F8FAFC'
                    }}>
                        <td style={{ padding: 'var(--space-3) var(--space-6)', color: 'var(--color-text-secondary)' }}>
                            {row.label}
                        </td>
                        <td style={{
                            padding: 'var(--space-3) var(--space-6)',
                            textAlign: 'right',
                            fontWeight: row.isTotal ? 700 : 400,
                            color: row.isTotal ? 'var(--color-primary)' : 'inherit'
                        }}>
                            {row.value}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="card" style={{ padding: '0' }}>
            {/* Balance Details Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1rem' }}>Estimated Balance Details</h3>
            </div>
            {renderTable(balanceRows)}

            {/* Interest Breakdown Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#FEF3C7' }}>
                <h3 style={{ fontSize: '1rem', color: '#92400E' }}>Estimated First Month Breakdown</h3>
            </div>
            {renderTable(interestRows)}

            {/* Payoff Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#F8FAFC' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>Estimated Payoff Summary</h3>
            </div>
            {renderTable(payoffRows, true)}
        </div>
    );
};
