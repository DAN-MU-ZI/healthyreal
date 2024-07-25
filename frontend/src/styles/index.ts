import global from "./global";
import theme from "../assets/theme";
import {Theme} from "@emotion/react";

const styles = (theme: Theme) => {
  global(theme);
};

export default styles;
