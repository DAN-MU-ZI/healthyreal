import * as React from "react";
import {useEffect} from "react";
import "./styles.css";

interface Props {
  header: "back" | "settings" | "none";
  title: React.ReactNode;
  contents?: React.ReactNode;
  bottoms?: React.ReactNode;
}
export default function OnboardingLayout(props: Props) {
  const {header, title, contents, bottoms} = props;
  useEffect(() => {}, []);
  return (
    <div className="divTag">
      <article className="onboarding-layout">
        <section className="headers">
          {header === "back" ? <div>back</div> : null}
          <section className="title">{title}</section>
        </section>
        <section className="contents">{contents}</section>
        <section className="bottoms">{bottoms}</section>
      </article>
    </div>
  );
}
