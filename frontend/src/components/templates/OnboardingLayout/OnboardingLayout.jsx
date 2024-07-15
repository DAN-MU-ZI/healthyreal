import * as React from "react";
import {useEffect} from "react";
import "./styles.css";

export default function OnboardingLayout(props) {
  const {header, contents, bottoms} = props;
  useEffect(() => {}, []);
  return (
    <div>
      <article className="onboarding-layout">
        <section className="headers">
          {header === "back" ? <div>back</div> : null}
        </section>
        <section className="contents">{contents}</section>
        <section className="bottoms">
          {bottoms === "next" ? <div>next</div> : null}
        </section>
      </article>
    </div>
  );
}
