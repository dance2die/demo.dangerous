import React, { Component } from "react";
import { isValidElementType } from "react-is";
import domElements from "./domElements";

class DangerousComponent extends Component {
  render() {
    const { as: WrappedComponent, args, forwardedRef } = this.props;
    const [texts, ...callbacks] = args;

    const __html = texts
      .map((text, i) => `${text}${args[i + 1] ? callbacks[i](this.props) : ""}`)
      .reduce((unsafeText, line) => (unsafeText += line), "");

    return (
      <WrappedComponent
        ref={forwardedRef}
        dangerouslySetInnerHTML={{ __html }}
      />
    );
  }
}

function constructWithOptions(tag, args) {
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
