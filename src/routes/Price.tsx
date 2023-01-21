import { useQuery } from "react-query";
import {useState} from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { fetchCoinInfo, fetchCoinPrice, fetchCoinTickers } from "./api";
import { stringify } from "querystring";
import styled from "styled-components";



const Container = styled.div`
    padding: 0px 20px;
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


interface IHistorical{
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}


function Price(){

  const coinId = useOutletContext<string>();
  // console.log(coinId);
  const {isLoading, data} = useQuery<IHistorical[]>
  (["prices",coinId],() => fetchCoinPrice(`${coinId}`));
  return(
  //   <Container>
  //   {data?.map((price) => (
  //     <OverviewItem
  //       key={price.time_close}
  //       time={price.time_close}
  //       open={price.open}
  //       high={price.high}
  //       low={price.low}
  //       close={price.close}
  //     ></OverviewItem>
  //   ))}
  // </Container>
  <h1>price</h1>
);
}

export default Price;