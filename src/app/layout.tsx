import React from "react";
import "../styles/globals.css";

type Props = { children: React.ReactNode };

const RootLayout = (props: Props) => {
  return (
    <html>
      <head>
        <title>My App</title>
      </head>
      <body>{props.children}</body>
    </html>
  );
};

export default RootLayout;
