const fetchGasPrices = async () => {
  const results = await fetch('https://ethgasstation.info/json/ethgasAPI.json');

  return results.json();
};

export default fetchGasPrices;
