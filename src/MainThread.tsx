// MainThreadApp.js
import { useState, useRef, useEffect } from "react";

function MainThreadApp() {
  const [result, setResult] = useState(0);
  const animationRef = useRef<HTMLDivElement>(null);

  const handleCalculate = () => {
    let sumResult = 0;
    for (let i = 0; i < 40; i++) {
      sumResult += fibonacci(i);
    }
    setResult(sumResult);
  };

  const fibonacci = (n: number): number => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  };

  useEffect(() => {
    const animate = () => {
      if (animationRef.current) {
        const currentStyle = animationRef.current.style;
        const newLeft = parseInt(currentStyle.left || "0", 10);
        const increment = newLeft > 400 ? -1 : 1; // 속도를 느리게 조정
        currentStyle.left = `${newLeft + increment}px`;
        setTimeout(() => requestAnimationFrame(animate), 20); // 애니메이션 프레임 간 지연 추가
      }
    };
    requestAnimationFrame(animate);
  }, []);

  return (
    <div>
      <h1>Main Thread Calculation</h1>
      <div style={{ position: "relative", height: "100px" }}>
        <div
          ref={animationRef}
          style={{
            position: "absolute",
            left: "0px",
            top: "0px",
            width: "50px",
            height: "50px",
            backgroundColor: "red",
          }}
        ></div>
      </div>
      <button onClick={handleCalculate}>Calculate Sum</button>
      <p>Result: {result}</p>
    </div>
  );
}

export default MainThreadApp;
