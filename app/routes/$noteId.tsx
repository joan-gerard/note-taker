import type { ActionArgs, LoaderArgs } from "@remix-run/node"; // or cloudflare/deno
import { useParams } from "@remix-run/react";

import { Link, useLoaderData } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import noteDetailsStyles from "../styles/note-details.css";
import { getStoredNotes } from "~/data/notes";
import { json } from "react-router";

const noteDetailsPage = () => {
  const selectedNote: NoteRecord = useLoaderData();
  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all notes</Link>
        </nav>
        <h1>{selectedNote.title}</h1>
      </header>
      <p id="note-details-content">{selectedNote.content}</p>
    </main>
  );
};

export default noteDetailsPage;

export async function loader({ params }: LoaderArgs) {
  const notes: NoteRecord[] = await getStoredNotes();
  const selectedNote = notes.find((note) => {
    // noteId property is the same than the dynamic route
    return note.id === params.noteId;
  });

  if (!selectedNote) {
    throw json({ message: "Note does not exist" }, { status: 404 });
  }
  return selectedNote;
}

export const links: LinksFunction = () => [
  // { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: noteDetailsStyles },
];
