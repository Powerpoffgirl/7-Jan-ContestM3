// // 1(a). To fetch data from an API using .then. Handling the promise using .then.

fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
  .then((response) => response.json())
  .then((data) => console.log(data));


// 1(b). To fetch data from an API using async-await. Handling the promise, using async await.

async function getResponse() {
	const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false',
	);
    const data = await response.json();
    console.log(data);
}
getResponse();


// 2. Store the array of 10 objects, each containing a name, id, image, symbol, current_price, and total_volume properly so that we can access it later on to display data.

function store(x){
    return {
        name:x.name,
        id:x.id,
        image:x.image,
        symbol:x.symbol,
        current_price:x.current_price,
        total_volume:x.total_volume,
    };
}

async function storeData(){
    const apiUrl="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
        const coinsPromise = fetch(apiUrl);
    
        coinsPromise.then(res => res.json())
        .then((coinsList => {
           const output = coinsList.map(store);
           console.log(output);
        }))
}
storeData();


// 3. Display all of them in the form of a table as given in the UI

let tableBody = document.getElementById("tableBody");



const renderCoins = (coins) => {
        let row = document.createElement('tr');
        row.style.height="9vh";
        row.innerHTML=`
        <td class="name"><img src="${coins.image}" alt=""/> ${coins.name}</td>
        <td class="symbol"> ${coins.symbol} </td>
        <td class="current_price"> $${coins.current_price} </td>
        <td class="total_volume"> $${coins.total_volume.toLocaleString("en")} </td>
        <td class="percentage"> ${(coins.market_cap_change_percentage_24h).toFixed(2)} %</td>
        <td class="mktCap">Mkt Cap : $${coins.market_cap.toLocaleString("en")}</td>
        `
        tableBody.append(row);
}

const fetchCoinsList = () => {
        const apiUrl="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
        const coinsPromise = fetch(apiUrl);
    
        coinsPromise.then(res => res.json())
        .then((coinsList => {
            console.log("coinsList", coinsList);
            for(let i = 0; i < coinsList.length; i++){
                renderCoins(coinsList[i]);
            }
        }))
    }
    
    fetchCoinsList();