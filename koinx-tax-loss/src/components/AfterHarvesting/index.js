import React from 'react';
import { formatCurrency } from '../../utils/formatters';
import './index.css';

const AfterHarvesting = ({ capitalGains, preHarvestingRealisedGains, loading }) => {
  if (loading) {
    return (
      <div className="after-harvesting-container loading">
        <h3>After Harvesting</h3>
        <p>Loading...</p>
      </div>
    );
  }


  const netCapitalGainsSTCG = capitalGains.stcg.profits - capitalGains.stcg.losses;
  const netCapitalGainsLTCG = capitalGains.ltcg.profits - capitalGains.ltcg.losses;
  const effectiveCapitalGains = netCapitalGainsSTCG + netCapitalGainsLTCG;


  const savings = preHarvestingRealisedGains - effectiveCapitalGains;

  return (
    <div className="after-harvesting-container">
      <h3>After Harvesting</h3>
      <div className="table-wrapper">
        <div className="table-row header">
          <div></div>
          <div>Short-term</div>
          <div>Long-term</div>
        </div>
        <div className="table-row">
          <div>Profits</div>
          <div>{formatCurrency(capitalGains.stcg.profits)}</div>
          <div>{formatCurrency(capitalGains.ltcg.profits)}</div>
        </div>
        <div className="table-row">
          <div>Losses</div>
          <div>{formatCurrency(capitalGains.stcg.losses)}</div>
          <div>{formatCurrency(capitalGains.ltcg.losses)}</div>
        </div>
        <div className="table-row net-capital-gains">
          <div>Net Capital Gains</div>
          <div>{formatCurrency(netCapitalGainsSTCG)}</div>
          <div>{formatCurrency(netCapitalGainsLTCG)}</div>
        </div>
      </div>
      <div className="effective-gains">
        <span>Effective Capital Gains:</span>
        <span>{formatCurrency(effectiveCapitalGains)}</span>
      </div>
     
      {savings > 0 && (
        <p className="savings-message">
          You are going to save {formatCurrency(savings)}
        </p>
      )}
    </div>
  );
};

export default AfterHarvesting;