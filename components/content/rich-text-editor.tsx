"use client"

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

const MarkdownEditor = dynamic(
  () => import('@uiw/react-markdown-editor').then((mod) => mod.default),
  { ssr: false }
)

interface RichTextEditorProps {
  initialValue?: string
  onSave: (content: string) => Promise<void>
}

export function RichTextEditor({ initialValue = '', onSave }: RichTextEditorProps) {
  const [content, setContent] = useState(initialValue)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    try {
      setIsSaving(true)
      await onSave(content)
      toast({
        title: "Success",
        description: "Content saved successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save content",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="min-h-[400px] border rounded-lg overflow-hidden">
        <MarkdownEditor
          value={content}
          onChange={(value) => setContent(value)}
          enableScroll={true}
          toolbarBottom={false}
          className="h-full"
        />
      </div>
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Content"}
        </Button>
      </div>
    </div>
  )
}