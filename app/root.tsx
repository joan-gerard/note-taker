import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
// import styles from "./tailwind.css";
import cssSheet from "../app/styles/main.css";
import MainNavigation from "./components/MainNavigation";

export const links: LinksFunction = () => [
  // { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: cssSheet },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
          <title>An Error Occurred</title>
        </head>
        <body>
          <header>
            <MainNavigation />
          </header>
          <main>
            <h1>An Error Occurred</h1>
            <p>{error.data}</p>
            <p>
              Back to <Link to="/">Safety</Link>
            </p>
          </main>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  } else if (error instanceof Error) {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
          <title>An Error Occurred</title>
        </head>
        <body>
          <header>
            <MainNavigation />
          </header>
          <main className="error">
            <h1>An Error Occurred</h1>
            <p>{error.stack}</p>
            <p>
              Back to <Link to="/">Safety</Link>
            </p>
          </main>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
}
