import styled from "styled-components";

import React from "react";
import { DateHeader } from "./../../DateHeader";
import { PastDay } from "./PastDay";
import { SingleGuessDay } from "./SingleGuessDay";

const StyledDayWrapper = styled.div`
  padding: 1rem;
  border: 1px solid black;
  width: calc(50% - 10px);
  min-height: 20rem;
  margin: 5px;
  text-align: center;
  padding-bottom: 2rem;

  background-color: ${props => (props.today ? "#ff71719c" : "white")};

  @media screen and (max-width: 450px) {
    width: calc(100% - 10px);
  }
`;

class DaySelector extends React.Component {
  render() {
    let day = "";
    if (this.props.day.revealDateAsString === this.props.date) {
      day = <SingleGuessDay />;
    } else if (this.props.day.solutionArtist !== null) {
      day = <PastDay day={this.props.day} />;
    } else {
      day = <p>Luke ikke åpnet</p>;
    }

    return (
      <StyledDayWrapper
        today={this.props.day.revealDateAsString === this.props.date}
      >
        <DateHeader
          unixDate={this.props.day.revealDateAsString}
          style={{
            marginBottom: "1rem"
          }}
        ></DateHeader>
        {day}
      </StyledDayWrapper>
    );
  }
}

export default DaySelector;
