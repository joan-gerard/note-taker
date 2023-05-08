import React from "react";
import { Link } from "@remix-run/react";
import AddNoteForm, { links as newNoteLinks } from "~/components/AddNoteForm";

const notes = () => {
  return (
    <main>
      <AddNoteForm />
    </main>
  );
};

export default notes;

export function links() {
  return [...newNoteLinks()];
}