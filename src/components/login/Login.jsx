import React from "react";
import styled from "styled-components";
import { Wrapper } from "../lib/Wrapper";
import { StyledButton } from "../lib/Button";

const StyledLoginWrapper = styled.div`
  text-align: center;
  padding: 10px;
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
`;

const StyledLoginButton = styled(StyledButton)`
  margin-left: 20px;
`;

export function Login() {
  return (
    <Wrapper>
      <StyledLoginWrapper>
        <h1>Innlogging</h1>
        <StyledButtons>
          <StyledLoginButton
            onClick={() => (window.location = "/login/google")}
          >
            Logg inn med Google
          </StyledLoginButton>
          <StyledLoginButton
            onClick={() => (window.location = "/login/facebook")}
          >
            Logg inn med Facebook
          </StyledLoginButton>
        </StyledButtons>
      </StyledLoginWrapper>
    </Wrapper>
  );
}