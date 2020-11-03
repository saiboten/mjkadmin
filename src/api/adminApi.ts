import { DayType } from "../types";

export const fetchAdminData = () => {
  return fetch(`${process.env.REACT_APP_API_PATH}/admin/alldata.json`)
    .then((data) => {
      return data.json();
    })
    .then((data) => data);
};

interface DayResponse {
  day: DayType;
}

export const getDayDetails = async (revealDate: string): Promise<DayResponse> => {
  return fetch(`${process.env.REACT_APP_API_PATH}/admin/day/${revealDate}.json`)
    .then((data) => {
      return data.json();
    })
    .then((data) => data);
};

export const updateDay = (data: DayType) => {
  return fetch(`${process.env.REACT_APP_API_PATH}/admin/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => data);
};

export const addSolution = (day: number, solution: string) => {
  return fetch(
    `${
      process.env.REACT_APP_API_PATH
    }/admin/addsolution/${day}/${encodeURIComponent(solution)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  )
    .then((data) => {
      return data.json();
    })
    .then((data) => data);
};

export const deleteSolution = (day: string, solution: string) => {
  return fetch(
    `${
      process.env.REACT_APP_API_PATH
    }/admin/deletesolution/${day}/${encodeURIComponent(solution)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  )
    .then((data) => {
      return data.json();
    })
    .then((data) => data);
};

//FIXME fix type
export const addDay = (data: any) => {
  return fetch(`${process.env.REACT_APP_API_PATH}/admin/day`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => data);
};

export const deleteDay = (day: string) => {
  return fetch(`${process.env.REACT_APP_API_PATH}/admin/day/${day}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => data);
};
