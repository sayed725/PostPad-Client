"use client";
import React, { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";

const QuillEditor = ({ value, onChange, placeholder = "Write something..." }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null); // Quill type can be imported if needed

  useEffect(() => {
    import("quill").then((QuillModule) => {
      const Quill = QuillModule.default;
      if (!editorRef.current || quillRef.current) return;

      quillRef.current = new Quill(editorRef.current, {
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, false] }],
            ["bold", "italic", "underline"],
            // ["image", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
            ["clean"],
          ],
        },
        placeholder,
        theme: "snow",
      });

      quillRef.current.on("text-change", () => {
        const editor = editorRef.current;
        const qlEditor = editor?.querySelector(".ql-editor");
        const html = qlEditor ? qlEditor.innerHTML : "";
        onChange(html);
      });
    });
  }, [placeholder]); // Only re-init if placeholder changes (rare)

  useEffect(() => {
    if (quillRef.current && value !== undefined) {
      const currentHtml = quillRef.current.root.innerHTML;
      if (currentHtml !== value) {
        quillRef.current.root.innerHTML = value || "";
      }
    }
  }, [value]);

  return (
    <div>
      <div ref={editorRef} className="min-h-[200px] border border-gray-300 rounded" />
    </div>
  );
};

export default QuillEditor;