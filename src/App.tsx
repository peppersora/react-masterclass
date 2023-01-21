
import { createGlobalStyle, ThemeProvider } from "styled-components";
/* 하나의 component를 만들수 있게해주는데 rendering될떄
 컴포넌트가 전역 스코프에 스타일을 올려준다.*/
import Router from "./Router";
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { darkTheme,lightTheme } from "./theme";
import { useState } from "react";


const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  /* App provider는 theme에 접근할수있기 때문에 props사용
  가능 */
  color:${(props) => props.theme.textColor}
}
a {
  text-decoration:none;
  color: inherit;
  /* color는 부모에게서 가져오라고 함 */
}
`;

function App() {
//1. lightmode/darkmode상태 대한 state를 만든다
  const [isDark, setIsDark] = useState(false);
//2. 상태를 변경시켜줄수 있는 toggle function을 만들자
//2-1. state를 만들때 특징은 value가 아닌 funcion을 보낸다.
  const toggleDark = () => setIsDark((current) => !current);
  // setIsDark가 ture이면(current) false를 return하고,
  //  setIsDark가 false이면(current) true를 return한다.

  return (
    <>
    {/* <> fragment style 다시말해 유령style => 아무것도 없음
      이 태그로 인해 style적용은 body에서 오는것이됨
    */}
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
    <GlobalStyle />
    <Router isDark={isDark} toggleDark={toggleDark} />
    {/* router안에 coins가 있기때문에 app에서
    router로 보내면 된다. 하지만 router가 prop을 받을 준비가 
    안되어있다 => router파일에서 어떤 prop을 받을것인지 알려줘야함 */}
    <ReactQueryDevtools initialIsOpen={true}/>
    </ThemeProvider>
    </>
  );
}


export default App;