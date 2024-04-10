import { useEffect, useState } from "react";
import axios from "axios";
import { decrease, increase } from "./utils";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [greet, setGreet] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/api/greet").then((res) => {
      setGreet(res.data?.message || "");
    });
  }, []);

  return (
    <div className="card">
      <div>{count}</div>
      <button onClick={() => setCount((count) => increase(count))}>증가</button>
      <button onClick={() => setCount((count) => decrease(count))}>감소</button>
      {greet && <p data-testid="greet">{greet}</p>}
    </div>
  );
}

export default App;
