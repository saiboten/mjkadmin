import React, { useState, useEffect } from "react";

import {
  EuiButton,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiSpacer,
  EuiTitle,
} from "@elastic/eui";

import AdminAddDay from "./AdminAddDay";

import { deleteDay, fetchAdminData } from "../../api/adminApi";
import { AdminDay } from "./AdminDay";

interface Day {
  id: string;
  revealDate: string;
}

interface Solution {
  day: string;
  solution: string;
}

function AdminOverview() {
  const [days, setDays] = useState<Day[]>([]);
  const [solutions, setSolutions] = useState<Solution[]>([]);

  useEffect(() => {
    fetchAdminData().then(({ days, solutions }) => {
      setDays(days);
      setSolutions(solutions);
    });
  }, [setDays, setSolutions]);

  function deleteAndRefetch(id: string) {
    deleteDay(id).then(() => {
      fetchAdminData().then(({ days, solutions }) => {
        setDays(days);
        setSolutions(solutions);
      });
    });
  }

  return (
    <EuiPage>
      <EuiPageBody>
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>Page title</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiPageContent verticalPosition="center" horizontalPosition="center">
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle>
                <h2>Dager</h2>
              </EuiTitle>
            </EuiPageContentHeaderSection>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            {days.map((day, i) => {
              var solutionsForThisDay = solutions
                .filter((solution) => solution.day === day.id)
                .map((el) => el.solution);

              return (
                <React.Fragment
                  key={day.revealDate + solutionsForThisDay.length}
                >
                  <AdminDay day={day} solutions={solutionsForThisDay} />
                  <EuiSpacer size="m" />
                  <EuiButton onClick={() => deleteAndRefetch(day.id)}>
                    Delete
                  </EuiButton>
                </React.Fragment>
              );
            })}
            <AdminAddDay />
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
}

export default AdminOverview;
