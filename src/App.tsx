import { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const onchange = (event: React.FormEvent<HTMLInputElement>) =>{
    const {
      currentTarget:{value},
    } = event;
    setValue(value);
  };
  // event의 any type이란 any => 말그대로 아무타입이나 될 수 있다는 뜻
  // 하지만 우리는 any를 지양해야한다. 항상 타입스크립트에게 무슨
  // 타입인지를 쓰거나 설명하고자 노력해야함
  const onsubmit = (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    console.log("hello", value);
  }
  return (
  <div>
    <form onSubmit={onsubmit}>
      <input value={value} 
      onChange={onchange}
      type="text" 
      placeholder="username" />
      <button>Log in</button>
    </form>
  </div>
  );
}

export default App;
