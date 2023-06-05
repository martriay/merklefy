'use client'

import { useState, Fragment, ChangeEvent } from 'react'
import { StandardMerkleTree } from '@openzeppelin/merkle-tree'
import { parse } from 'csv-parse/sync'

import ErrorMessage from './error'

const encoding = ['address', 'uint256']
const placeholder = '"0x2222222222222222222222222222222222222222", "2500000000000000000"'
const defaultValues = [
  ['0x0000000000000000000000000000000000000000', '0987654345678999878']
]
const defaultTree = StandardMerkleTree.of(defaultValues, encoding)

export default function Home() {
  const [tree, setTree] = useState(defaultTree)
  const [error, setError] = useState('')
  const [text, setText] = useState('')
  
  const updateTree = () => {
    try {
      let values = parse(text, {
        skip_empty_lines: true,
        trim: true
      })
      setTree(StandardMerkleTree.of(values, encoding))
      setError('')
    } catch (e) {
      let message: string
      if (typeof e === 'string') {
        message = e
      } else if (e instanceof Error) {
        message = e.message
      } else {
        message = 'nidea'
      }
      setError(message)
    }
  }

  const resetTree = () => {
    setTree(defaultTree)
  }

  const parseFile = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    const file = target.files![0]

    if (file.size > 1024 * 1024 * 500) {
      setError('File size must be less than 500mb')
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const t = e.target!.result as string
      setText(t)
      resetTree()
    }

    reader.readAsText(file)
    target.value = '' // allows re-submitting same file
  }

  const downloadTree = () => {
    const exportName = 'merklefy-tree'
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tree.dump()))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute('href', dataStr)
    downloadAnchorNode.setAttribute('download', exportName + '.json')
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-0 md:p-24'>
      <div className='container px-8 max-w-3xl mx-auto'>

        <h1 className='py-4 text-5xl font-bold text-center gradient'>
          Merklefy 🍃
        </h1>

        <form
          className=''
          onSubmit={e => {
            e.preventDefault()
            updateTree()
          }}
          >

          <pre className='px-4 py-3 mt-8 font-mono text-left bg-transparent border rounded border-zinc-600 focus:border-zinc-100/80 focus:ring-0 sm:text-sm text-zinc-100'>
            <div className='flex items-start px-1 text-sm'>
              <div aria-hidden='true' className='pr-4 font-mono border-r select-none border-zinc-300/5 text-zinc-700'>
                {Array.from({
                  length: text.split('\n').length,
                }).map((_, index) => (
                  <Fragment key={index}>
                    {(index + 1).toString().padStart(2, '0')}
                    <br />
                  </Fragment>
                ))}
              </div>

              <textarea
                id='text'
                name='text'
                value={text}
                minLength={1}
                onChange={ e => {
                  setText(e.target.value)
                  resetTree()
                } }
                rows={Math.max(5, text.split('\n').length)}
                placeholder={placeholder}
                className='w-full p-0 text-base bg-transparent border-0 appearance-none resize-none hover:resize text-zinc-100 placeholder-zinc-500 focus:ring-0 sm:text-sm'
                />
            </div>
          </pre>

          <div className='flex flex-col items-center justify-center w-full gap-4 mt-4 sm:flex-row'>
            <div className='w-full sm:w-1/5'>
              <label
                className='flex items-center justify-center h-16 px-3 py-2 text-sm whitespace-no-wrap duration-150 border rounded hover:border-zinc-100/80 border-zinc-600 focus:border-zinc-100/80 focus:ring-0 text-zinc-100 hover:text-white hover:cursor-pointer '
                htmlFor='file_input'
                >
                Or upload a file
              </label>
              <input
                className='hidden'
                id='file_input'
                type='file'
                onChange={ parseFile }
              />
            </div>
            <button
              type='submit'
              disabled={text.length <= 0}
              className={`w-full h-16 px-3 py-2 duration-150 rounded sm:w-4/5 text-base font-semibold leading-7 bg-zinc-200 ring-1 ring-transparent duration-150 ${
                text.length <= 0
                ? 'text-zinc-400 cursor-not-allowed'
                : 'text-zinc-900 hover:text-zinc-100 hover:ring-zinc-600/80  hover:bg-zinc-900/20'
              }`}
              >
              <span>Generate 🍃</span>
            </button>
          </div>
        </form>

        { tree.root !== defaultTree.root
          ? <>
            <div className='relative w-full h-16 px-3 py-2 mt-5 duration-150 border rounded text-lime-500 border-lime-100 focus-within:border-zinc-100/80 focus-within:ring-0 overflow-auto'>
              <label htmlFor='reads' className='block text-xs font-medium text-lime-100'>
              Root
              </label>
              <p>{tree.root}</p>
            </div>
            <button
              type='submit'
              onClick={ downloadTree }
              disabled={text.length <= 0}
              className={`w-full h-12 px-3 py-2 mt-2 duration-150 rounded text-base font-semibold leading-7 bg-lime-200 ring-1 ring-transparent duration-150 text-zinc-900 hover:text-zinc-100 hover:ring-zinc-600/80  hover:bg-lime-800/20`}
              >
              <span>Download tree 🌳🪓</span>
            </button>
          </>
          : <></>
        }

        {error ? <ErrorMessage message={error} /> : null}

        <div className='mt-8'>
          <p className='space-y-2 text-xs text-zinc-500'>
            made with <a className='underline hover:text-white' href='https://github.com/OpenZeppelin/merkle-tree' target='_blank'>@openzeppelin/merkle-tree</a> by <a className='underline hover:text-white' href='https://marto.lol' target='_blank'>marto.lol</a>
          </p>
        </div>

      </div>
    </main>
  )
}
