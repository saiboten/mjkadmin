import React, { useState, useEffect } from "react";

import {
  EuiButton,
  EuiFlexGroup,
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

import { deleteDay } from "../../api/adminApi";
import { AdminDay } from "./AdminDay";
import { useData } from "../useData";
import { mutate } from "swr";

function AdminOverview() {
  const { data } = useData();

  async function deleteAndRefetch(id: number) {
    await deleteDay(id);
    mutate("data");
  }

  return (
    <EuiPage restrictWidth>
      <EuiPageBody>
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>Page title</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle>
                <h2>Dager</h2>
              </EuiTitle>
            </EuiPageContentHeaderSection>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            {data?.days.map((day, i) => {
              var solutionsForThisDay = data.solutions
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
