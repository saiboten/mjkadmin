import React, { useState, useEffect } from "react";
import { array } from "prop-types";
import moment from "moment";
import { DateHeader } from "../DateHeader";
import request from "superagent";

import "@elastic/eui/dist/eui_theme_light.css";

import {
  EuiButton,
  EuiCheckboxGroup,
  EuiFieldText,
  EuiForm,
  EuiTextArea,
  EuiFormRow,
  EuiDatePicker,
  EuiLink,
  EuiRange,
  EuiSelect,
  EuiSpacer,
  EuiSwitch,
  EuiText
} from "@elastic/eui";

import {
  updateDay,
  deleteDay,
  fetchAdminData,
  addSolution,
  deleteSolution,
  getDayDetails
} from "../../api/adminApi";
import styled from "styled-components";
import { useField, Formik } from "formik";

const cooperators = [
  "Skøyerfanden",
  "Tomas",
  "Bjarte",
  "Tobias",
  "Kim",
  "Stein"
];

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <EuiFormRow label={label}>
      <>
        <EuiFieldText {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    </EuiFormRow>
  );
};

const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <EuiFormRow label={label}>
      <>
        <EuiTextArea {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    </EuiFormRow>
  );
};

const DatePicker = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <EuiFormRow label={label}>
      <>
        <EuiDatePicker selected={field.selected} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    </EuiFormRow>
  );
};

export function AdminEditDay({ revealDateAsString }) {
  const [file, setFile] = useState(null);
  const [day, setDay] = useState({});

  useEffect(() => {
    getDayDetails(revealDateAsString).then(day => {
      setDay(day);
    });
  }, [day]);

  function onDrop(files) {
    // file: files[0]
  }

  function upload() {
    var req = request.post("/api/admin/upload/" + revealDateAsString);
    req.query({ filename: file.name });
    req.attach("file", file);

    req.end(function(err, res) {
      console.log("Success? ", res);
    });
  }

  function abortUpload() {
    // Reset state
  }

  var fileupload = (
    <p>
      <EuiButton onClick={upload}>Last opp</EuiButton>
      <EuiButton onClick={abortUpload}>Avbryt opplasting</EuiButton>
    </p>
  );

  if (!day.description) {
    return <div>Laster</div>;
  }

  const {
    description,
    link,
    solutionSong,
    solutionArtist,
    optionalSolutionVideo,
    revealDate,
    solutionDate
  } = day;

  return (
    <div>
      <Formik
        initialValues={{
          description,
          link,
          solutionArtist,
          solutionSong,
          revealDateAsString,
          optionalSolutionVideo,
          revealDate,
          solutionDate
        }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
        render={props => (
          <EuiForm onSubmit={props.handleSubmit}>
            <TextField
              name="revealDateAsString"
              type="text"
              label="Åpningsdato"
            />
            <TextArea name="description" type="text" label="Beskrivelse" />
            <TextField
              name="solutionArtist"
              type="text"
              label="Artist/Gruppe"
            />
            <TextField name="solutionSong" type="text" label="Sang" />
            <TextField
              name="optionalSolutionVideo"
              type="text"
              label="Løsningsvideo"
            />
            <TextField name="link" type="text" label="Link" />
            <DatePicker name="revealDate" type="text" label="Luke åpner" />
            <DatePicker name="solutionDate" type="text" label="Løsningsdato" />
            <TextField
              name="difficulty"
              type="text"
              label="Vanskelighetsgrad"
            />
            <TextField name="cooperator" type="text" label="Bidragsyter" />
            <EuiButton type="submit">Lagre</EuiButton>
          </EuiForm>
        )}
      />
    </div>
  );
}
