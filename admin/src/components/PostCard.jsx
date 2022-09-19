import React from 'react'
import dateFormat from 'dateformat'
import { BsPencilSquare, BsTrash } from 'react-icons/bs'
import { Link } from 'react-router-dom'
const PostCard = ({ post, onDeleteClick }) => {
  
  if(!post) return null;  
  const { title, meta, tags, thumbnail, slug, createdAt } = post;  
  return (
    <div className="bg-white shadow-sm rounded flex flex-col">
       {thumbnail ?
          (<img className="aspect-video object-cover" src={"uploads/"+thumbnail} alt={title} />):
          (<img className="aspect-video" src="images/blank.png" />)
       } 
      <div className="p-2 flex-1 flex flex-col justify-between"> 
          <h1 className="text-lg font-semibold text-gray-700">
            {title.length > 20 ? (title.substring(0, 20)+'...'): title}
          </h1>
          <p className="text-gray-500">{meta.substring(0, 65) + '...'}</p>
          <div className="flex justify-between">
             <p className="text-gray-500 text-sm">{dateFormat(createdAt, "isoDate")}</p>
             <p className="text-gray-500 text-sm">{ tags.join(", ")}</p>
          </div>

          <div className="flex space-x-3">
             <Link to={`/update-post/${slug}`} className="w-8 h-8 rounded-full bg-blue-400 hover:bg-blue-600
                              flex justify-center items-center text-white">
                <BsPencilSquare />
             </Link>
             <button onClick={onDeleteClick} className="w-8 h-8 rounded-full bg-red-400 hover:bg-red-600
                              flex justify-center items-center text-white">
                <BsTrash /> 
             </button>
          </div>

      </div>
    </div>
  )
}

export default PostCard