import {
  braceletTemplates
}
from "../../data/templates/braceletTemplates";

import {
  ladderPattern
}
from "../../data/templates/patternTemplates";

export default function BraceletTemplates({

  loadTemplate

}) {

  return (

    <div
      style={{

        display: "grid",

        gridTemplateColumns:
          "repeat(auto-fit, minmax(220px,1fr))",

        gap: "20px",

        padding: "20px",
      }}
    >

      {/* NORMAL BRACELET TEMPLATES */}

      {braceletTemplates.map(
        (template) => (

          <div

            key={template.id}

            onClick={() =>
              loadTemplate(
                template
              )
            }

            style={{

              background: "white",

              borderRadius: "20px",

              padding: "20px",

              cursor: "pointer",

              border:
                "2px solid #eee",

              transition:
                "0.3s ease",
            }}
          >

            <h3>
              {template.name}
            </h3>

            <p>
              {template.beadCount}
              {" "}
              slots
            </p>

          </div>
        )
      )}

      {/* LADDER PATTERN */}

      <div

        onClick={() =>
          loadTemplate(
            ladderPattern
          )
        }

        style={{

          background: "white",

          borderRadius: "20px",

          padding: "20px",

          cursor: "pointer",

          border:
            "2px solid #eee",
        }}
      >

        <h3>
          Ladder Pattern
        </h3>

        <p>
          Custom Pattern
        </p>

      </div>

    </div>
  );
}