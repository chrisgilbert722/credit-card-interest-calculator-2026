import React from 'react';

export const SEOText: React.FC = () => {
    return (
        <div className="card" style={{ background: '#F8FAFC' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                This credit card interest calculator provides estimated interest charges based on
                your balance, APR, and monthly payment amount. Interest is calculated using daily
                or monthly compounding methods which may vary by card issuer. These figures are
                estimates only and actual interest charges may differ based on billing cycles,
                fees, and payment timing. This calculator is for informational purposes and does
                not constitute financial guidance.
            </p>
        </div>
    );
};
