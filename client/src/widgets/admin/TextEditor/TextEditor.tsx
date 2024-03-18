"use client";

import { EditorContent, type Editor } from "@tiptap/react";
import { EditorButtons } from "./EditorButtons/EditorButtons";
import s from "./TextEditor.module.scss";

interface CustomEditorProps {
  editor: Editor | null;
}

export const TextEditor = ({ editor }: CustomEditorProps) => {
  return (
    <EditorContent className={s.editor} editor={editor}>
      <EditorButtons editor={editor} />
    </EditorContent>
  );
};
