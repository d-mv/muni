const generateStyleName = (t1: string, t2: string, t3?: string) => {
  let styleName = t1 + t2[0].toUpperCase() + t2.slice(1);
  if (t3) styleName = styleName + t3[0].toUpperCase() + t3.slice(1);
  return styleName;
};

export const replyCardStyleUtil = (
  reply: {
    up: string[];
    down: string[];
  },
  opened: boolean
) => {
  const up = reply.up.length;
  const down = reply.down.length;

  let replyCardColor = "secondary";
  if (up < down) replyCardColor = "attention";
  if (up === down) replyCardColor = "white";

  const replyHeight = opened ? "open" : "closed";
  const replyCardStyle = generateStyleName("card", replyCardColor, replyHeight);
  return { replyCardStyle, replyCardColor };
};
