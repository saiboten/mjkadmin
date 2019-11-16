import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: white;
  text-align: center;
  margin: 1rem auto;
  width: 33rem;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1.5rem;
`;

export const Footer = function() {
  return (
    <StyledFooter>
      Laget av Tobias Rusås Olsen.
      <Link to="/om">Om musikkjulekalenderen</Link>
    </StyledFooter>
  );
};
