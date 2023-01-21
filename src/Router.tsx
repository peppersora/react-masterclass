import {BrowserRouter, Route, Routes,} from "react-router-dom";
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";

// 우리는 typescript를 사용하니까 
//  router props에 관한 interface를 만들어줘야한다.
// router가 funcion을 받고 싶으니까 interface내부에
// function이 어떻게 생겼는지 명시해야한다.
interface IRouterProps{
 
}
function Router({}:IRouterProps){
    return(
        <BrowserRouter>
            <Routes> 
            <Route path="/*"
             element={<Coins/>}/>       
            <Route path="/:coinId/*" 
            element={<Coin/>}/>  
            </Routes>   
        </BrowserRouter>
    );
}
export default Router;