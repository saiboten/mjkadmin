import React, { useState } from "react";
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
  EuiFilePicker,
  EuiListGroupItem,
  EuiListGroup,
  EuiPanel,
} from "@elastic/eui";

import { updateDay, deleteSolution } from "../../api/adminApi";
import { useField, Formik } from "formik";

import moment from "moment";
import { AddSolution } from "./AddSolution";
import SongAudio from "./SongAudio";
import { mutate } from "swr";
import { useDay } from "../useDay";

const collaborators = [
  "Skøyerfanden",
  "Tomas",
  "Bjarte",
  "Tobias",
  "Kim",
  "Stein",
  "Annen",
];

const RadioButton = ({ ...props }: any) => {
  const [field, meta] = useField({
    ...props,
    type: "radio",
  });

  return (
    <EuiFormRow>
      <>
        <EuiRadio {...field} {...props} type="radio" style={{ zIndex: 0 }} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    </EuiFormRow>
  );
};

const TextField = ({ label, ...props }: any) => {
  const [field, meta] = useField({ ...props, type: "text" });

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

const TextArea = ({ label, ...props }: any) => {
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

const DatePicker = ({ label, setFieldValue, ...props }: any) => {
  const [field, meta] = useField(props);

  const customOnChange = (data: any) => {
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

interface Props {
  revealDateAsString: string;
  editDone: () => void;
  solutions: string[];
}

export function AdminEditDay({
  revealDateAsString,
  editDone,
  solutions,
}: Props) {
  const [copyDescription, setDescription] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const { data } = useDay(revealDateAsString);

  if (!data) {
    return <div>"Loading.."</div>;
  }

  const { day } = data;

  console.log("Raw data from day: ", day.description);

  async function handleSubmit(values: any, actions: any) {
    const valuesWithRealDates = {
      ...values,
      revealDate: values.revealDate.startOf("day").valueOf(),
      solutionDate: values.solutionDate.startOf("day").valueOf(),
      revealDateAsString: values.revealDate.startOf("day").format("yyyy-MM-DD"),
    };

    setDescription(valuesWithRealDates.description);

    actions.setSubmitting(false);
    await updateDay(valuesWithRealDates);
    console.log("Updating day");

    editDone();
    mutate("data");
    mutate(`day/${revealDateAsString}`);
    console.log(`day/${revealDateAsString}`);
  }

  async function upload() {
    var req = request.post("/api/admin/upload/" + revealDateAsString);
    req.query({ filename: file?.name });
    req.attach("file", file as any);

    req.end(function (err, res) {
      console.log("Success? ", res);
      mutate(`day/${revealDateAsString}`);
      mutate("data");
    });
  }

  if (!day) {
    return <div>Laster</div>;
  }

  const { revealDate, solutionDate, id, difficulty } = day;

  return (
    <div>
      <EuiTitle size="l">
        <h1>Endre dag</h1>
      </EuiTitle>
      <Formik
        enableReinitialize
        initialValues={{
          ...day,
          difficulty: difficulty?.toString(),
          revealDate: moment(new Date(revealDate || "")),
          solutionDate: moment(new Date(solutionDate || "")),
        }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <EuiForm>
              <TextArea name="description" type="text" label="Beskrivelse" />

              <EuiSpacer size="m" />

              <div
                style={{ maxWidth: "25rem" }}
                dangerouslySetInnerHTML={{ __html: copyDescription }}
              ></div>

              <EuiSpacer size="m" />

              <TextField name="solutionArtist" label="Artist/Gruppe" />
              <TextField name="solutionSong" label="Sang" />

              <EuiSpacer size="m" />

              <EuiFilePicker
                id="asdf2"
                initialPromptText="Velg eller dra inn filer"
                onChange={(files: any) => {
                  setFile(files[0]);
                }}
                display="large"
              />

              {file && <EuiButton onClick={upload}>Last opp</EuiButton>}

              {day.link && <SongAudio link={day.link} />}

              <TextField name="optionalSolutionVideo" label="Løsningsvideo" />
              <TextField name="link" label="Link" />
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
                  <EuiFormRow label="Laget av" labelType="legend">
                    <>
                      {collaborators.map((name) => (
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

              <EuiSpacer size="m" />

              <EuiTitle size="l">
                <h2>Løsninger</h2>
              </EuiTitle>

              <EuiPanel paddingSize="m">
                <EuiListGroup>
                  {solutions.map((el) => (
                    <React.Fragment key={el}>
                      <EuiListGroupItem label={el} />

                      <EuiButton
                        onClick={async () => {
                          await deleteSolution(id, el);
                          mutate("data");
                        }}
                      >
                        Slett
                      </EuiButton>
                    </React.Fragment>
                  ))}
                </EuiListGroup>
              </EuiPanel>

              <EuiSpacer size="m" />

              <EuiButton type="submit">Lagre</EuiButton>
            </EuiForm>
          </form>
        )}
      </Formik>
      <AddSolution id={id} />
    </div>
  );
}
