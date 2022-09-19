import React, { useState, useEffect } from 'react'
import { ImSpinner11, ImSpinner3, ImEye, ImFilePicture, ImFileEmpty } from 'react-icons/im'
import { useValidation } from '../context/ValidationProvider';
import DeviceView from './DeviceView';
import { MarkdownHint } from './MarkdownHint';

export const defaultPost = {
   title : '',
   thumbnail : '',
   featured : false,
   content : '',
   tags : '',
   meta : '' 
}

const PostForm = ({
   onSubmit, 
   busy, 
   initialPost, 
   PostBtnTitle, 
   resetAfterSubmit
   }) => {

   const [postInfo, setPostInfo] = useState({...defaultPost});
   const [selectedThumbUrl, setSelectedThumbUrl] = useState('');
   const [imageURLCopy, setImageURLCopy] = useState('');
   const [displayMarkdownHint, setDisplayMarkdownHint] = useState(false);
   const [visible, setVisible] = useState(false);

   const { updateValidation } = useValidation();

   useEffect(()=>{
      if(initialPost.thumbnail){
         setSelectedThumbUrl('/uploads/' + initialPost.thumbnail.filename);
      }
      setPostInfo({...initialPost});
      return () => {
         if(resetAfterSubmit) resetForm();
      }
   }, [initialPost, resetAfterSubmit])

   const imageCopy = () => {
      const rulesTextCopy = `![이미지설명입력](${imageURLCopy})`;
      navigator.clipboard.writeText(rulesTextCopy);
   }

   const handleChange = ({ target }) => {
       const { value, name, checked } = target;
       if(name === 'thumbnail') {
           const file = target.files[0];
           if(!file.type?.includes('image')){
               return updateValidation('error', '이미지만 가능 합니다!');
           }
           setPostInfo({ ...postInfo, thumbnail: file });
           return setSelectedThumbUrl(URL.createObjectURL(file));
       }

       if(name==='featured') {   
         return setPostInfo({ ...postInfo, [name]: checked })
       } 
       if(name === 'meta' && meta.length > 100 ) {
           return setPostInfo({...postInfo, meta: value.substring(0, 100)});
       }  
       setPostInfo({ ...postInfo, [name]: value });
    
        console.dir(postInfo);
      }

      const handleSubmit = (e) => {
         e.preventDefault();
         const { title, content, meta, tags } = postInfo;

         if(!title.trim()) return updateValidation('error', '제목은 필수 입니다.');
         if(!content.trim()) return updateValidation('error', '내용은 필수 입니다.');
         if(!tags.trim()) return updateValidation('error', '태그항목은 필수 입니다.');
         if(!meta.trim()) return updateValidation('error', '간단한 설명을 작성해 주세요');

         const newTags = tags.split(',')
           .map((item)=> item.trim())
           .splice(0, 4);

         const slug = title
           .toLowerCase()  
           .replace(/[^ㄱ-ㅎ가-힣A-Za-z0-9 ]/g, " ")
           .split(' ')
           .filter((item)=>item.trim())
           .join('-');
       
         const formData = new FormData();
         const finalPost = { ...postInfo, tags: JSON.stringify(newTags), slug };
            for( let key in finalPost ) {
               formData.append(key, finalPost[key]);
            }
           onSubmit(formData);
           if(resetAfterSubmit) resetForm();
        }

   const resetForm = () => {
      setPostInfo({...defaultPost});
      localStorage.removeItem('blogPost');
   }

  const { title, content, featured, tags, meta } = postInfo;

  return (
  <>
    <form onSubmit={ handleSubmit } className="p-2 flex">
       <div className="w-9/12 space-y-3 h-screen flex flex-col">
        <div className="flex items-center justify-between">
           <h1 className="text-xl font-semibold text-gray-700">
              Create New Post
           </h1>

           <div className="flex items-center space-x-5">
               <button className="flex items-center 
                                  space-x-2 px-3 ring-1 
                                  ring-blue-500 rounded h-10
                                  hover:text-white hover:bg-blue-500">
                  <ImSpinner11 />
                  <span>Reset</span>
               </button>
               <button className="flex items-center space-x-2 px-3 ring-1 
                                ring-blue-500 rounded h-10
                                hover:text-white hover:bg-blue-500"
                       onClick={() => setVisible(true)}>
                  <ImEye />
                  <span>View</span>
               </button>
               <button className="h-10 w-36 px-5 hover:ring-1 bg-blue-500 rounded 
                               text-white hover:text-blue-500 
                               hover:bg-transparent ring-blue-500 transition">
                  {busy ? <ImSpinner3 className="animate-spin mx-auto text-xl" /> : PostBtnTitle }
               </button>
           </div>
        </div>

        {/** featured check box */}
        <div className="flex">
           <input type="checkbox" onChange={handleChange} name="featured" id="featured" hidden />
           <label htmlFor="featured" 
                  className="flex items-center 
                             space-x-2 text-gray-700 
                             cursor-pointer group">
               <div className="w-4 h-4 rounded-full border-2 
                               border-gray-700 flex items-center justify-center
                               group-hover:border-blue-500">
                  { featured && <div className="w-2 h-2 rounded-full bg-gray-700 group-hover:bg-blue-500" /> }
               </div>
               <span className="group-hover:text-blue-500">Featured</span>
           </label>
        </div>

        {/** title input */}
        <input 
           type="text" 
           name="title" 
           onChange={handleChange} 
           onFocus={()=> setDisplayMarkdownHint(false)}
           className="text-xl outline-none focus:ring-1 
                                      rounded p-2 w-full font-semibold" 
               placeholder="Post title"
           value={ title }    
         />
         {/** image link copy */}
         <div className="flex space-x-2">
           <div className="flex items-center space-x-2 px-3 ring-1 
                      ring-blue-500 rounded h-10 text-blue-500">
             <ImFilePicture /><span>Place Image</span>
           </div>    
           <div className="flex flex-1 justify-between bg-gray-400 
                           rounded overflow-hidden">
              <input type="text" value={imageURLCopy}
                     onChange={(e)=>setImageURLCopy(e.target.value)}
                     className="bg-transparent px-2 text-white w-full" />
              <button className="text-xs flex flex-col items-center
                                 justify-center p-2 self-stretch bg-gray-700
                                 text-white"
                      onClick={ imageCopy }           
              >
                 <ImFileEmpty />
                 <span>copy</span> 
              </button> 
           </div>      
         </div>


         <textarea className="resize-none outline-none fouce:ring-1 
                              rounded p-2 w-full flex-1 font-mono
                              tracking-wide text-lg"
                   placeholder="## Markdown" 
                   name="content" 
                   onChange={handleChange}
                   onFocus={ ()=> setDisplayMarkdownHint(true) }
                   value={content}
         />

         {/** tags input */}
         <div>
            <label htmlFor="tags">Tags</label>
            <input type="text" 
                   id="tags"
                   name="tags"
                   value={tags}
                   onChange={handleChange}
                   className="outline-none focus:ring-1 
                              rounded p-2 w-full" 
               placeholder="Tag one, Tag two ..."/>
         </div>    

         {/** meta input */}
         <div>
            <label htmlFor="meta">짧은 설명</label>
            <textarea 
                id="meta"
                name="meta"
                value={meta}
                onChange={handleChange}
                className="resize-none outline-none fouce:ring-1 
                           rounded p-2 w-full h-28"
                placeholder="## Markdown">{meta}</textarea>
         </div>    
       </div>     

       <div className="w-1/4 px-2">
           <h1 className="text-xl font-semibold text-gray-700 mb-2">
              이미지
           </h1>

           {/** thumbnail */}
           <div>
              <input type="file" 
                     name="thumbnail" 
                     id="thumbnail" 
                     onChange={handleChange}
                     hidden />
              <label htmlFor="thumbnail" className="cursor-pointer">
               { selectedThumbUrl ? 
                  (<img src={selectedThumbUrl} className="aspect-video shadow-sm" 
                                    alt="thumbnail-image" />)
                 :(<div className="border border-dashed 
                                border-gray-500 aspect-video
                                flex flex-col justify-center items-center">
                       <span>이미지 선택</span>   
                       <span className="text-xs">권장 사이즈</span>  
                       <span className="text-xs">1280 * 720</span>         
                  </div>)
               }   
              </label>
           </div>
 
           {/** Markdown */} 
           <div className="absolute top-1/2 -translate-y-1/2">
               { displayMarkdownHint && <MarkdownHint /> }
           </div>  
       </div>
    </form>
    {visible && <DeviceView 
                  title={title} 
                  content={content} 
                  thumbnail={selectedThumbUrl} 
                  onClose={() => setVisible(false)} />}
  </>
  )
}

export default PostForm