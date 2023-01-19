
const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins(){
    // json data 의 promise를 return해야함
    const response = await fetch(`${BASE_URL}/coins`);
    return await response.json();
}

// infoData에 대한 첫번째 쿼리
export  async function fetchCoinInfo(coinId:String){
    const response = await fetch(`${BASE_URL}/coins/${coinId}`);
    return await response.json();
}
// priceData에 대한 두번째 쿼리
export  async function fetchCoinTickers(coinId:String){
    const response = await fetch(`${BASE_URL}/tickers/${coinId}`);
    return await response.json();
}

// chart tap에대한 쿼리
export async function fetchCoinHistory(coinId:String){
    const endDate = Math.floor(Date.now()/1000);
    // 현재시간에서 1주 1시간에 해당하는 초를 뻄
    const startDate = endDate - (60*60*23*7*1);
    const response = await fetch("https://ohlcv-api.nomadcoders.workers.dev/?coinId=btc-bitcoin");
    return await response.json();
}

// price tap에 관한 쿼리
export async function fetchCoinPrice(coinId:String){
    const response = await fetch("https://ohlcv-api.nomadcoders.workers.dev/?coinId=btc-bitcoin");
    return await response.json();
}


