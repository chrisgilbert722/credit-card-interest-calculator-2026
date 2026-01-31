import React from 'react';
import type { InterestInput } from '../logic/interestCalculations';

interface InputCardProps {
    values: InterestInput;
    onChange: (field: keyof InterestInput, value: number | boolean) => void;
}

export const InputCard: React.FC<InputCardProps> = ({ values, onChange }) => {
    return (
        <div className="card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {/* Balance */}
                <div>
                    <label htmlFor="balance">Credit Card Balance ($)</label>
                    <input
                        type="number"
                        id="balance"
                        value={values.balance}
                        onChange={(e) => onChange('balance', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="100"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Your current credit card balance
                    </span>
                </div>

                {/* APR */}
                <div>
                    <label htmlFor="apr">Annual Percentage Rate (APR) %</label>
                    <input
                        type="number"
                        id="apr"
                        value={values.apr}
                        onChange={(e) => onChange('apr', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="100"
                        step="0.01"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Your card's annual interest rate (check your statement)
                    </span>
                </div>

                {/* Monthly Payment */}
                <div>
                    <label htmlFor="monthlyPayment">Monthly Payment ($)</label>
                    <input
                        type="number"
                        id="monthlyPayment"
                        value={values.monthlyPayment}
                        onChange={(e) => onChange('monthlyPayment', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="25"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        The amount you plan to pay each month
                    </span>
                </div>
            </div>
        </div>
    );
};
