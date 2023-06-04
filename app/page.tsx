'use client'

import { useState } from "react"
import { StandardMerkleTree } from "@openzeppelin/merkle-tree"
import { parse } from 'csv-parse/sync'

const encoding = ["address", "uint256"]
const defaultValues = [
  ["0x2222222222222222222222222222222222222222", "2500000000000000000"]
]

export default function Home() {
  const [tree, setTree] = useState(StandardMerkleTree.of(defaultValues, ["address", "uint256"]))
  const [error, setError] = useState('')
  
  const handleChange = (text: string) => {
    try {
      let values = parse(text, { skip_empty_lines: true })
      setTree(StandardMerkleTree.of(values, encoding))
      setError("")
    } catch (e) {
      let message: string
      if (typeof e === "string") {
        message = e
      } else if (e instanceof Error) {
        message = e.message
      } else {
        message = "nidea"
      }
      setError(message)
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <p>{tree.root}</p>
        <p className="text-red">{error}</p>
        <textarea className="text-black" onChange={ e => handleChange(e.target.value) }>
        </textarea>
        <p>{JSON.stringify(tree)}</p>
    </main>
  )
}
