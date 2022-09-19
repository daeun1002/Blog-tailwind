import React from 'react'
import Markdown from 'markdown-to-jsx';

const DeviceView = ({onClose, thumbnail, title, content}) => {
  return (
    <div 
      className="bg-gray-500 bg-opacity-50 fixed inset-0 backdrop-blur-sm flex justify-center items-center"
      onClick={onClose}>
      <div className="bg-white w-mobile-width h-mobile-heigh1 overflow-auto">
        <img src={thumbnail} className="aspect-video" alt="" />
        <div className="px-2">
          <h1 className="font-semibold text-gray-700 py-2 text-xl">{title}</h1>
          <Markdown>{content}</Markdown>
        </div>
      </div>    
    </div>
  )
}

export default DeviceView