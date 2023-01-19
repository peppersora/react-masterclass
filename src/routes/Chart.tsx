import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";

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


interface ChartProps {
    coinId: string;
}

function Chart(){
    // const params = useParams();
    // console.log(params);
    const coinId = useOutletContext<ChartProps>();
    
    const {isLoading,data} = useQuery<IHistorical[]>
    (["ohlcv",coinId],() => fetchCoinHistory(`${coinId}`),
    
    );
    
    
    return(
        <div>{isLoading ? "Loading chart..." : 
        <ApexChart 
        type="line"
        series={[
            {   name:"hello",
                data: data?.map((price) => Number(price.close)) as number[],
            },
            {   name:"Price",
                data:[13,47,39,28,19,55],
            },
        ]}
        options={{
            theme:{
                mode:"dark",
            },
            chart:{
                height:300,
                width:500,
                toolbar:{
                    show:false,
                },
                background:"transparent",
            },
            stroke:{
                curve:"smooth",
                width:5,
            },
            grid:{
                show:false,
            },
            yaxis:{
                show:false,
            },
            xaxis: { 
                labels: {show:false},
                categories:["a","b","a","b","a","b","a","b","a","b","a","b","a","b","a"]
        
        },
        // x축 끝
        fill:{ 
            type: "gradient",
            gradient:{gradientToColors:["blue"], stops:[0,100]},
        },
        colors:["red"],
        // tooltip:{
        //     y:{
        //         formatter: (value) => `$ ${value.toFixed(2)}`,
        //          숫자의 값을 소숫점아래 둘째자리까지로 나타내준다.
        //     },
        // },

    }}// options끝
        />}</div>
    );
}

export default Chart;