import React from "react";

import styles from "./style/Photo.module.scss";
import { IconEdit, IconDelete } from "../../../icons";

const iconWrapper = (style: string, icon: JSX.Element) => (
  <div className={styles[style]}>{icon}</div>
);

export const Photo = (props: {
  src: string;
  preview?: boolean;
  edit?: boolean;
  primary?: boolean;
  secondary?: boolean;
}) => {
  const mainStyle = props.edit ? styles.editing : styles.show;
  const color = props.secondary ? "secondary" : "primary";
  const iconDelete = iconWrapper("delete", <IconDelete color={color} />);
  const iconEdit = iconWrapper("edit", <IconEdit color={color} />);

  const photo = <img src={props.src} className={styles.photo} />;

  return (
    <div className={mainStyle}>
      {iconEdit}
      {photo}
      <div className={styles.circle}>{iconDelete}</div>
    </div>
  );
};
