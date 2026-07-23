import { ReactNode } from "react";
import ChevronDownIcon from "@icons/chevron-down.svg";

interface DropdownProps {
  id: string;
  title: ReactNode;
  content?: ReactNode;
  children?: ReactNode;
  defaultOpen?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  id,
  title,
  content,
  children,
  defaultOpen = false,
}) => {
  const body = children ?? content;

  return (
    <div className="dropdown-item" id={`dropdown-item-${id}`}>
      <input type="checkbox" id={`dropdown-${id}`} defaultChecked={defaultOpen} />
      <label htmlFor={`dropdown-${id}`}>
        {title}
        <img src={ChevronDownIcon.src} alt="" aria-hidden="true" />
      </label>
      <div className="content">
        <div className="content-inner">{body}</div>
      </div>
    </div>
  );
};
