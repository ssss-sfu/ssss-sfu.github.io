import ChevronDownIcon from "@icons/chevron-down.svg";

export const Dropdown = ({ id, title, content }) => {
  return (
    <div className="faq-item" id={`faq-item-${id}`} key={id}>
      <input type="checkbox" id={`faq-${id}`} />
      <label htmlFor={`faq-${id}`}>
        {title}
        <img src={ChevronDownIcon.src} alt="Chevron" />
      </label>
      <p className="content">{content}</p>
    </div>
  );
};
