import { useState, useCallback ,useEffect, useRef} from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8) // will be use to set the length of the password
  const [numAllowed, setNumAllowed] = useState(false) // will use to check whether to included numbers in password
  const [charAllowed, setCharAllowed] = useState(false) //will be used to check either it has to add special characters or not
  const [password, setPassword] = useState()

  let passwordRef = useRef(null)

const CopyToClipBoard = useCallback(() => {
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
  
}, [password])

  const passwordGenerator = useCallback(() => {
    let pass=""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!~#@$%^&*()_-=+{}[]"

    for (let index = 1; index <= length; index++) {
      const strCharIndex = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(strCharIndex)
    }

    setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword])

  useEffect(()=>{
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <h1 className='bg-orange-300'> PASSWORD GENERATOR</h1>
      <br />
      <div className='w-full max-w-md mx-auto shadow-xl px-4 my-4 py-5 rounded-2xl text-blue-700   bg-orange-500'>

        <div className='flex overflow-hidden mb-4 justify-center'>
          <input type="text"
            placeholder='password'
            className='outline-none px-5 py-1.5 rounded-s-2xl  '
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button className='bg-gray-400 px-2 rounded-e-xl font-bold  shrink-0 '
          onClick={CopyToClipBoard}
          > Copy</button>
        </div>

        <div className='flex mx-auto  gap-x-1 justify-center'>
          <input type="range"
            className="outline-none text-black px-1 py-1 cursor-pointer "
            min={6}
            max={100}
            value={length}
            onChange={(e) => { setLength(e.target.value) }}
            />
          <label className='font-bold  mb-1  '>LENGTH: {length}</label>
            </div>
            
            <div className='flex mx-auto gap-x-1 justify-center'>

          <input type="checkbox"  
            defaultChecked={numAllowed}
            id='numberInput'
            onChange={() => {
              setNumAllowed((prevEvent) => !prevEvent)
              }}
              />
          <label htmlFor="" className='font-bold  mb-1 mr-6' >Number </label>

          <input type="checkbox"
            defaultChecked={charAllowed}
            id='charInput'
            className='ml-2'
            onChange={() => {
              setCharAllowed((prevEvent) => !prevEvent)
              }}
              />
          <label htmlFor="" className='font-bold px-0.5 mb-1 mr-1' >Character </label>

              </div>
      </div>
    </>
  )
}

export default App
