import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import homeStyles from "../styles/home.css";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Note Taker" }];
};

export default function Index() {
  return (
    <main id="content" className="flex flex-col items-center">
      <h1>A better way of keeping track of your notes</h1>
      <p id="cta">
        <Link to="/notes">Try Now!</Link>
      </p>
    </main>
  );
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: homeStyles },
];
// this style sheet will only be applied to this file
