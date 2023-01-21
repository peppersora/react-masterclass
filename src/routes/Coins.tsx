
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { useState, Key, ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";

const Container = styled.div`
    padding: 0px 20px;
`;

const Header = styled.header`
    height: 15vh;
    display:flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.textColor};
    border-radius: 15px;
    margin-bottom: 10px;
   
    a {
        padding: 5px;
        /* 패딩을 link에 주는순간 텍스트 가까이 가지 않아도
        마우스커서와 색이 변경된다.
        */
        transition: color 0.2s ease-in;
        align-items: center;
        display: flex; 
        /* icon을 가운데정렬하기 위해 block에서 flex로 변경 */
        /* 클릭선택의 범위를 넓히기위해 
        display: block을 추가 */
        margin-left: 5px;
        
    }
    &:hover{
    /* link를 사용했지만 
    react router link들이 결국에는 anchor로 바뀔것이기때문에
    또 react router dom이 우리 대신에 설정을 도와줄 특별한 
    eventlistner들이 있기도하다 */
        a{
            color: ${(props) =>props.theme.accentColor};
        }
    }
    
`;

const Title = styled.h1`
font-size:48px;
color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;


const coins =[
    
{
id: "btc-bitcoin",
name: "Bitcoin",
symbol: "BTC",
rank: 1,
is_new: false,
is_active: true,
type: "coin",
},
{
id: "eth-ethereum",
name: "Ethereum",
symbol: "ETH",
rank: 2,
is_new: false,
is_active: true,
type: "coin",
},
{
id: "hex-hex",
name: "HEX",
symbol: "HEX",
rank: 3,
is_new: false,
is_active: true,
type: "token",
},
]

interface ICoin{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

interface ICoinsProps{
   
}




function Coins(){
    const setDarkAtom = useSetRecoilState(isDarkAtom);
   const toggleDarkAtom = () => setDarkAtom((current) => !current);
   
    /*useQuery는 두개의 argument가 필요하다
    첫째는 [querykey]가 필요한데 이것은 우리 query의 고유식별자이다.
    두번째는 fetcher함수이다.(fetchcoins)
    그리고 {} 에 usequery가 return 하는것을 받아서 넣어주기로 한다.
    정리하면, usequeryhook은 fetcher함수를 부르고
    fetcher함수가 loading중이라면 react query는 여기서 그걸 알려줄것이다.
    usequery가 feter함수를 부르고 fetcher함수가 끝나면
    reactquery는 qpi에있는 json을 data에 있는 json에 넣을 것이다.

    */
    const {isLoading,data} = useQuery<ICoin[]>(["allCoins"], fetchCoins)
    console.log(isLoading,data);
    // const [loading, setLoading] = useState(true);
    // const [coins, setCoins] = useState<CoinInterface[]>([]);

    /* 특정한시기에만 render하기 위한것 => useEffect
     * 1. component의 시작부분에 코드가 실행
     * 2. component가 끝날때 실행
     * 3.  뭐든 변화가 일어날때마다 실행 */

    // useEffect(() => {
        // 우리 component life의 시작점에서만 실행
        // 아래처럼 만든 function은 즉시 바로 실행된다.
        // (() => console.log(1))(); <= 바로 실행된다.
        /* 위에는 async, 아래는 api의 response를 받기위해
        await을 사용할 것이다.
         */
    //    (async() => {
    //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
    //     const json = await response.json();
        // console.log(json);
        /* array 잘라서 가져오기
        const a =[1,2,3,4,5]
        a.slice(0,3) => [1,2,3]
        a.slice(0,5) => [1,2,3,4,5]
        */
    //     setCoins(json.slice(0,100));
    //     setLoading(false);
    // }) ();
    // },[])
    // console.log(coins);
    return(
        <Container>
            <Helmet>
            <title>코인</title>
            </Helmet>
            <Header>
               <Title>코인</Title>
               <button onClick={toggleDarkAtom}>Toggle Mode</button>
                </Header>
                {isLoading ? (<Loader>Loading...</Loader>) :
               ( 
                <CoinsList>
                    {data?.slice(0,50).map((coin) => (
                    <Coin key={coin.id}>
                        <Link to={
                            // pathname 생략됨
                            `/${coin.id}`
                            }
                            state={coin.name}
                            >
                            <Img 
                            src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                            />
                        {coin.name} &rarr;
                        </Link>
                        </Coin>
                        ))}
                </CoinsList>
                )}
        </Container>
    )};
export default Coins;

