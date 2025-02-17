"use client"

import { useState } from "react"
import { Editor } from "@monaco-editor/react"
import { Button } from "@/components/ui/button"
import { Terminal } from "lucide-react"

interface ChallengeEditorProps {
  initialCode: string
  language: string
  onSubmit: (code: string) => Promise<void>
}

export function ChallengeEditor({
  initialCode,
  language,
  onSubmit
}: ChallengeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [isRunning, setIsRunning] = useState(false)

  const handleSubmit = async () => {
    try {
      setIsRunning(true)
      await onSubmit(code)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="h-[400px] border rounded-lg overflow-hidden">
        <Editor
          value={code}
          language={language}
          theme="vs-dark"
          onChange={(value) => setCode(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            readOnly: false,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
      <div className="flex justify-end">
        <Button 
          onClick={handleSubmit}
          disabled={isRunning}
        >
          <Terminal className="mr-2 h-4 w-4" />
          {isRunning ? "Running..." : "Run Code"}
        </Button>
      </div>
    </div>
  )
}