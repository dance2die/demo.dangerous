import React, { Component } from "react";
import { isValidElementType } from "react-is";
import domElements from "./domElements";

// // https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
// function DangerousComponent({ html, as: Component, ...rest }) {
//   return <Component dangerouslySetInnerHTML={{ __html: html }} {...rest} />;
// }

class DangerousComponent extends Component {
  render() {
    const { args, forwardedRef, children } = this.props;
    const texts = args[0];
    const __html = texts
      .map((text, i) => {
        return `${text}${args[i + 1] ? args[i + 1](this.props) : ""}`;
      })
      .reduce((unsafeText, line) => (unsafeText += line), "");

    console.log(`DangerousComponent`, __html);

    return <div ref={forwardedRef} dangerouslySetInnerHTML={{ __html }} />;
  }
}

// const dangerous = html => <DangerousComponent html={html} />;
export default function dangerous(...args) {
  const WrappedStyledComponent = React.forwardRef((props, ref) => (
    <DangerousComponent args={args} {...props} forwardedRef={ref} />
  ));

  return WrappedStyledComponent;
}
