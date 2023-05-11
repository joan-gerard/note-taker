import { Form, useNavigation } from "@remix-run/react";
import { useActionData } from "react-router";
import styles from "./AddNoteForm.css";

function AddNoteForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
      console.log('here')

      
  // get data from an action
  const ActionData = useActionData() as ActionData | undefined;
  return (
    <Form method="post" id="note-form">
      {ActionData == undefined ? null : (
        <p className="error">{ActionData.message}</p>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Note"}
        </button>
      </div>
    </Form>
  );
}

export default AddNoteForm;

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
