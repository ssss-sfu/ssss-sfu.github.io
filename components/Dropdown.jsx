export const Dropdown = ({ id, title, content }) => {
  return (
    <div className="faq-item" id={`faq-item-${id}`} key={id}>
      <input type="checkbox" id={`faq-${id}`} />
      <label htmlFor={`faq-${id}`}>
        {title}
        <img src="/icons/chevron-down.svg" alt="Chevron" />
      </label>
      <p className="content">{content}</p>
    </div>
  );
};
