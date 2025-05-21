import React, { useState, useEffect, useCallback } from 'react';
import AfterHarvesting from "../AfterHarvesting";
import PreHarvesting from "../PreHarvesting";
import Holdings from "../Holdings";
import fetchHoldings from '../../data/holdingsData';
import fetchCapitalGains from '../../data/capitalGainsData';

import './index.css';

const KoinxBackground = () => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showImportantNotes, setShowImportantNotes] = useState(false);

  const [initialCapitalGains, setInitialCapitalGains] = useState({
    stcg: { profits: 0, losses: 0 },
    ltcg: { profits: 0, losses: 0 },
  });
  const [afterHarvestingGains, setAfterHarvestingGains] = useState({
    stcg: { profits: 0, losses: 0 },
    ltcg: { profits: 0, losses: 0 },
  });
  const [holdings, setHoldings] = useState([]);
  const [selectedHoldingIds, setSelectedHoldingIds] = useState([]);
  const [loadingCapitalGains, setLoadingCapitalGains] = useState(true);
  const [loadingHoldings, setLoadingHoldings] = useState(true);
  const [error, setError] = useState(null);

  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [showAllHoldings, setShowAllHoldings] = useState(false);

  
  const calculateHarvestedGains = useCallback((baseGains, selectedHoldingsArr) => {
    let currentStcgProfits = baseGains.stcg.profits;
    let currentStcgLosses = baseGains.stcg.losses;
    let currentLtcgProfits = baseGains.ltcg.profits;
    let currentLtcgLosses = baseGains.ltcg.losses;

    
    selectedHoldingsArr.forEach(holding => {
      
      if (holding.stcg.gain > 0) {
        currentStcgProfits += holding.stcg.gain;
      } else if (holding.stcg.gain < 0) {
        currentStcgLosses += Math.abs(holding.stcg.gain);
      }

      
      if (holding.ltcg.gain > 0) {
        currentLtcgProfits += holding.ltcg.gain;
      } else if (holding.ltcg.gain < 0) {
        currentLtcgLosses += Math.abs(holding.ltcg.gain);
      }
    });

    
    let stLossToOffsetStProfits = Math.min(currentStcgLosses, currentStcgProfits);
    currentStcgProfits -= stLossToOffsetStProfits;
    currentStcgLosses -= stLossToOffsetStProfits;

    
    let ltLossToOffsetLtProfits = Math.min(currentLtcgLosses, currentLtcgProfits);
    currentLtcgProfits -= ltLossToOffsetLtProfits;
    currentLtcgLosses -= ltLossToOffsetLtProfits;

    
    let stLossToOffsetLtProfits = Math.min(currentStcgLosses, currentLtcgProfits);
    currentLtcgProfits -= stLossToOffsetLtProfits;
    currentStcgLosses -= stLossToOffsetLtProfits;


    currentStcgProfits = Math.max(0, currentStcgProfits);
    currentLtcgProfits = Math.max(0, currentLtcgProfits);

    return {
      stcg: { profits: currentStcgProfits, losses: currentStcgLosses },
      ltcg: { profits: currentLtcgProfits, losses: currentLtcgLosses },
    };
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const capitalGainsResponse = await fetchCapitalGains();
        setInitialCapitalGains(capitalGainsResponse.capitalGains);
       
        setAfterHarvestingGains(capitalGainsResponse.capitalGains);
        setLoadingCapitalGains(false);

        const holdingsResponse = await fetchHoldings();
        setHoldings(holdingsResponse);
        setLoadingHoldings(false);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to fetch data. Please try again later.");
        setLoadingCapitalGains(false);
        setLoadingHoldings(false);
      }
    };
    loadData();
  }, []);

  
  useEffect(() => {
    if (!loadingCapitalGains && !loadingHoldings) {
      if (selectedHoldingIds.length === 0) {
       
        setAfterHarvestingGains(initialCapitalGains);
      } else {
        const selectedHoldings = holdings.filter(h => selectedHoldingIds.includes(h.id));
        const updatedHarvestedGains = calculateHarvestedGains(initialCapitalGains, selectedHoldings);
        setAfterHarvestingGains(updatedHarvestedGains);
      }
    }
  }, [selectedHoldingIds, initialCapitalGains, holdings, calculateHarvestedGains, loadingCapitalGains, loadingHoldings]);


  const handleSelectHolding = (id) => {
    setSelectedHoldingIds(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(holdingId => holdingId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleSelectAllHoldings = () => {
    if (selectedHoldingIds.length === holdings.length) {
      setSelectedHoldingIds([]);
    } else {
      setSelectedHoldingIds(holdings.map(holding => holding.id));
    }
  };

  const handleSort = (columnName) => {
    if (sortBy === columnName) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnName);
      setSortOrder('asc');
    }
  };

  const getSortedHoldings = useCallback(() => {
    if (!sortBy) return holdings;

    return [...holdings].sort((a, b) => {
      let valA, valB;

      switch (sortBy) {
        case 'coinName':
          valA = a.coinName.toLowerCase();
          valB = b.coinName.toLowerCase();
          break;
        case 'totalHolding':
          valA = a.totalHolding;
          valB = b.totalHolding;
          break;
        case 'averageBuyPrice':
          valA = a.averageBuyPrice;
          valB = b.averageBuyPrice;
          break;
        case 'stcgGain':
          valA = a.stcg.gain;
          valB = b.stcg.gain;
          break;
        case 'ltcgGain':
          valA = a.ltcg.gain;
          valB = b.ltcg.gain;
          break;
        case 'pnl':
          valA = a.stcg.gain + a.ltcg.gain;
          valB = b.stcg.gain + b.ltcg.gain;
          break;
        case 'currentMarketRate':
            valA = a.currentPrice;
            valB = b.currentPrice;
            break;
        case 'totalCurrentValue':
            valA = a.currentPrice * a.totalHolding;
            valB = b.currentPrice * b.totalHolding;
            break;
        default:
          return 0;
      }

      if (valA < valB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (valA > valB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [holdings, sortBy, sortOrder]);


  
  const preHarvestingRealisedGains = (initialCapitalGains.stcg.profits - initialCapitalGains.stcg.losses) +
    (initialCapitalGains.ltcg.profits - initialCapitalGains.ltcg.losses);

  if (error) {
    return <div className="koinx-background error-message">Error: {error}</div>;
  }

  return (
    <div className="koinx-background">
      <div className="content-wrapper">
        <div className="title-section">
          <h1>Tax Loss Harvesting</h1>
          <div className="info-box">
            <span
              className="info-button"
              onMouseEnter={() => setShowHowItWorks(true)}
              onMouseLeave={() => setShowHowItWorks(false)}
            >
              How it works?
            </span>
            {showHowItWorks && (
              <div className="tooltip">
                <p>Tax Loss Harvesting is the practice of selling investments at a loss to offset capital gains and reduce your tax liability.</p>
              </div>
            )}
          </div>
        </div>

        <div className="important-notes-section">
          <div className="notes-header" onClick={() => setShowImportantNotes(!showImportantNotes)}>
            <h2>Important Notes & Disclaimers</h2>
            <span className="toggle-icon" style={{ transform: showImportantNotes ? 'rotate(180deg)' : 'rotate(0deg)' }}>&#9660;</span>
          </div>
          {showImportantNotes && (
            <div className="notes-content">
              <ul>
                <li>Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.</li>
                <li>Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.</li>
                <li>Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.</li>
                <li>Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.</li>
                <li>Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.</li>
              </ul>
            </div>
          )}
        </div>

        <div className="cards-container">
          <PreHarvesting capitalGains={initialCapitalGains} loading={loadingCapitalGains} />
          <AfterHarvesting
            capitalGains={afterHarvestingGains}
            preHarvestingRealisedGains={preHarvestingRealisedGains}
            loading={loadingCapitalGains}
          />
        </div>

        <Holdings
          holdings={getSortedHoldings()}
          selectedHoldingIds={selectedHoldingIds}
          onSelectHolding={handleSelectHolding}
          onSelectAllHoldings={handleSelectAllHoldings}
          loading={loadingHoldings}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
          showAllHoldings={showAllHoldings}
          toggleShowAllHoldings={() => setShowAllHoldings(!showAllHoldings)}
        />
      </div>
    </div>
  );
};

export default KoinxBackground;