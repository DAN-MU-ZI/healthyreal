import * as React from "react";
import {useEffect} from "react";
import "./styles.css";

export default function StartLayout(props) {
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
