import  { useEffect, useRef, useState } from 'react';

const UPDATE_INTERVAL = 100; // ms

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

function AirplaneControl() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [yaw, setYaw] = useState(0); // degrees
  const [speed, setSpeed] = useState(100);
  const [position, setPosition] = useState({
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
  });
  const [trajectory, setTrajectory] = useState<
    { x: number; y: number }[]
  >([]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const interval = setInterval(() => {
      const yawRadians = (yaw * Math.PI) / 180;

      const dx = Math.cos(yawRadians) * (speed * UPDATE_INTERVAL / 1000);
      const dy = -Math.sin(yawRadians) * (speed * UPDATE_INTERVAL / 1000);

      
      const updatedX = (position.x + dx + CANVAS_WIDTH) % CANVAS_WIDTH;
      const updatedY = (position.y + dy + CANVAS_HEIGHT) % CANVAS_HEIGHT;


      const newPosition= { x: updatedX, y: updatedY };

      setPosition(newPosition);
      setTrajectory(prev => {
        if (prev.length === 0) return [newPosition];
        return [...prev, newPosition];
      });

      // draw everything
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      if (trajectory.length > 1) {
        ctx.beginPath();
        ctx.moveTo(trajectory[0].x, trajectory[0].y);
        for (let i = 1; i < trajectory.length; i++) {
          ctx.lineTo(trajectory[i].x, trajectory[i].y);
        }
        ctx.strokeStyle = 'black';
        ctx.stroke();
      }

      // plane
      ctx.beginPath();
      ctx.arc(updatedX, updatedY, 5, 0, Math.PI * 2);
      ctx.fillStyle = 'red';
      ctx.fill();
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [yaw, speed, position, trajectory]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Airplane Control App</h2>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Yaw Angle:
          <input
            type="range"
            min="0"
            max="360"
            value={yaw}
            onChange={(e) => setYaw(Number(e.target.value))}
            style={{ margin: '0 10px' }}
          />
          {yaw}
        </label>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Speed:
          <input
            type="range"
            min="0"
            max="300"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            style={{ margin: '0 10px' }}
          />
          {speed} knots
        </label>
      </div>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ border: '1px solid black', backgroundColor: 'white' }}
      />
    </div>
  );
}

export default AirplaneControl;

