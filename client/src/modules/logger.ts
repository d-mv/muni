const logger = (props: { text: string; emph: string; type?: string }) => {
  const color = { text: "white", back: "orange" };
  switch (props.type) {
    case "positive":
      color.text = "green";
      color.back = "LightGreen";
      break;
    case "attention":
      color.text = "red";
      color.back = "pink";
      break;
  }
  console.log(
    `>>> ${props.text} %c${props.emph}`,
    `color: ${color.text}; background-color: ${color.back}; padding: 2px 5px; border-radius: 2px`
  );
};

export default logger
