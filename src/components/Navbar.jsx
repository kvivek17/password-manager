import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-900 text-white '>
              
            <div className="md:mycontainer text-white flex justify-around items-center px-4 py-2 h-14 ">


                <div className="log font-bold text-white ">
              <span className='text-green-600'>&lt;</span>
                PASS
             <span className='text-green-600'> OP/</span>
                <span className='text-green-600'>&gt;</span>
                </div>
                <ul >
                    <li className=' flex gap-4'>

                        <a href='/'>home</a>
                        <a href='#'>contact</a>
                        <a href='#'>about</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar