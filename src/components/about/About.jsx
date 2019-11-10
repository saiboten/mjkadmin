import React from "react";
import { Wrapper } from "../lib/Wrapper";

export const About = function() {
  return (
    <Wrapper>
      <div class="about__container">
        <h3>Om kalenderen</h3>
        <p class="about__text">
          Hver dag åpnes det en ny luke i kalenderen. Hver luke er et lydklipp,
          og din oppgave er å gjette hvilken låt som spilles!
        </p>
        <p class="about__text">
          Du vil umiddelbart få svar på om du hadde riktig eller feil svar.
        </p>
        <p class="about__text">
          Vi har en toppscoreliste som viser hvem som leder konkurrensen, i
          tillegg til en dagsliste med de som har svart riktig på dagens
          oppgave.
        </p>
        <p class="about__text">
          Den beste brukeren blir premiert med et krus for to, og et diplom!
        </p>

        <h3>Bidragsytere</h3>
        <div class="about__text">
          Kalenderen hadde ikke vært mulig uten følgende flotte mennesker:
          <ul>
            <li>Stein</li>
            <li>Tomas</li>
            <li>"Skøyerfanden"</li>
            <li>Bjarte</li>
            <li>Kim</li>
            <li>Matt</li>
            <li>Sindre</li>
          </ul>
        </div>

        <h3>Kontakt</h3>
        <p class="about__text">
          Den enkleste måten å ta kontakt med folket bak kalenderen er å bruke
          vår{" "}
          <a href="https://www.facebook.com/musikkjulekalender">
            facebook-side
          </a>
        </p>
        <p class="about__text">
          Det er også mulig å ta kontakt med mannen bak kalenderen - Tobias - på{" "}
          <a href="http://www.twitter.com/saiboten">twitter</a>
        </p>
      </div>
    </Wrapper>
  );
};
