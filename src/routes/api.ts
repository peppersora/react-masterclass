export function fetchCoins(){
    // json data 의 promise를 return해야함
    return fetch("https://api.coinpaprika.com/v1/coins").then(
        (response) => response.json()
    );
}
