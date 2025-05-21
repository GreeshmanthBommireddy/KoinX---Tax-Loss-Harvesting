import React from 'react';
import { formatCurrency } from '../../utils/formatters';
import './index.css';

const PreHarvesting = ({ capitalGains, loading }) => {
  if (loading) {
    return (
      <div className="pre-harvesting-container loading">
        <h3>Pre Harvesting</h3>
        <p>Loading...</p>
      </div>
    );
  }

  const netCapitalGainsSTCG = capitalGains.stcg.profits - capitalGains.stcg.losses;
  const netCapitalGainsLTCG = capitalGains.ltcg.profits - capitalGains.ltcg.losses;
  const realisedCapitalGains = netCapitalGainsSTCG + netCapitalGainsLTCG;

  return (
    <div className="pre-harvesting-container">
      <h3>Pre Harvesting</h3>
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
      <div className="realised-gains">
        <span>Realised Capital Gains:</span>
        <span>{formatCurrency(realisedCapitalGains)}</span>
      </div>
    </div>
  );
};

export default PreHarvesting;