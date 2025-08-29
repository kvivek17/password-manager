import React, { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
const URL = import.meta.env.VITE_URL || "http://localhost:7000";
  let ref = useRef()
  let passref = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [forms, setforms] = useState([])

  const getpassword = async () => {
    let req = await fetch(`${URL}/`)
    let password = await req.json()
    setforms(password)
    console.log(password);
    

  }

  useEffect(() => {

getpassword();


  }, [])


  const showpassword = () => {

    if (
      ref.current.innerText === "👁️‍🗨️" && passref.current.type === "text") {
      passref.current.type = "password"
      ref.current.innerText = "👁️";
    }
    else {
      ref.current.innerText = "👁️‍🗨️";
      passref.current.type = "text"
    }
  }

  const copyclick = (copy) => {
    navigator.clipboard.writeText(copy)
  }

  const savepassword = async() => {
    if (form.id) {
      // 🔁 EDIT MODE
      const updatedForms = forms.map(item =>
        item.id === form.id ? form : item
      );
      setforms(updatedForms);
   await fetch(`${URL}/post`,{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify(form)
      })
    } else {
      // ➕ ADD MODE
      const newForm = { ...form, id: uuidv4() };
      const updatedForms = [...forms, newForm];
      setforms(updatedForms);
      let res = await fetch(`${URL}/post`,{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify(newForm)
      })
    }

    // 🔄 Clear form after save/edit
    setform({ site: "", username: "", password: "" });
  };

  const deletepass =async (id) => {
    let c = confirm("are are you sure?")
    if (c) {

      setforms(forms.filter(items => items.id !== id))
       let res = await fetch(`${URL}/del`,{method:"DELETE",headers:{"Content-Type":"application/json"},
      body:JSON.stringify( {id})
      })
    }



  }
  const editpass = (id) => {
    const itemToEdit = forms.find(item => item.id === id);
    setform(itemToEdit);



  }

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  return (

    <div className='px-2 md:px-0 md:mycontainer  ' >
      <h1 className='text-4xl text font-bold text-center'>
        <span>Pass</span><span className='text-green-700'>OP/ &gt;</span>

      </h1>
      <p className='text-green-900 text-lg text-center'>your own password manager</p>
      <div className=' text-black flex flex-col  p-4 items-center '>
        <input name="site" onChange={handlechange} value={form.site} placeholder='enter url' className='rounded-full border border-green-950 w-full p-4 py-1' type="text" id="#" />

        <div className="flex flex-col md:flex-row w-full justify-between gap-8">
          <input name="username" onChange={handlechange} value={form.username} placeholder='enter username' className='rounded-full border border-green-950 w-full p-4 py-1 my-4' type="text" id="#2" />
          <div className='relative'>
            <input ref={passref} name="password" onChange={handlechange} value={form.password} placeholder='enter password' className='rounded-full border border-green-950 w-full p-4 py-1 my-4' type="password" id="#3" />
            <span ref={ref} className='absolute right-2  top-5 cursor-pointer' onClick={showpassword}>👁️</span>

          </div>    </div>
        <button onClick={savepassword} className='px-2 py-2 bg-green-600 rounded-full w-fit  hover:bg-green-300'>Add Password</button>
      </div>

      <div className="passwords">
        <h1>ALL PASSWORD</h1>
        {forms.length === 0 && <div> no password </div>}
        {forms.length != 0 && <table className='table-auto w-full  rounded-md overflow-hidden'>
          <thead className='bg-green-700 text-white '>
            <tr>
              <th className='py-2'>url</th>
              <th className='py-2'>username</th>
              <th className='py-2'>password</th>
              <th className='py-2'>Actions</th>


            </tr>

          </thead>
          {forms.map((items => {
            return <tr className='bg-green-100'>
              <td className='py-2  text-center border border-black w-32'><a href={items.site} target="_blank"><span>{items.site}</span></a>
                <span onClick={() => { copyclick(items.site) }} className='cursor-pointer'>
                  <lord-icon>
                    ©️
                  </lord-icon>
                </span>

              </td>
              <td onClick={() => { copyclick(items.username) }} className='py-2 text-center border border-black w-32'>{items.username} <span onClick={() => { copyclick(items.site) }} className='cursor-pointer'>
                <lord-icon>
                  ©️
                </lord-icon>
              </span></td>
              <td onClick={() => { copyclick(items.password) }} className='py-2 text-center border border-black w-32'>{"*".repeat(items.password.length)}  <span onClick={() => { copyclick(items.site) }} className='cursor-pointer'>
                <lord-icon>
                  ©️
                </lord-icon>
              </span></td>

              <td className='py-2 text-center border border-black w-32'>
                <span className='mx-4 cursor-pointer ' onClick={() => { deletepass(items.id) }}>🚮</span>
                <span className='mx-4 cursor-pointer ' onClick={() => { editpass(items.id) }} >✍️</span>

              </td>
            </tr>
          }))}
        </table>}

      </div>

    </div>

  )
}

export default Manager