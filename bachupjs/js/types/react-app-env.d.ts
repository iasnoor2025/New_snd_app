/// <reference types="react" />
/// <reference types="react-dom" />

declare module "*.svg" {
  import * as React from "react";
  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }

  export default ReactComponent;
}

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

// Make this a module
export {};
