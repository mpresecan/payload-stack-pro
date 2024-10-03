'use client'

import { CodeNode } from "@lexical/code"
import { AutoLinkNode, LinkNode } from "@lexical/link"
import { ListItemNode, ListNode } from "@lexical/list"
import { TRANSFORMERS } from "@lexical/markdown"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import { isValidUrl } from "./utils/url"
import { ActionsPlugin } from "./plugins/Actions"
import { AutoLinkPlugin } from "./plugins/AutoLink"
import { EditLinkPlugin } from "./plugins/EditLink"
import { FloatingMenuPlugin } from "./plugins/FloatingMenu"
import { LocalStoragePlugin } from "./plugins/LocalStorage"
import { OpenLinkPlugin } from "./plugins/OpenLink"
import {
  EditorHistoryStateContext,
  useEditorHistoryState,
} from "./context/EditorHistoryState"
import { cn } from "@/utilities/cn"
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'
import { useState } from 'react'

export const EDITOR_NAMESPACE = "lexical-full-width-editor"

const EDITOR_NODES = [
  AutoLinkNode,
  CodeNode,
  HeadingNode,
  LinkNode,
  ListNode,
  ListItemNode,
  QuoteNode,
]

type EditorProps<TFieldValues extends FieldValues> = {
  className?: string,
  onChange: (value: string) => void
  content: string
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>
  maxCharacters?: number
  placeholder?: string
}

export function Editor<TFieldValues extends FieldValues = FieldValues>(props: EditorProps<TFieldValues>) {
  return (
    <div
      id="editor-wrapper"
      className={cn(
        props.className,
        "w-full max-w-none relative prose prose-slate dark:prose-invert prose-p:my-0 prose-headings:mb-4 prose-headings:mt-2"
      )}
    >
      <EditorHistoryStateContext>
        <LexicalEditor
          config={{
            namespace: EDITOR_NAMESPACE,
            nodes: EDITOR_NODES,
            editorState: props.content,
            theme: {
              root: "w-full p-4 border border-input rounded-md min-h-[200px] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              link: "cursor-pointer text-primary underline",
              text: {
                bold: "font-semibold",
                underline: "underline decoration-wavy",
                italic: "italic",
                strikethrough: "line-through",
                underlineStrikethrough: "underline line-through",
              },
            },
            onError: (error) => {
              console.error(error)
            },
          }}
          onChange={props.onChange}
          field={props.field}
          maxCharacters={props.maxCharacters}
          placeholder={props.placeholder}
        />
      </EditorHistoryStateContext>
    </div>
  )
}

type LexicalEditorProps<TFieldValues extends FieldValues> = {
  config: Parameters<typeof LexicalComposer>["0"]["initialConfig"],
  onChange?: (value: string) => void,
  field?: ControllerRenderProps<TFieldValues, Path<TFieldValues>>,
  maxCharacters?: number
  placeholder?: string
}

function LexicalEditor<TFieldValues extends FieldValues>(props: LexicalEditorProps<TFieldValues>) {
  const { historyState } = useEditorHistoryState()
  const [characterCount, setCharacterCount] = useState(0)

  const maxCharacters = props.maxCharacters || 5000

  return (
    <LexicalComposer initialConfig={props.config}>
      <div className="flex flex-col w-full gap-2">
        <RichTextPlugin
          contentEditable={<ContentEditable className="min-h-[150px] w-full" spellCheck={false} />}
          placeholder={<Placeholder placeholder={props.placeholder}/>}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
      <div className='flex items-center justify-between'>
        <OnChangePlugin onChange={(editorState) => {
          const json = editorState.toJSON()
          if(props.field) {
            props.field.onChange(JSON.stringify(json))
          }
          setCharacterCount(json.root.children.reduce((acc: number, child: any) =>
            acc + (child.children?.[0]?.text?.length || 0), 0
          ))
        }} />
        <HistoryPlugin externalHistoryState={historyState} />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        <ListPlugin />
        <LinkPlugin validateUrl={isValidUrl} />
        <ActionsPlugin />
        {characterCount > (maxCharacters * 0.9) && (<div className='text-muted-foreground'>Character count: {characterCount}/{maxCharacters}</div>)}
        <AutoLinkPlugin />
        <EditLinkPlugin />
        <FloatingMenuPlugin />
        <LocalStoragePlugin namespace={EDITOR_NAMESPACE} />
        <OpenLinkPlugin />
      </div>
    </LexicalComposer>
  )
}

const Placeholder = ({placeholder = 'Start writing...'} : {placeholder?: string}) => {
  return (
    <div className="absolute top-[1.125rem] left-[1.125rem] text-muted-foreground">
      {placeholder}
    </div>
  )
}
