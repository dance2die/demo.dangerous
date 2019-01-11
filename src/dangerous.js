import React, { Component } from "react";
import { isValidElementType } from "react-is";
import domElements from "./domElements";

class DangerousComponent extends Component {
  render() {
    const { tag, args, forwardedRef } = this.props;
    const [texts, ...callbacks] = args;

    const __html = texts
      .map((text, i) => `${text}${args[i + 1] ? callbacks[i](this.props) : ""}`)
      .reduce((unsafeText, line) => (unsafeText += line), "");

    return <a ref={forwardedRef} dangerouslySetInnerHTML={{ __html }} />;
  }
}

// function dangerous(...args) {
function constructWithOptions(tag, args) {
  const WrappedStyledComponent = React.forwardRef((props, ref) => (
    <DangerousComponent args={args} forwardedRef={ref} {...props} />
  ));

  return WrappedStyledComponent;
}

const dangerous = tag => (...args) => constructWithOptions(tag, args);

// Shorthands for all valid HTML Elements
domElements.forEach(domElement => {
  dangerous[domElement] = dangerous(domElement);
});

export default dangerous;
