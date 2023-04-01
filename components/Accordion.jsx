import { useRef } from "react";

export default function Accordian({ data }) {
  const previouslyOpenedPanelIndex = useRef();
  const panelsRef = useRef();
  function getIdPanelMap() {
    if (panelsRef.current) {
      return panelsRef.current;
    }
    panelsRef.current = new Map();
    return panelsRef.current;
  }
  function toggleAccordian(indexClicked) {
    const idPanelMap = getIdPanelMap();
    const previouslyOpenedNode = idPanelMap.get(
      previouslyOpenedPanelIndex.current
    );
    const selectedNode = idPanelMap.get(indexClicked);
    if (previouslyOpenedPanelIndex.current === undefined) {
      selectedNode.style.maxHeight = `${
        idPanelMap.get(indexClicked).scrollHeight
      }px`;
      selectedNode.setAttribute("data-opened", "");
      previouslyOpenedPanelIndex.current = indexClicked;
      return;
    }
    if (parseInt(selectedNode.style.maxHeight)) {
      selectedNode.style.maxHeight =
        "0px";
      selectedNode.removeAttribute("data-opened");
    } else {
      selectedNode.style.maxHeight = `${
        idPanelMap.get(indexClicked).scrollHeight
      }px`;
      selectedNode.setAttribute("data-opened", "");
      if (previouslyOpenedPanelIndex.current !== indexClicked) {
        previouslyOpenedNode.style.maxHeight =
          "0px";
        previouslyOpenedNode.removeAttribute("data-opened");
        previouslyOpenedPanelIndex.current = indexClicked;
      }
    }
  }
  return (
    <ul className="accordion">
      {data.map(({ name, content }, i) => (
        <li key={i} className="card">
          <button onClick={() => toggleAccordian(i)}>{name}</button>
          <ul
            className="card-body"
            ref={(node) => {
              const idPanelMap = getIdPanelMap();
              if (node) {
                idPanelMap.set(i, node);
                return;
              }
              idPanelMap.delete(i);
            }}
          >
            {content.map((bulletPoint, j) => (
              <li key={j}>{bulletPoint}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
