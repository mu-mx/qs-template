import { useState } from "react";
import style from "@/index.module.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className={style.card}>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
