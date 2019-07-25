import React from "react";

import { appLogo } from "../icons/AppLogo";
import style from "./style/Logo.module.scss";

const Logo = () => <span className={style.logo}>{appLogo}</span>;

export default Logo;
