export const formatCurrency = (value, currencySymbol = '₹') => {
    if (typeof value !== 'number' || isNaN(value)) return `${currencySymbol}0.00`;
    return `${currencySymbol}${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const formatGain = (gain, currencySymbol = '₹') => {
    if (typeof gain !== 'number' || isNaN(gain)) return `${currencySymbol}0.00`;
    const formattedGain = gain.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return gain >= 0 ? `${currencySymbol}${formattedGain}` : `-${currencySymbol}${Math.abs(gain).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const formatQty = (qty) => {
    if (typeof qty !== 'number' || isNaN(qty)) return '0.0000';
    return qty.toFixed(4);
};