import { useState } from "react";
import { PastExec, PastExecRow } from "./PastExecRow";

interface PastExecsAccordionProps {
  data: { year: string; execs: PastExec[] }[];
}

export const PastExecsAccordion: React.FC<PastExecsAccordionProps> = ({
  data,
}) => {
  const [openYears, setOpenYears] = useState<Set<string>>(new Set());

  /**
   * Toggles the visibility of the past executives for a given year.
   * @param year - The year to toggle the visibility of.
   */
  function toggleYear(year: string): void {
    setOpenYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) {
        next.delete(year);
      } else {
        next.add(year);
      }
      return next;
    });
  }

  return (
    <div className="past-execs-accordion">
      <div className="past-execs-columns">
        {data.map(({ year, execs }) => {
          const isOpen = openYears.has(year);
          // if the year is open, render list of past execs
          return (
            <div key={year} className="past-execs-column">
              <button
                type="button"
                className="past-execs-year-btn"
                data-opened={isOpen ? "" : undefined}
                aria-expanded={isOpen}
                onClick={() => toggleYear(year)}
              >
                {year}
              </button>
              <ul
                className="past-execs-panel"
                data-opened={isOpen ? "" : undefined}
              >
                {execs.map((exec, index) => (
                  <li key={`${year}-${exec.name}-${index}`}>
                    <PastExecRow name={exec.name} role={exec.role} />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PastExecsAccordion;
