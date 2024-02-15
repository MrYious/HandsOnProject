'use client'

import { useEffect, useState } from "react";

import Image from "next/image";

export default function Home() {

  interface pencilText {
    type: string,
    text: string,
    maxLength: number,
    color: string,
  }

  const [pencil, setPencil] = useState({
    key: '',
    type: 'graphite',
    text: '',
    color: 'red'
  });

  const [textList, setTextList] = useState([
    {
      key: 'Sample', //should use unique id generator
      type: 'graphite',
      text: 'Sample',
      color: 'red'
    }
  ])

  useEffect(() => {
    setTextList([])
  }, [])

  const handleAdd = () => {
    if(pencil.text.length !== 0 && textList.length < 5){
      setTextList([
        ...textList,
        pencil
      ])
      setPencil({
        key: '',
        type: 'graphite',
        text: '',
        color: 'red'
      })
    }
  }

  const handleChange = (e:any) =>{
    let text: string = e.target.value;
    text = text.replaceAll(' ', '')
    if(text.length <= (pencil.type === 'graphite' ? 50 : 30))
      setPencil({...pencil, text: e.target.value, key: e.target.value})
  }

  const handleDelete = (key: string) =>{
    let newList = textList.filter((text) => text.key !== key)
    setTextList([...newList])
  }

  const handleEdit = (key: string) =>{
    const newText  = prompt('Enter new text')
    // setTextList(
    //   textList.map(text => {
    //     if (text.key !== key)
    //       text
    //     else
    //       return {
    //         ...text,
    //         text.text: newText
    //       }
    //   })
    // )
  }

  return (
    <main className="flex flex-col gap-6 min-h-screen justify-center items-center py-20">
      <h1 className="font-bold text-2xl">Pencil App</h1>
      {/* INPUT */}
      <div className="flex flex-col gap-2 p-6 border-[1px] border-gray-300 w-1/3">
        <div className="flex items-center justify-between gap-5 w-full">
          <div>
            Current Pencil : <strong>{pencil.type === 'graphite' ? 'Graphite' : 'Coloured'}</strong>
          </div>
          <button disabled={textList.length == 5} className="border-[1px] border-black py-1 px-2 rounded shadow-sm hover:shadow-black text-sm"
            onClick={()=>{setPencil({...pencil,text: '', color: 'red', type: pencil.type === 'graphite' ? 'coloured' : 'graphite'})}}
          >
            Switch to {pencil.type === 'graphite' ? 'Graphite' : 'Coloured'}
          </button>
        </div>
        <div className="text-sm">
          You can write upto {pencil.type === 'graphite' ? 50 : 30} characters
        </div>
        <div className="flex flex-col gap-1 w-full">
          <textarea className=" resize-none border-[1px] border-gray-400 rounded outline-none p-1 text-sm w-full"
            name="text"
            id="text"
            rows={3}
            value={pencil.text}
            onChange={handleChange}
          />
          <div className="flex justify-between">
            {
              pencil.type === 'coloured' && <>
                Select color:
                {/* <input type="text" className="border-[1px] border-gray-500 w-1/3 px-2"  value={pencil.color} onChange={(e)=>{setPencil({...pencil, color: e.target.value})}} /> */}
                <select name="color" className="border-[1px] border-gray-500 w-1/3 px-2" id="color" value={pencil.color}  onChange={(e)=>{setPencil({...pencil, color: e.target.value})}}>
                  <option value="Red">Red</option>
                  <option value="Green">Green</option>
                  <option value="Blue">Blue</option>
                </select>
              </>
            }
          </div>
          <button onClick={handleAdd} className="bg-green-700 rounded py-2 hover:bg-green-900 text-white">
            ADD
          </button>
          <div className="text-right text-xs">
            {
              pencil.text.replaceAll(' ','').length + ' characters'
            }
          </div>
        </div>
      </div>
      {/* DISPLAY */}
      <div className="border-[1px] border-gray-200 w-1/3 flex flex-col gap-2 p-5">
        <h1 className="text-center font-bold text-xl">List of texts</h1>
        <div>
          {
            textList.map((text)=>{
              return <div key={text.key} className="border-[1px] border-gray-400 p-1">
                <div><b>Text:</b> {text.text}</div>
                <div><b>Pencil Type:</b> {text.type === 'graphite' ? 'Graphite' : 'Coloured'}</div>
                {
                  text.type === 'coloured' &&
                  <div><b>Color:</b> {text.color}</div>
                }
                <div className="flex gap-2">
                  <button onClick={()=>{handleEdit(text.key)}} className="py-1 px-3 text-sm rounded bg-blue-700 text-white">
                    Edit
                  </button>
                  <button onClick={()=>{handleDelete(text.key)}} className="py-1 px-3 text-sm rounded bg-red-700 text-white">
                    Delete
                  </button>
                </div>
              </div>
            })
          }
        </div>
      </div>
    </main>
  );
}
