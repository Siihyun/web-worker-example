import { useState, useRef, useEffect } from "react";

function WebWorkerApp() {
  const [result, setResult] = useState(0);
  const [worker, setWorker] = useState<Worker | null>(null);
  const animationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const newWorker = new Worker("worker.js");
    setWorker(newWorker);

    newWorker.onmessage = (e) => {
      setResult(e.data.result);
    };

    return () => newWorker.terminate(); // Clean up worker
  }, []);

  const handleCalculate = () => {
    worker?.postMessage({ data: {} });
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
      <h1>Worker Thread Calculation</h1>
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

export default WebWorkerApp;
