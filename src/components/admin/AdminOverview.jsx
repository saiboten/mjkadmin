import React, { useState, useEffect } from "react";

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle
} from "@elastic/eui";

import AdminAddDay from "./AdminAddDay";

import { fetchAdminData } from "../../api/adminApi";
import { AdminDay } from "./AdminDay";

function AdminOverview() {
  const [days, setDays] = useState([]);
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    fetchAdminData().then(({ days, solutions }) => {
      setDays(days);
      setSolutions(solutions);
    });
  }, [setDays, setSolutions]);

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
                .filter(solution => solution.day === day.id)
                .map(el => el.solution);

              return (
                <AdminDay
                  key={day.revealDate + solutionsForThisDay.length}
                  day={day}
                  solutions={solutionsForThisDay}
                />
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
