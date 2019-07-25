import React from "react";

/**
 * React JSX component to wrap page
 * @param {object} props - Children to display, boolean labels - opposite and welcome
 * @returns {JSX.Element}
 */
const Page = (props: { children: any; welcome: boolean }): JSX.Element => (
  <main className='welcome'>{props.children}</main>
);

export default Page;
