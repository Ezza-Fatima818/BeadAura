export default function BallChain({
  points
}) {

  const circles = [];

  for (
    let i = 0;
    i < points.length - 1;
    i++
  ) {

    const start = points[i];

    const end = points[i + 1];

    const dx = end.x - start.x;

    const dy = end.y - start.y;

    const distance =
      Math.sqrt(dx * dx + dy * dy);

    const steps =
      Math.floor(distance / 16);

    for (
      let j = 0;
      j <= steps;
      j++
    ) {

      const t = j / steps;

      circles.push({
        x: start.x + dx * t,
        y: start.y + dy * t,
      });
    }
  }

  return (
    <>
      {circles.map(
        (circle, index) => (

          <circle
            key={index}

            cx={circle.x}

            cy={circle.y}

            r="6"

            fill="#D4AF37"
          />

        )
      )}
    </>
  );
}