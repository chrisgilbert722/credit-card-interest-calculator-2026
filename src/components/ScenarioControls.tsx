import React from 'react';
import type { InterestInput } from '../logic/interestCalculations';

interface ScenarioControlsProps {
    values: InterestInput;
    onChange: (field: keyof InterestInput, value: number | boolean) => void;
}

export const ScenarioControls: React.FC<ScenarioControlsProps> = ({ values, onChange }) => {
    const balanceOptions = [
        { label: '$2,500', value: 2500 },
        { label: '$5,000', value: 5000 },
        { label: '$10,000', value: 10000 },
        { label: '$15,000', value: 15000 },
    ];

    const aprOptions = [
        { label: '15%', value: 15 },
        { label: '20%', value: 20 },
        { label: '25%', value: 25 },
        { label: '30%', value: 30 },
    ];

    return (
        <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Quick Adjustments</h3>

            {/* Balance Quick Select */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ marginBottom: 'var(--space-2)' }}>Balance</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {balanceOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('balance', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.balance === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.balance === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.balance === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* APR Quick Select */}
            <div>
                <label style={{ marginBottom: 'var(--space-2)' }}>APR</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {aprOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('apr', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.apr === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.apr === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.apr === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
