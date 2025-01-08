import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../conf/conf";

export default function RTE({name, control, label, defaultValue = ""}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className="relative rounded-lg border border-gray-300 shadow-sm hover:border-orange-300 transition-all duration-300">
        <Controller
          name={name || "content"}
          control={control}
          render={({ field: {onChange}}) => (
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
                  }
                  body:focus {
                    outline: 2px solid transparent;
                    outline-offset: 2px;
                    box-shadow: 0 0 0 2px rgb(249, 115, 22);
                  }
                `,
                skin: "oxide",
                content_css: "default",
                body_class: "rounded-lg",
                setup: (editor) => {
                  editor.on('init', () => {
                    editor.getContainer().style.borderRadius = '0.5rem';
                    editor.getContainer().style.backgroundColor = 'rgb(255 255 255 / 0.7)';
                    editor.getContainer().style.backdropFilter = 'blur(8px)';
                  });
                }
              }}
              onEditorChange={onChange}
              className="overflow-hidden rounded-lg backdrop-blur-sm bg-white/70"
            />
          )}
        />
      </div>
    </div>
  );
}
