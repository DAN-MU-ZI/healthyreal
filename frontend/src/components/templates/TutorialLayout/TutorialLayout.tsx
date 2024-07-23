import * as React from "react";
import {useEffect} from "react";
import "./styles.css";

interface Props {
  header: "back" | "settings" | "none";
  contents: React.ReactNode;
  bottoms?: React.ReactNode;
}

export default function TutorialLayout(props: Props) {
  const {header, contents, bottoms} = props;
  useEffect(() => {}, []);
  return (
    <div>
      <article className="tutorial-layout">
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
