import React, {useState} from 'react'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import CreatePost from './components/CreatePost'
import UpdatePost from './components/UpdatePost'
import SearchForm from './components/SearchForm'
import { useSearch } from './context/SearchProvider'

const App = () => {
  const [closeNav, setCloseNave] = useState(false)
  const toggleNav = () => {
     setCloseNave(!closeNav);
  }
  const getNavWidth = () => (
      closeNav ? 'w-16' : 'w-56'
  )

  return (
    <div className="flex">
        {/* 네비게이션 */}
        <div 
           className={getNavWidth() +"min-h-screen transition-width border border-r"}>
           <div className="sticky top-0 ">
               <Navbar closed={closeNav} />
           </div>     
        </div>
        {/* 내용역역 */}
        <div className="flex-1 min-h-screen bg-slate-100">
          <div className="sticky top-0">
          <div className="flex item-center p-2">
            <button onClick={toggleNav}>
               {closeNav ? <AiOutlineMenuUnfold size={25} /> : <AiOutlineMenuFold size={25} /> }
            </button>
            <SearchForm />
          </div>
          </div>
            <div className="max-w-screen-lg mx-auto">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/create-post' element={<CreatePost />} />
                    <Route path='/update-post/:slug' element={<UpdatePost />} />
                </Routes>

            </div>
        </div>
    </div>
  )
}

export default App