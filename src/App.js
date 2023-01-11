import styled,{keyframes} from "styled-components";
// styled의 component를 이용한다.
//  중요한것은 반드시 백틱을 사용하고 백틱내부에 css내용을 적는다.
const Wrapper = styled.div`
display: flex;
`;

const rotationAni = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius:0px;
  }
  50% {
    transform: rotate(360deg);
    border-radius:100px;
  }
  100%{
    transform: rotate(0deg);
    border-radius:0px;
  }
`;

const Emoji = styled.span`
  font-size: 10px;
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAni} 1s linear infinite;
  ${Emoji}:hover{
      font-size: 98px;
    }
 
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji as="p">😍</Emoji>
      </Box>
        <Emoji>💛</Emoji>
    </Wrapper>
  );
}

export default App;
