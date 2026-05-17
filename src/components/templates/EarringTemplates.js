import {
  earringTemplates
}
from "../../data/templates/earringTemplates";

export default function EarringTemplates({

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

      {earringTemplates.map(
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
            }}
          >

            <h3>
              {template.name}
            </h3>

            <p>
              Earring Template
            </p>

          </div>
        )
      )}

    </div>
  );
}