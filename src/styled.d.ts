/* 이 파일은 일종의, 우리가 이전에 설치해놓은
이 파일을 override(덮어쓰기) 할것임
*/
// import original module declarations
import 'styled-components';
// 내가 전에 해놓은 styled components의 테마 정의를 확장
// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    // 테마가 어떻게 보일지 설명할 부분 => 테마의 형태, 속성
    textColor: string;
    bgColor: string;
    btnColor:string;
  }
}