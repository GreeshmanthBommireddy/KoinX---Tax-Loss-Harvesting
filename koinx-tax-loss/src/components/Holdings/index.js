import React from 'react';
import { formatCurrency, formatGain, formatQty } from '../../utils/formatters';
import './index.css';

const Holdings = ({
  holdings,
  selectedHoldingIds,
  onSelectHolding,
  onSelectAllHoldings,
  loading,
  sortBy,
  sortOrder,
  onSort,
  showAllHoldings,
  toggleShowAllHoldings
}) => {
  const allSelected = holdings.length > 0 && selectedHoldingIds.length === holdings.length;
  const indeterminate = selectedHoldingIds.length > 0 && selectedHoldingIds.length < holdings.length;

  if (loading) {
    return (
      <div className="holdings-container loading">
        <h2>Holdings</h2>
        <p>Loading holdings...</p>
      </div>
    );
  }

  const getSortIndicator = (columnName) => {
    if (sortBy === columnName) {
      return sortOrder === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  // Limit holdings to 4 if showAllHoldings is false
  const displayedHoldings = showAllHoldings ? holdings : holdings.slice(0, 4);

  return (
    <div className="holdings-container">
      <div className="holdings-header">
        <h2>Holdings</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onSelectAllHoldings}
                ref={input => {
                  if (input) input.indeterminate = indeterminate;
                }}
              />
            </th>
            <th onClick={() => onSort('coinName')}>
              Asset {getSortIndicator('coinName')}
            </th>
            <th onClick={() => onSort('currentMarketRate')}>
              Holdings <br /> <span>Current Market Rate</span> {getSortIndicator('currentMarketRate')}
            </th>
            <th onClick={() => onSort('totalCurrentValue')}>
              Total Current Value {getSortIndicator('totalCurrentValue')}
            </th>
            <th onClick={() => onSort('averageBuyPrice')}>
              Avg. Buy Price {getSortIndicator('averageBuyPrice')}
            </th>
            <th onClick={() => onSort('stcgGain')}>
              Short-term <br /> <span>Gain/Loss</span> {getSortIndicator('stcgGain')}
            </th>
            <th onClick={() => onSort('ltcgGain')}>
              Long-term <br /> <span>Gain/Loss</span> {getSortIndicator('ltcgGain')}
            </th>
            <th>Amount to Sell</th>
            <th onClick={() => onSort('pnl')}>
              PNL {getSortIndicator('pnl')}
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedHoldings.length === 0 ? (
            <tr>
              <td colSpan="9">No holdings found.</td>
            </tr>
          ) : (
            displayedHoldings.map((holding) => {
              const isSelected = selectedHoldingIds.includes(holding.id);
              const pnl = holding.stcg.gain + holding.ltcg.gain;
              const currentHoldingValue = holding.currentPrice * holding.totalHolding;

              return (
                <tr key={holding.id} className={isSelected ? 'selected-row' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onSelectHolding(holding.id)}
                    />
                  </td>
                  <td className="asset-cell">
                    <img src={holding.logo} alt={holding.coinName} className="asset-logo" />
                    <div>
                      {holding.coin} <br /> <span>{holding.coinName}</span>
                    </div>
                  </td>
                  <td>
                    {formatQty(holding.totalHolding)} {holding.coin} <br />
                    <span>{formatCurrency(holding.currentPrice)}/{holding.coin}</span>
                  </td>
                  <td>{formatCurrency(currentHoldingValue)}</td>
                  <td>{formatCurrency(holding.averageBuyPrice)}</td>
                  <td className={holding.stcg.gain >= 0 ? 'gain' : 'loss'}>
                    {formatCurrency(holding.stcg.gain)} <br />
                    <span>{formatQty(holding.stcg.balance)} {holding.coin}</span>
                  </td>
                  <td className={holding.ltcg.gain >= 0 ? 'gain' : 'loss'}>
                    {formatCurrency(holding.ltcg.gain)} <br />
                    <span>{formatQty(holding.ltcg.balance)} {holding.coin}</span>
                  </td>
                  <td>
                    {isSelected ? `${formatQty(holding.totalHolding)} ${holding.coin}` : '-'}
                  </td>
                  <td className={pnl >= 0 ? 'gain' : 'loss'}>
                    {formatGain(pnl)}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {holdings.length > 4 && ( // Only show button if there are more than 4 holdings
        <button onClick={toggleShowAllHoldings} className="view-all-button">
          {showAllHoldings ? 'View Less' : 'View All'}
        </button>
      )}
    </div>
  );
};

export default Holdings;