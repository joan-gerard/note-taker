import React from "react";
import { Link } from "@remix-run/react";
import AddNoteForm, { links as newNoteLinks } from "~/components/AddNoteForm";
import { getStoredNotes, storeNotes } from "~/data/notes";
import { redirect } from "@remix-run/node";

interface NoteRecord {
  title: string;
  content: string;
  id?: string;
}

const notes = () => {
  return (
    <main>
      <AddNoteForm />
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
  };

  // Add Validation

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();

  const updatedNotes = existingNotes.concat(noteData);

  await storeNotes(updatedNotes);

  return redirect("/notes");
}

export function links() {
  return [...newNoteLinks()];
}
