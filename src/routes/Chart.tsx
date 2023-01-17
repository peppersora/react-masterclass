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
    // console.log(data);
    const {isLoading,data} = useQuery<IHistorical[]>(["ohlcv",coinId],() => fetchCoinHistory(`${coinId}`));
    return(
        <div>{isLoading ? "Loading chart..." : 
        <ApexChart 
        type="line"
        series={[
            {   name:"hello",
                data: data?.map((price) => Number(price.close)) as number[],
            },
            {   name:"sales",
                data:[13,47,39,28,19,55],
            },
        ]}
        options={{
            theme:{
                mode:"dark",
            },
            chart:{
                height:500,
                width:500,
                toolbar:{
                    show:false,
                }
            },
            stroke:{
                curve:"smooth",
                width:5,
            },

        }}
        />}</div>
    );
}

export default Chart;