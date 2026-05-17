export default function GoldChain({
  links
}) {

  return (
    <>
      {links.map((link, index) => (

        <ellipse
          key={index}

          cx={
            index % 2 === 0
              ? link.x
              : link.x + 2
          }

          cy={link.y}

          rx="7"

          ry="12"

          fill="none"

          stroke="#D4AF37"

          strokeWidth="3"

          transform={`
            rotate(
              ${
                index % 2 === 0
                  ? 0
                  : 90
              }
              ${
                index % 2 === 0
                  ? link.x
                  : link.x + 2
              }
              ${link.y}
            )
          `}
        />

      ))}
    </>
  );
}