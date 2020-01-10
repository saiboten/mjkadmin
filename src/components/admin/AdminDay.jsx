import React, { useState } from "react";
import { AdminEditDay } from "./AdminEditDay";

import { EuiTitle } from "@elastic/eui";

export function AdminDay(props) {
  const { day, solutions } = props;

  const [edit, setEdit] = useState(true);

  function createMarkup(markup) {
    return { __html: markup };
  }

  if (edit) {
    return (
      <AdminEditDay
        key={day.id}
        revealDateAsString={day.revealDateAsString}
        close={() => setEdit(false)}
      />
    );
  }

  const done = day.description !== "" && day.optionalSolutionVideo !== "";

  return (
    <div
      style={{
        backgroundColor: done ? "white" : "#ffbbbb"
      }}
    >
      <EuiTitle size="l">
        <h2>{day.revealDateAsString}</h2>
      </EuiTitle>
      <p>
        {day.solutionArtist} - {day.solutionSong}
      </p>
      <p dangerouslySetInnerHTML={createMarkup(day.description)}></p>
      <button onClick={() => setEdit(true)}>Utvid</button>
    </div>
  );
}
