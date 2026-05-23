import ReactDOM from "react-dom/client";
import YAML from "js-yaml";
import "./styles.css";

import { clientComponents } from "@components/client-components";

const blocks: Record<
  string,
  React.LazyExoticComponent<React.ComponentType<any>>
> = {
  ...clientComponents,
};

const renderComponent = (scriptSection: HTMLScriptElement) => {
  const blockType = scriptSection.dataset.rct;
  const data = scriptSection.textContent ? scriptSection.textContent : "{}";
  const type = scriptSection.getAttribute("type");

  if (!blockType || !data) {
    return;
  }

  const Component = blocks[blockType];

  if (Component) {
    const domNode = scriptSection.previousElementSibling;
    if (!domNode) {
      console.warn(`DOM node not found for block type: ${blockType}`);
      return;
    }

    const props =
      type === "application/json"
        ? JSON.parse(data)
        : type === "application/yaml"
          ? YAML.load(data)
          : {};

    scriptSection.remove();

    ReactDOM.hydrateRoot(domNode, <Component {...props} />);
  } else {
    return <></>;
  }
};

const renderComponents = () => {
  // rct stands for 'react component type'
  const scriptSections = document.querySelectorAll("script[data-rct]");

  [].forEach.call(scriptSections, renderComponent);
};

window.renderComponents = renderComponents;
renderComponents();
window.addEventListener("load", () => renderComponents());

// Post a custom event to notify that the renderComponents function is ready to be used
// Usage:
// if (window.renderComponents) {
//   window.renderComponents();
// } else {
//   window.addEventListener('react-loaded', () => {
//     window.renderComponents();
//   });
// }
const event = new CustomEvent("react-loaded");

window.dispatchEvent(event);
