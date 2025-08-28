"use client"

import * as React from "react"
import * as Toast from "@radix-ui/react-toast"

export function Toaster() {
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = React.useState("")

  // helper: call this from anywhere
  ;(window as any).toast = (msg: string) => {
    setMessage(msg)
    setOpen(true)
  }

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className="fixed bottom-4 right-4 rounded-lg bg-black text-white px-4 py-3 shadow-lg"
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Title className="font-medium">{message}</Toast.Title>
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  )
}