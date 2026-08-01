import React from "react";
import { EXPERIENCE, Position, durationLabel, rangeLabel } from "../../data";

const Meta: React.FC<{ position: Position; nested?: boolean }> = ({ position, nested }) => (
  <>
    <p className={nested ? "out-exp__subrole" : "out-exp__role"}>{position.title}</p>
    <p className="out-exp__dates">
      {rangeLabel(position.start, position.end)}
      {position.location ? ` · ${position.location}` : ""}
    </p>
    {position.description && <p className="out-exp__desc">{position.description}</p>}
  </>
);

const ExperienceOutput: React.FC = () => (
  <ol className="out-exp">
    {EXPERIENCE.map((role) => (
      <li className="out-exp__item" key={role.organization + role.title}>
        {role.positions ? (
          <>
            <p className="out-exp__org out-exp__org--lead">
              {role.organization}
              {role.employmentType ? ` · ${role.employmentType}` : ""}
            </p>
            <p className="out-exp__dates">
              {durationLabel(role.start, role.end)}
              {role.location ? ` · ${role.location}` : ""}
            </p>
            <ol className="out-exp__positions">
              {role.positions.map((position) => (
                <li key={position.title}>
                  <Meta position={position} nested />
                </li>
              ))}
            </ol>
          </>
        ) : (
          <>
            <p className="out-exp__role">{role.title}</p>
            <p className="out-exp__org">
              {role.organization}
              {role.employmentType ? ` · ${role.employmentType}` : ""}
            </p>
            <p className="out-exp__dates">
              {rangeLabel(role.start, role.end)}
              {role.location ? ` · ${role.location}` : ""}
            </p>
            {role.description && <p className="out-exp__desc">{role.description}</p>}
          </>
        )}
      </li>
    ))}
  </ol>
);

export default ExperienceOutput;
