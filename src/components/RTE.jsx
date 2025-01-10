import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../conf/conf";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className="relative rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm 
      hover:border-orange-300 dark:hover:border-orange-500 transition-all duration-300">
        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              apiKey={conf.apikey}
              initialValue={defaultValue}
              init={{
                initialValue: defaultValue,
                height: 300,
                menubar: true,
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
                ],
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style: `
                  body {
                    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                    font-size: 14px;
                    line-height: 1.6;
                    padding: 0.5rem;
                    color: var(--text-color, #111827);
                    background-color: var(--bg-color, rgb(255 255 255 / 0.7));
                  }
                  body:focus {
                    outline: 2px solid transparent;
                    outline-offset: 2px;
                    box-shadow: 0 0 0 2px rgb(249, 115, 22);
                  }
                  @media (prefers-color-scheme: dark) {
                    body {
                      --text-color: #e5e7eb;
                      --bg-color: rgb(31 41 55 / 0.7);
                    }
                  }
                `,
                skin: window.document.documentElement.classList.contains('dark') ? "oxide-dark" : "oxide",
                content_css: window.document.documentElement.classList.contains('dark') ? "dark" : "default",
                body_class: "rounded-lg",
                setup: (editor) => {
                  editor.on('init', () => {
                    editor.getContainer().style.borderRadius = '0.5rem';
                    editor.getContainer().style.backgroundColor = window.document.documentElement.classList.contains('dark')
                      ? 'rgb(31 41 55 / 0.7)'
                      : 'rgb(255 255 255 / 0.7)';
                    editor.getContainer().style.backdropFilter = 'blur(8px)';
                  });
                }
              }}
              onEditorChange={onChange}
              className="overflow-hidden rounded-lg backdrop-blur-sm bg-white/70 dark:bg-gray-800/70"
            />
          )}
        />
      </div>
    </div>
  );
}
