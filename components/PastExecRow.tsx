interface PastExecRowProps {
  name: string;
  role: string;
}

export type PastExec = PastExecRowProps;

/**
 * Renders a past executive with their name and role.
 * @param name - The name of the executive.
 * @param role - The role of the executive.
 * @returns A React component that renders a row for a past executive.
 */
export const PastExecRow: React.FC<PastExecRowProps> = ({
  name,
  role,
}) => {
  return (
    <div className="past-exec-row">
      <div className="past-exec-row-info">
        <p className="past-exec-row-name">{name}</p>
        <p className="past-exec-row-role">{role}</p>
      </div>
    </div>
  );
};

export default PastExecRow;
