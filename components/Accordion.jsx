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
    if (selectedNode.dataset.hasOwnProperty("opened")) {
      closePanel(selectedNode);
    } else {
      openPanel(selectedNode);
      if (
        previouslyOpenedPanelIndex.current !== indexClicked &&
        previouslyOpenedPanelIndex.current !== undefined
      ) {
        closePanel(previouslyOpenedNode);
      }
    }
    previouslyOpenedPanelIndex.current = indexClicked;
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

function openPanel(node) {
  node.style.maxHeight = `${node.scrollHeight}px`;
  node.setAttribute("data-opened", "");
}

function closePanel(node) {
  node.style.maxHeight = "0";
  node.removeAttribute("data-opened");
}
