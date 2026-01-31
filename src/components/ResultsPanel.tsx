import React from 'react';
import type { InterestResult } from '../logic/interestCalculations';

interface ResultsPanelProps {
    result: InterestResult;
}

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
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
    return `${years} yr${years !== 1 ? 's' : ''} ${remainingMonths} mo`;
};

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ result }) => {
    const isHighInterest = result.monthlyInterestCost > result.monthlyPayment * 0.5;

    return (
        <div className="card" style={{
            background: isHighInterest
                ? 'linear-gradient(to bottom, #FEF3C7, #FDE68A)'
                : 'linear-gradient(to bottom, #F0F9FF, #E0F2FE)',
            borderColor: isHighInterest ? '#FCD34D' : '#7DD3FC',
            boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.1)'
        }}>
            <div className="text-center">
                <h2 style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                    Estimated Monthly Interest Cost
                </h2>
                <div style={{
                    fontSize: '2.75rem',
                    fontWeight: 800,
                    color: isHighInterest ? '#B91C1C' : '#0369A1',
                    lineHeight: 1,
                    letterSpacing: '-0.025em'
                }}>
                    {formatCurrency(result.monthlyInterestCost)}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
                    {result.payoffMessage}
                </div>
            </div>

            <hr style={{
                margin: 'var(--space-6) 0',
                border: 'none',
                borderTop: `1px solid ${isHighInterest ? '#FCD34D' : '#7DD3FC'}`
            }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-2)', textAlign: 'center' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>TOTAL INTEREST</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem', color: '#B91C1C' }}>
                        {formatCurrency(result.totalInterestPaid)}
                    </div>
                </div>
                <div style={{ borderLeft: `1px solid ${isHighInterest ? '#FCD34D' : '#7DD3FC'}`, borderRight: `1px solid ${isHighInterest ? '#FCD34D' : '#7DD3FC'}` }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>PAYOFF TIME</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>
                        {formatTime(result.payoffMonths)}
                    </div>
                </div>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>PRINCIPAL PAID</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem', color: '#166534' }}>
                        {formatCurrency(result.firstMonthPrincipal)}
                    </div>
                </div>
            </div>

            {!result.canPayOff && result.balance > 0 && (
                <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: '#FEE2E2', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.875rem', color: '#B91C1C' }}>
                        Payment does not cover monthly interest charge
                    </span>
                </div>
            )}
        </div>
    );
};
