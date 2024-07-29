import * as React from "react";
import { useEffect } from "react";
import "./styles.css";
import Back from "../../atoms/Back";

interface Props {
  header: React.ReactNode;
  title: React.ReactNode;
  contents?: React.ReactNode;
  bottoms?: React.ReactNode;
}
export default function OnboardingLayout(props: Props) {
  const { header, title, contents, bottoms } = props;
  useEffect(() => { }, []);
  return (
    <div className="divTag">
      <article className="onboarding-layout">
        <section className="headers">
          {header}
          <section className="title">{title}</section>
        </section>
        <section className="contents">{contents}</section>
        <section className="bottoms">{bottoms}</section>
      </article>
    </div>
  );
}
