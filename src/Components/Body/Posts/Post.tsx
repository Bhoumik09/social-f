import { useRef, useState } from 'react';
import { Comments, Posts } from './PostComp';
import PostHeader from '../MiniComponents/PostHeader';
import axios from 'axios';
import { backend } from '../../../App';
import Cookies from 'js-cookie';
import UpdatePost from '../MiniComponents/UpdatePost';
function Post({ postInformation, userId, belongsToUser, likedByUser, deletePost }: { postInformation: Posts, userId?: string, belongsToUser: boolean, likedByUser: boolean, deletePost: (post: Posts) => void }) {
    const [postInfo, changePostInfo]=useState<Posts>(postInformation)
    const [liked, setLikedStatus] = useState<boolean>(likedByUser);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const commentRef = useRef<HTMLInputElement>(null);
    const token = Cookies.get('token');
    const [likes, setLikedCount] = useState<number>(postInfo.likesCount)
    const [commentsArr, setCommentArr] = useState<Comments[]>(postInfo.comments);
    // Function to open the modal
    const closeUpdateModal = () => {
        setIsUpdateModalOpen((prev) => !prev);
    }
    const handleCommentPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let comment = commentRef.current?.value;

        let response = await axios.post(`${backend}/comment`, {
            postId: postInfo._id,
            username: postInfo.username,
            text: comment
        }, {
            params: {
                userId
            },
            headers: {
                Authorization: `Bearer ${token} `
            }

        })
        setCommentArr((prev) => [...prev, response.data.newComment])
        if (commentRef.current) {
            commentRef.current.value = "";
        }

    }
    const likePost = async () => {
        try {
            // Send the POST request to like the post
            await axios.put(`${backend}/post/${postInfo._id}/like`, null, {
                params: {
                    userId
                },
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token for authorization
                }
            });
            setLikedCount((prev) => prev + 1);
            console.log('Post liked successfully');
        } catch (error) {
            // Catch any error and log or display the error message
            alert('Error while liking the post');
        }
    }

    const dislikePost = async () => {
        try {
            // Send the POST request to dislike the post
            await axios.put(`${backend}/post/${postInfo._id}/dislike`, null, {
                params: {
                    userId
                },
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token for authorization
                }
            });
            setLikedCount((prev) => prev - 1);
            console.log('Post disliked successfully');
        } catch (error) {
            // Catch any error and log or display the error message
            alert('Error while disliking the post');

        }
    }

    const openModal = () => setIsModalOpen(true);

    // Function to close the modal
    const closeModal = () => setIsModalOpen(false);

    // Handle Delete action
    const handleDelete = async () => {
        // Logic for deleting the post
        try {
            await axios.delete(`${backend}/post/${postInfo._id}`, {
                params: {
                    userId
                },
                headers: { Authorization: `Bearer ${token}` },
            },);
            deletePost(postInfo);
        } catch (e) {
            console.log(e);
        }
        setIsDeleteModalOpen(false); // Close the delete modal
    };

    // Handle Update action
    const handleUpdate = (post:Posts) => {
        changePostInfo(post);
        setIsUpdateModalOpen(false); // Close the update modal
    };

    return (
        <>
            <div className="border p-3 max-w-xl h-full  flex flex-col self-center  bg-gradient-to-tl from-orange-200 to-orange-400 rounded-lg ">
                {/* Header */}
                <div className='flex justify-between'>
                    <PostHeader username={postInfo.username} userId={userId} />
                    {belongsToUser &&
                        <select
                            className="my-2 p-1  bg-gray-100 rounded-md text-sm"
                            onChange={(e) => {
                                const action = e.target.value;
                                if (action === "delete") {
                                    setIsDeleteModalOpen(true);
                                    e.target.value = ''
                                } else if (action === "update") {
                                    setIsUpdateModalOpen(true);
                                }
                            }}
                        >
                            <option value="" >Select Action</option>
                            <option value="update">Update</option>
                            <option value="delete">Delete</option>
                        </select>
                    }
                </div>

                {/* Image Section */}
                <div className="w-full md:max-h-[300px] xl:max-h-[400px] overflow-hidden rounded-lg ">
                    <img
                        src={postInfo.image}
                        alt="postImage"
                        className="rounded-xl object-contain w-full h-full"
                    />
                </div>





                {/* Action Buttons */}
                <div className="my-2 flex gap-4  duration-300 items-center">
                    {!liked ?
                        <i className="fa-regular fa-heart fa-2x" onClick={() => {
                            setLikedStatus(true);
                            likePost();
                        }}></i>
                        : <i className="fa-solid fa-heart fa-2x  " onClick={() => {
                            setLikedStatus(false);
                            dislikePost();
                        }}></i>}
                    <i className="fa-regular fa-comment fa-2x cursor-pointer" onClick={openModal}></i>
                </div>

                {/* Likes and Description */}
                <div><span className='font-semibold'>Likes:</span>{likes}</div>
                <div className="text-ellipsis overflow-hidden line-clamp-2">
                    <span className='first-letter:uppercase inline-block font-semibold'>{postInfo.username} :</span>{postInfo.description}
                </div>
            </div>

            {/* Modal for Viewing the Post */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 h-full">
                    <div className="bg-white p-5 flex flex-col rounded-lg w-[100%] max-w-[900px] h-[90%] ">
                        <div className='grid md:grid-cols-[1.5fr,1fr] md:grid-rows-1 grid-rows-2 grid-cols-1 h-full'>
                            <div className='flex h-[90%]'>
                                <div className=" flex  items-center justify-center overflow-hidden rounded-lg ">
                                    <img
                                        src={postInfo.image}
                                        alt="Preview"
                                        className=" max-w-full h-full object-cover  rounded-lg " // Ensure image fills container but doesn't overflow
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col h-[90%] overflow-hidden'>
                                <div className="flex">
                                    <PostHeader username={postInfo.username} />
                                </div>
                                <div className=' flex-grow flex flex-col  overflow-y-scroll'>
                                    {commentsArr.map((comment: Comments) => (
                                        <div key={comment._id} className='p-2 border-b flex flex-col '>
                                            <span className='font-semibold'>{comment.username}</span>
                                            <p className='text-sm text-gray-600'>{comment.text}</p>
                                            <span className='text-xs text-gray-400'>{new Date(comment.createdAt).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className='px-2 items-center  flex flex-row-reverse justify-center gap-2 '>
                                    <div className="my-2 flex gap-4">
                                        {!liked ?
                                            <i className="fa-regular fa-heart fa-2x" onClick={() => {
                                                setLikedStatus(true);
                                                likePost();
                                            }}></i>
                                            : <i className="fa-solid fa-heart fa-2x  " onClick={() => {
                                                setLikedStatus(false);
                                                dislikePost();
                                            }}></i>}
                                    </div>
                                    <form className='flex  border-2  rounded-lg bg-orange-400 bg-opacity-80' onSubmit={handleCommentPost}>
                                        <input

                                            ref={commentRef}
                                            type="text"

                                            placeholder='Write the comment'
                                            className='outline-none w-[100%] p-2  '
                                        />
                                        <button className='font-semibold p-2'>
                                            Send
                                        </button>
                                    </form>

                                </div>
                            </div>
                            <button
                                onClick={closeModal}
                                className=" px-4 py-2 flex justify-center md:col-span-2 w-full bg-orange-500 text-white rounded-lg"
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {/* Modal for Update */}
            {isUpdateModalOpen && (
                <UpdatePost closeModal={closeUpdateModal} addNewPost={() => { }} postInfo={postInfo} updatePost={handleUpdate} />
            )}

            {/* Modal for Delete */}
            {isDeleteModalOpen && (

                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded-lg w-[100%] max-w-[600px]  flex flex-col items-center">
                        <h3 className="text-xl font-bold">Are you sure you want to delete this post?</h3>
                        <div className="flex gap-4 mt-4">
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white p-2 rounded-lg"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="bg-gray-500 text-white p-2 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Post;
