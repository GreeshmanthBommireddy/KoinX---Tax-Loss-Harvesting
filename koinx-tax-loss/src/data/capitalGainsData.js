const capitalGainsData = {
  capitalGains: {
    stcg: {
      profits: 70200.88,
      losses: 1548.53
    },
    ltcg: {
      profits: 5020,
      losses: 3050
    },
  }
};

const fetchCapitalGains = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(capitalGainsData);
    }, 500);
  });
};

export default fetchCapitalGains;