import styled from "styled-components"

interface ContainerProps {
    bgColor:string;
    borderColor?:string;
    text?:string;

}

const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.bgColor} ;
    border-radius: 100px;
    border: 1px solid ${(props) => props.borderColor};
`;


interface CircleProps {
    bgColor:string;
    borderColor?: string;
    text?:string;
}

function Circle({bgColor,borderColor,text = "default text"}: ContainerProps){
    return(
        <Container 
        bgColor={bgColor} 
        borderColor={borderColor ?? bgColor}
       >
            {text}
        </Container>
        // bordercolor에서 bordercolor가 있다면 bordercolor를 사용하고 없다면 bgcolor를 사용하세요
    );
}
export default Circle;


interface PlayerShape {
    name:string;
    age: number;
}

const sayHello = (playerObj:PlayerShape) => 
`Hello ${playerObj.name}; you are ${playerObj.age} years old`;


sayHello({name:"sora",age:28});
sayHello({name: "nico",age:11});