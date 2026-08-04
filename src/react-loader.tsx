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
  const rcid = scriptSection.dataset.rcid;
  const targetId = scriptSection.dataset.rcTarget;
  const data = scriptSection.textContent ? scriptSection.textContent : "{}";
  const type = scriptSection.getAttribute("type");

  if (!blockType || !data) {
    return;
  }

  const Component = blocks[blockType];

  if (Component) {
    const domNode = targetId
      ? document.getElementById(targetId)
      : scriptSection.previousElementSibling;
    if (!domNode) {
      console.warn(`DOM node not found for block type: ${blockType} in}`);
      return;
    }

    let props: any = {};
    if (type === "application/json") {
      props = JSON.parse(data);
    } else if (type === "application/yaml") {
      props = YAML.load(data);
    }

    scriptSection.remove();

    const hydrateOptions = rcid ? { identifierPrefix: rcid } : undefined;

    ReactDOM.hydrateRoot(domNode, <Component {...props} />, hydrateOptions);
  } else {
    return <></>;
  }
};

const renderComponents = () => {
  // rct stands for 'react component type'
  const scriptSections = document.querySelectorAll("script[data-rct]");

  scriptSections.forEach((el) => renderComponent(el as HTMLScriptElement));
};

(globalThis as any).renderComponents = renderComponents;
renderComponents();
globalThis.addEventListener("load", () => renderComponents());

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

globalThis.dispatchEvent(event);
