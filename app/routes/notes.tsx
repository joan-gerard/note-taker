import React from "react";
import { Link, useLoaderData } from "@remix-run/react";
import AddNoteForm, { links as newNoteLinks } from "~/components/AddNoteForm";
import NoteList, { links as noteListLink } from "~/components/NoteList";
import { getStoredNotes, storeNotes } from "~/data/notes";
import { json, redirect } from "@remix-run/node";

interface NoteRecord {
  title: string;
  content: string;
  id: string;
}

const notes = () => {
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

  const existingNotes = await getStoredNotes();

  const updatedNotes: NoteRecord[] = existingNotes.concat(noteData);

  await storeNotes(updatedNotes);

  return redirect("/notes");
}

// triggered when a GET request when route is hit
export async function loader() {
  const notes: NoteRecord[] = await getStoredNotes();

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
