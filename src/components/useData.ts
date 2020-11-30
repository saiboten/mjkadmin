import React from "react";
import useSWR from "swr";
import { fetchAdminData } from "../api/adminApi";

// {
//   "date": "2019-12-06",
//   "solutions": [
//     { "id": null, "day": 195, "solution": "Test", "new": true },
//     { "id": null, "day": 195, "solution": "Test2", "new": true },
//     { "id": null, "day": 210, "solution": "hjio", "new": true }
//   ],
//   "answers": [],
//   "days": [
//     {
//       "id": 195,
//       "revealDateAsString": "2019-11-21",
//       "image": null,
//       "description": "Test",
//       "optionalSolutionVideo": "",
//       "link": "",
//       "solutionDate": "2019-11-21T23:00:00.000+0000",
//       "revealDate": "2019-11-20T23:00:00.000+0000",
//       "difficulty": 2,
//       "cooperator": "Tobias",
//       "solutionArtist": "Hurra",
//       "solutionSong": "Test",
//       "new": false
//     }
//   ],
//   "isLoggedIn": false,
//   "user": null
// }

interface Data {
  date: string;
  solutions: {
    day: number;
    solution?: string;
    new: boolean;
  }[];
  days: {
    id: number;
    revealDateAsString: string;
    description: string;
    optionalSolutionVideo: string;
    link: string;
    solutionDate: string;
    revealDate: string;
    difficulty: 0 | 1 | 2;
    cooperator: string;
    solutionArtist: string;
    solutionSong: string;
  }[];
}

export const useData = () => {
  return useSWR<Data, any>("data", fetchAdminData);
};
