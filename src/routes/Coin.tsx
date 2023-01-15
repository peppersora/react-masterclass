
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";


const Container = styled.div`
    padding: 0px 20px;
`;

const Header = styled.header`
    height: 15vh;
    display:flex;
    justify-content: center;
    align-items: center;
`;


const Title = styled.h1`
font-size:48px;
color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;


interface Routestate {
    state:string;
    }
function Coin() {
    const [loading, setLoading] = useState(true);
    const { coinId } = useParams();
    // param은 타입입력안해도 v6부터 자동으로 된다고...
    // console.log(coinId);
    const {state} = useLocation() as Routestate;
    // console.log(state);
    const [info, setInfo] = useState({});
    const [priceInfo, setPriceInfo] = useState({});

    useEffect(() => {
        (async() => {
            const infoData= await (
            await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();
            console.log(info);
                // json 1개 끝
            const priceData = await(
            await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();
            console.log(priceInfo);
                setInfo(infoData);
                setPriceInfo(priceData);
               
        })();
    },[]);
    return(
        <Container>
        <Header>
            <Title>{state ? state : "Loading..." }</Title>
            </Header>
            {loading ? (<Loader>Loading...</Loader>) :null}
            </Container>
    );
}
export default Coin;

