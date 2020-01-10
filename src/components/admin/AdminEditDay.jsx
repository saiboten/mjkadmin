import React, { useState, useEffect } from "react";
import moment from "moment";
import request from "superagent";

import "@elastic/eui/dist/eui_theme_light.css";

import {
  EuiTitle,
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiTextArea,
  EuiFormRow,
  EuiDatePicker,
  EuiSpacer,
  EuiRadio,
  EuiFilePicker
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

const collaborators = [
  "Skøyerfanden",
  "Tomas",
  "Bjarte",
  "Tobias",
  "Kim",
  "Stein",
  "Annen"
];

const RadioButton = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <EuiFormRow>
      <>
        <EuiRadio {...field} {...props} style={{ zIndex: 0 }} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    </EuiFormRow>
  );
};

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

const DatePicker = ({ label, setFieldValue, ...props }) => {
  const [field, meta] = useField(props);

  const customOnChange = data => {
    setFieldValue(field.name, data);
  };

  return (
    <EuiFormRow label={label}>
      <>
        <EuiDatePicker selected={field.value} onChange={customOnChange} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    </EuiFormRow>
  );
};

export function AdminEditDay({ revealDateAsString }) {
  const [day, setDay] = useState({});
  const [copyDescription, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const {
    description,
    link,
    solutionSong,
    solutionArtist,
    optionalSolutionVideo,
    revealDate,
    solutionDate
  } = day;

  useEffect(() => {
    getDayDetails(revealDateAsString).then(day => {
      setDay(day);
      setDescription(day.description);
    });
  }, [revealDateAsString]);

  function handleSubmit(values, actions) {
    const valuesWithRealDates = {
      ...values,
      revealDate: values.revealDate.toDate(),
      solutionDate: values.solutionDate.toDate()
    };

    setDescription(valuesWithRealDates.description);

    actions.setSubmitting(false);
    updateDay(valuesWithRealDates);
  }

  function upload() {
    var req = request.post("/api/admin/upload/" + revealDateAsString);
    req.query({ filename: file.name });
    req.attach("file", file);

    req.end(function(err, res) {
      console.log("Success? ", res);
    });
  }

  if (!day.description) {
    return <div>Laster</div>;
  }

  return (
    <div>
      <EuiTitle size="l">
        <h1>Endre dag</h1>
      </EuiTitle>
      <Formik
        initialValues={{
          description,
          link,
          solutionArtist,
          solutionSong,
          optionalSolutionVideo,
          revealDate: moment(revealDate),
          solutionDate: moment(solutionDate)
        }}
        onSubmit={handleSubmit}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <EuiForm>
              <TextArea name="description" type="text" label="Beskrivelse" />
              <div
                style={{ maxWidth: "25rem" }}
                dangerouslySetInnerHTML={{ __html: copyDescription }}
              ></div>

              <TextField
                name="solutionArtist"
                type="text"
                label="Artist/Gruppe"
              />
              <TextField name="solutionSong" type="text" label="Sang" />

              <EuiFilePicker
                id="asdf2"
                initialPromptText="Velg eller dra inn filer"
                onChange={files => {
                  setFile(files[0]);
                }}
                display="large"
              />

              {file && <EuiButton onClick={upload}>Last opp</EuiButton>}

              <TextField
                name="optionalSolutionVideo"
                type="text"
                label="Løsningsvideo"
              />
              <TextField name="link" type="text" label="Link" />
              <DatePicker
                name="revealDate"
                type="text"
                label="Luke åpner"
                setFieldValue={props.setFieldValue}
              />
              <DatePicker
                name="solutionDate"
                type="text"
                label="Løsningsdato"
                setFieldValue={props.setFieldValue}
              />

              <EuiFormRow label="Vanskelighetsgrad" labelType="legend">
                <>
                  <RadioButton
                    name="difficulty"
                    id="difficulty3"
                    value="3"
                    label="Vanskelig"
                  />
                  <EuiSpacer size="m" />
                  <RadioButton
                    name="difficulty"
                    id="difficulty2"
                    value="2"
                    label="Middels"
                  />
                  <EuiSpacer size="m" />
                  <RadioButton
                    name="difficulty"
                    id="difficulty1"
                    value="1"
                    label="Enkel"
                  />
                  <EuiFormRow label="Vanskelighetsgrad" labelType="legend">
                    <>
                      {collaborators.map(name => (
                        <RadioButton
                          name="cooperator"
                          id={name}
                          value={name}
                          label={name}
                        />
                      ))}
                    </>
                  </EuiFormRow>
                </>
              </EuiFormRow>
              <EuiButton type="submit">Lagre</EuiButton>
            </EuiForm>
          </form>
        )}
      </Formik>
    </div>
  );
}
