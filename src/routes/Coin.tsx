
import { useQuery } from "react-query";
import {Helmet} from "react-helmet";
import { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import { Route, Routes, useLocation, useParams,Outlet } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoins, fetchCoinTickers } from "./api";
import Chart from "./Chart";
import Price from "./Price";
import { FaAngleLeft, FaAngleRight} from "react-icons/fa";
import Coins from "./Coins";
import { link } from "fs";
import path from "path";

const Container = styled.div`
    padding: 0px 20px;
`;

const Header = styled.header`
    display:flex;
    height: 15vh;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    
    
`;


const Title = styled.h1`
display: flex;
font-size:48px;
color: ${props => props.theme.accentColor};

`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;


const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;







// ===========interface======================

interface Routestate {
    state:string;
    }

// interface ITag{
//     coin_counter: number;
//     ico_counter: number;
//     id: string;
//     name: string;
// }

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    // tag: ITag[];
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}
interface PriceData{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      };
    };
}

interface ICoin{
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

interface ICoinProps{
  isDark: boolean;
 
}


function Coin( {isDark}:ICoinProps) {
    // const [loading, setLoading] = useState(true);
    const { coinId } = useParams();
    // param은 타입입력안해도 v6부터 자동으로 된다고...
    const {state} = useLocation() as Routestate; 
    // const [info, setInfo] = useState<InfoData>();
    // const [priceInfo, setPriceInfo] = useState<PriceData>();
    // usematch에게 우리가 coinId에 price에 있는지 확인해달라는뜻
    const priceMatch = useMatch("/:coinId/price");
    // console.log(priceMatch);
      // 확인해보면 내가 그 url에 있다면 pricematch에 관한 object를 받게되고
      // 그 url에 없다면 null을 받게 된다.
    const chartMatch = useMatch("/:coinId/chart");
    // console.log(chartMatch);

    const {isLoading,data} = useQuery<ICoin[]>(["allCoins"], fetchCoins)
    // console.log(isLoading,data);

    const {isLoading: infoLoading, data:infoData} = useQuery<InfoData>
    (["info",coinId],() => fetchCoinInfo(`${coinId}`));
    
    const {isLoading: tickersLoading, data:tickersData} = useQuery<PriceData>
    (["tickers",coinId],
    () => fetchCoinTickers(`${coinId}`),
    
    {
      // refetchInterval: 5000,
    }
    
    );
    // useEffect(() => {
    //     (async() => {
    //         const infoData= await (
    //         await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    //         ).json();
    //         // console.log(info);
    //             // json 1개 끝
    //         const priceData = await(
    //         await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
    //         ).json();
    //         // console.log(priceInfo);
    //             setInfo(infoData);
    //             setPriceInfo(priceData);
    //             setLoading(false);
               
    //     })();
    // },[coinId]);
    // coinId가 변한다면 [] 안에 코드는 다시 실행될 것이다.
    /*  우리는 coinId가 변하지 않는다는것을 알기 때문에
        [] 이렇게 해도 상관없다. coinId는 state를 사용하지 않기
        때문에*/
    const loading = infoLoading || tickersLoading;
    return(
        <Container>
          <Helmet>
            <title>{state ? state : loading 
                ? "Loading..." : infoData?.name }</title>
            </Helmet>

        <Header>
          <Link to={"/"}>
        <FaAngleLeft 
          className="icon" size="50px" style={        
            { 
            display:"flex",
            alignContent:"space-between",
            justifyItems:"flex-start",
          
          }
          
        }>
        </FaAngleLeft>
           </Link>
            <Title>
                {state ? state : loading 
                ? "Loading..." : infoData?.name }
                </Title>

                <FaAngleRight className="icon" size="50px"/>
            </Header>
                {loading ? (
            <Loader>Loading...</Loader>
            ) : (
            <>
            <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickersData?.quotes.USD.price.toFixed(4)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
            <Outlet context={
          
              {coin:"coin"}}/>
            </Overview>
            <Tabs>
              <Tab isActive={chartMatch !== null}>
                {/* null이아니라는것은 object를 가진다는 뜻 */}
              <Link to={`/${coinId}/chart`}>
              Chart
              </Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>
              Price
              </Link>
              </Tab>
            </Tabs>
            <Routes>
            <Route path="chart" 
            element={<Chart
              
            isDark={isDark}/>}/>
            <Route path="price" element={<Price/>}/>  
            </Routes>
        </>
      )}
            </Container>
    );
}
export default Coin;


