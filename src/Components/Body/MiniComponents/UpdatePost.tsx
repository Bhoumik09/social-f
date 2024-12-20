import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { backend } from '../../../App';
import Cookies from 'js-cookie';
import { Posts } from '../Posts/PostComp';
const UpdatePost = ({ closeModal,userId, username,  updatePost, postInfo }: { updatePost: (post:Posts) => void, closeModal: () => void, userId?: string, username?: string, postInfo: Posts, addNewPost: (post: Posts) => void },) => {
    const [imageUrl, setImageUrl] = useState<string | undefined>(postInfo.image);
    let desc = useRef<HTMLTextAreaElement | null>(null);
    useEffect(() => {
        if (desc.current) {
            desc.current.value = postInfo.description;
        }
    }, [])
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files?.[0]
        if (file && file.size > 1024 * 1024) { // Limit file size to 5MB
            alert('File size exceeds the 5MB limit!');
            return;
        } // TypeScript ensures this is a File or undefined
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result as string); // Casting the result to string since FileReader result is string
            };
            reader.readAsDataURL(file); // Read the image as a data URL
        }
    };

    const onUpdateHandler = async () => {
        let description = desc.current?.value;
        let token = Cookies.get('token');
        try {
             let response=await axios.put(`${backend}/post/${postInfo._id}`,
                {
                    userId,
                    username,
                    description,
                    image: imageUrl
                },

                {
                    
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Replace `token` with your actual token variable
                    },
                }


            );
            console.log(response.data.post)
            updatePost(response.data.post);
            

            
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <div className="fixed  inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className=" bg-gradient-to-br from-white via-gray-500 to-white  flex flex-col p-5 rounded-lg w-[100%] max-w-[900px] h-[90%]">
                <div className="self-end">
                    <button className="" onClick={closeModal}>x</button>
                </div>
                <div className='grid md:grid-cols-[1.5fr,1fr] w-full h-[90%] overflow-y-scroll gap-3 '>
                    <div className=' flex flex-col-reverse h-[100%] w-full  justify-center items-center'>
                        
                           {imageUrl && <div className="w-full h-full flex items-center justify-center overflow-y-hidden rounded-lg ">
                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    className=" h-full max-w-full max-h-full rounded-lg" // Ensure image fills container but doesn't overflow
                                />
                            </div>}
                        

                            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
                        
                    </div>

                    <div className='flex flex-col h-[100%]'>
                        <h3 className="p-2 font-bold text-xl ">Write the description</h3>
                        <textarea ref={desc} className="h-full bg-orange-1 border rounded-2xl p-2 text-lg  " placeholder="Write your views...">
                        </textarea>

                    </div>

                </div>
                
                
                    <button
                        onClick={onUpdateHandler}
                        className="mt-4 px-4 py-2 flex justify-center  w-full  bg-orange-500 text-white rounded-lg"
                    >
                        Update
                    </button>
                

            </div>
        </div>
    )
}


export default UpdatePost
