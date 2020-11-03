import { EuiForm, EuiFormRow, EuiButton, EuiFieldText } from "@elastic/eui";
import { Formik, useField } from "formik";
import React from "react";
import { addSolution } from "../../api/adminApi";

interface Props {
  id: number;
}
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

interface FormData {
  solution: string;
}

export function AddSolution({ id }: Props) {
  function handleSubmit({ solution }: FormData, { resetForm }: any) {
    addSolution(id, solution);
    resetForm();
  }

  return (
    <div>
      <Formik
        initialValues={{
          solution: "",
        }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <EuiForm>
              <TextField name="solution" label="Løsning" />
              <EuiButton type="submit">Legg til løsning</EuiButton>
            </EuiForm>
          </form>
        )}
      </Formik>
    </div>
  );
}
