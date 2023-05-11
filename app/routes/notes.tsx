import React from "react";
import {
  isRouteErrorResponse,
  Link,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import AddNoteForm, { links as newNoteLinks } from "~/components/AddNoteForm";
import NoteList, { links as noteListLink } from "~/components/NoteList";
import { getStoredNotes, storeNotes } from "~/data/notes";
import { redirect, V2_MetaFunction } from "@remix-run/node";
import { json } from "react-router";
import { HydrationProvider, Client } from "react-hydration-provider";

const notes = () => {
  // Get data from a loader
  const notes: NoteRecord[] = useLoaderData();

  return (
    <main>
      <AddNoteForm />
      <NoteList notes={notes} />
    </main>
  );
};

export default notes;

// will run in BE
// is triggered only when a non-GET request reaches this route, ie localhost:3000/notes - since the form is wrapped in 'notes' page
export async function action({ request }: { request: any }) {
  const formData = await request.formData();
  const noteData: NoteRecord = {
    title: formData.get("title"),
    content: formData.get("content"),
    id: new Date().toISOString(),
  };

  // Add Validation
  if (noteData.title.trim().length < 5) {
    return { message: "Invalid title. Must be at least 5 characters long" };
  }

  const existingNotes = await getStoredNotes();
  const updatedNotes: NoteRecord[] = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  return redirect("/notes");
}

// triggered when a GET request when route is hit
export async function loader() {
  const notes: NoteRecord[] = await getStoredNotes();

  if (!notes || notes.length === 0) {
    throw json(
      {
        message: "Could not find any notes",
      },
      {
        status: 404,
        statusText: "Not Found",
      }
    );
  }

  return notes;

  // Below: What Remix does under the hood

  // return json(notes)

  // OR

  // return new Response(JSON.stringify(notes), {
  //   headers: { "Content-Type": "application/json" },
  // });
}

export function links() {
  return [...newNoteLinks(), ...noteListLink()];
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
          <main>
        <AddNoteForm />
        <p className="info-message">{error.data.message}</p>
      </main>
    );
  } else if (error instanceof Error) {
    return (
      <HydrationProvider>
        <main className="error">
          <h1>An error related to your notes occurred</h1>
          <p>error instanceof Error</p>
          <p>{error.stack}</p>
          <p>
            Back to <Link to="/">Safety</Link>
          </p>
        </main>
      </HydrationProvider>
    );
  }
}

export const meta: V2_MetaFunction = () => {
  return [{ title: "All notes", description: "Manage your notes with ease" }];
};
