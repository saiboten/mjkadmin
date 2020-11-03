import React from "react";
import { H2 } from "./lib/Heading";

interface Input {
  unixDate: string;
  children: JSX.Element;
}

export function DateHeader({ unixDate, children }: Input) {
  return (
    <H2>
      {unixDate} {children}
    </H2>
  );
}
