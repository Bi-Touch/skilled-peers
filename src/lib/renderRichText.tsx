"use client";

import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS, Document } from "@contentful/rich-text-types";

function renderRichText(content: Document) {
  if (!content) return null;

  return documentToReactComponents(content, {
    renderMark: {
      [MARKS.BOLD]: (text) => <strong>{text}</strong>,
      [MARKS.ITALIC]: (text) => <em>{text}</em>,
      [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_, children) => (
        <p className="mb-4 text-gray-700">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (_, children) => (
        <h1 className="text-3xl font-bold mt-6 mb-4">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (_, children) => (
        <h2 className="text-2xl font-semibold mt-5 mb-3">{children}</h2>
      ),
      [BLOCKS.UL_LIST]: (_, children) => (
        <ul className="list-disc pl-6 mb-4">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (_, children) => (
        <ol className="list-decimal pl-6 mb-4">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (_, children) => <li>{children}</li>,
      [INLINES.HYPERLINK]: (node, children) => (
        <a
          href={node.data.uri}
          className="text-blue-600 underline hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
  });
}

export default renderRichText;