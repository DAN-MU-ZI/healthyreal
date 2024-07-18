import * as React from "react";
import {useEffect} from "react";
import "./styles.css";

interface Props {
  header?: React.ReactNode;
  contents: React.ReactNode;
  bottoms?: React.ReactNode;
}

export default function StartLayout(props: Props) {
  const {header, contents, bottoms} = props;
  useEffect(() => {}, []);
  return (
    <div>
      <article className="start-layout">
        <section className="header">{header}</section>
        <section className="contents">{contents}</section>
        <section className="bottoms">{bottoms}</section>
      </article>
    </div>
  );
}
