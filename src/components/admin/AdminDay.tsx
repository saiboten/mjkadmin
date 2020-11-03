import React, { useState } from "react";
import { AdminEditDay } from "./AdminEditDay";

import { EuiButton, EuiTitle } from "@elastic/eui";

interface Props {
  day: any;
  solutions: any;
}

export function AdminDay(props: Props) {
  const { day, solutions } = props;

  const [edit, setEdit] = useState(false);

  function createMarkup(markup: string) {
    return { __html: markup };
  }

  if (edit) {
    return (
      <AdminEditDay
        editDone={() => setEdit(false)}
        key={day.id}
        revealDateAsString={day.revealDateAsString}
        solutions={solutions}
      />
    );
  }

  const done = day.description !== "" && day.optionalSolutionVideo !== "";

  return (
    <div
      style={{
        backgroundColor: done ? "white" : "#ffbbbb",
      }}
    >
      <EuiTitle size="l">
        <h2>{day.revealDateAsString}</h2>
      </EuiTitle>
      <p>
        {day.solutionArtist} - {day.solutionSong}
      </p>
      <p dangerouslySetInnerHTML={createMarkup(day.description)}></p>
      <EuiButton onClick={() => setEdit(true)}>Utvid</EuiButton>
    </div>
  );
}
