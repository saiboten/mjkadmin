/**
 * Created by Tobias on 03.10.2016.
 */
import React from "react";

import { H1 } from "../lib/Heading";
import { addDay as addDayApi, fetchAdminData } from "../../api/adminApi";
import {
  EuiButton,
  EuiDatePicker,
  EuiFieldText,
  EuiFormRow,
  EuiSpacer,
  EuiTitle,
} from "@elastic/eui";
import { Formik, useField } from "formik";
import moment from "moment";

const TextField = ({ label, ...props }: any) => {
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

function AdminAddDay() {
  function onSubmit(values: any) {
    var saveObject = {
      link: "TODO",
      description: "TODO",
      optionalSolutionVideo: "TODO",
      solutionArtist: "TODO",
      solutionSong: "TODO",
      revealDate: values.revealDate.startOf("day").valueOf(),
      solutionDate: values.solutionDate.startOf("day").valueOf(),
      revealDateAsString: values.revealDate.startOf("day").format("yyyy-MM-DD"),
    };

    addDayApi(saveObject);
  }

  return (
    <div>
      <EuiTitle size="l">
        <h1>Legg til dag</h1>
      </EuiTitle>
      <Formik
        initialValues={{
          revealDate: moment(new Date()),
          solutionDate: moment(new Date()),
        }}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <DatePicker
                      name="revealDate"
                      type="text"
                      label="Luke åpner"
                      setFieldValue={setFieldValue}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <DatePicker
                      name="solutionDate"
                      type="text"
                      label="Fasit vises"
                      setFieldValue={setFieldValue}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <TextField
                      name="solutionArtist"
                      type="text"
                      label="Artist/Gruppe"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <EuiSpacer size="m" />
            <EuiButton type="submit">Legg til dag</EuiButton>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default AdminAddDay;
