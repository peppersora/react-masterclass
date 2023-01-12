import styled,{keyframes} from "styled-components";
// styled의 component를 이용한다.
//  중요한것은 반드시 백틱을 사용하고 백틱내부에 css내용을 적는다.

const Title = styled.h1`
  color:${(props) => props.theme.textColor};
`;

const Wrapper = styled.div`
display: flex;
height:100vh;
width: 100vw;
justify-content: center;
align-items: center;
background-color: ${(props) => props.theme.backgroundColor};
`;

function App() {
  return (
    <Wrapper>
        <Title>Hello</Title> 
    </Wrapper>
  );
}

export default App;
