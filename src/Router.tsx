import {BrowserRouter, Route, Routes,} from "react-router-dom";
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";

function Router(){
    return(
        <BrowserRouter>
            <Routes> 
            <Route path="/*" element={<Coins/>}/>       
            <Route path="/:coinId/*" element={<Coin/>}/>  
            </Routes>   
        </BrowserRouter>
    );
}
export default Router;