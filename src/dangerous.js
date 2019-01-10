import React, { Component } from "react";
import { isValidElementType } from "react-is";
import domElements from "./domElements";

class DangerousComponent extends Component {
  render() {
    const { args, forwardedRef, ...rest } = this.props;
    const [texts, ...callbacks] = args;

    const __html = texts
      .map((text, i) => `${text}${args[i + 1] ? callbacks[i](this.props) : ""}`)
      .reduce((unsafeText, line) => (unsafeText += line), "");

    return <a ref={forwardedRef} dangerouslySetInnerHTML={{ __html }} />;
  }
}

// const dangerous = html => <DangerousComponent html={html} />;
export default function dangerous(...args) {
  const WrappedStyledComponent = React.forwardRef((props, ref) => (
    <DangerousComponent args={args} {...props} forwardedRef={ref} />
  ));

  return WrappedStyledComponent;
}
