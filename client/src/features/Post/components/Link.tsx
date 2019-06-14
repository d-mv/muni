import React from "react";

import { IconLink, IconEdit, IconDelete } from "../../../icons";

import styles from "./style/Link.module.scss";

const iconWrapper = (style: string, icon: JSX.Element) => (
  <div className={styles[style]}>{icon}</div>
);

const Link = (props: {
  text: string;
  direction: string;
  primary?: boolean;
  secondary?: boolean;
  edit?: boolean;
}) => {
  const mainStyle = props.edit ? styles.editing : styles.show;
  const color = props.secondary ? "secondary" : "primary";
  const iconLink = iconWrapper("link", <IconLink color={color} />);
  const iconDelete = iconWrapper("delete", <IconDelete color={color} />);
  const iconEdit = iconWrapper("edit", <IconEdit color={color} />);

  // let icon;
  // if (!props.edit && props.primary) {
  //   icon = <IconLink primary />;
  // } else if (!props.edit && props.secondary) {
  //   icon = <IconLink secondary />;
  // } else if (props.edit && props.primary) {
  //   icon = <IconEdit primary />;
  // } else if (props.edit && props.secondary) {
  //   icon = <IconEdit secondary />;
  // }

  // console.log(props.edit);

  // const editIcon = (
  //   <span className={style.edit}>
  //     <IconDelete primary />
  //   </span>
  // );
  // const linkEditStyle = props.edit ? style.linkEdit : style.link;

  return (
    <div className={mainStyle}>
      {iconEdit}
      {/* <div className={styles.line}> */}
        {iconLink}
      <div className={styles.text}>{props.text}</div>
      {/* </div> */}
      {iconDelete}
    </div>
  );
};

export default Link;
