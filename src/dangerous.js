import React from "react";
import { isValidElementType } from "react-is";
import domElements from "./domElements";

function DangerousComponent(props) {
  const { as: WrappedComponent, args, forwardedRef } = props;
  const [texts, ...callbacks] = args;

  const toLines = (text, i) =>
    `${text}${args[i + 1] ? callbacks[i](props) : ""}`;
  const toHtml = (unsafeText, line) => (unsafeText += line);

  const __html = texts.map(toLines).reduce(toHtml, "");

  return (
    <WrappedComponent ref={forwardedRef} dangerouslySetInnerHTML={{ __html }} />
  );
}

function constructWithOptions(tag, args) {
  if (!isValidElementType(tag))
    throw new Error(`${tag} is not a valid React element`);

  const WrappedComponent = React.forwardRef((props, ref) => (
    <DangerousComponent as={tag} args={args} forwardedRef={ref} {...props} />
  ));

  return WrappedComponent;
}

const dangerous = tag => (...args) => constructWithOptions(tag, args);

// Shorthands for all valid HTML Elements
domElements.forEach(domElement => {
  dangerous[domElement] = dangerous(domElement);
});

export default dangerous;
