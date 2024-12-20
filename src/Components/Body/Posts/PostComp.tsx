import { useEffect, useState } from "react"
import Post from "./Post"
import axios from "axios"
import { backend, PostUser } from "../../../App"
import Cookies from "js-cookie"
import NewPostComp from "../MiniComponents/NewPostComp"

export interface Comments{
    createdAt: Date
    likesCount: number
    username: string
    text:string
    _id:string
}
export interface Posts {
    createdAt: Date
    description: string
    image: string
    likesCount: number
    username: string
    _id: string
    comments:Comments[]
}
function PostComp({ user }: { user: PostUser }) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Function to open the modal
    const openModal = () => setIsModalOpen(true);

    // Function to close the modal
    const closeModal = () => setIsModalOpen(false);

    let token = Cookies.get('token');

    let [posts, setPostsArr] = useState<Array<Posts>>([]);

    let search=null;
    const addNewPost = (post: Posts) => {
        user.yourPosts=[...user.yourPosts,post._id];
        setPostsArr((prev) => [...prev, post]);
    }
    const deletePost = (post:Posts)=>{
        user.yourPosts=user.yourPosts.filter((p)=>p!==post._id);
        setPostsArr((prev)=>prev.filter((p)=>p._id!==post._id));
    }
    let getPosts = async () => {
        let response=await axios.get(`${backend}/post?search=${search}`, {
            params: {
                userId: user?._id
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Add the token to the Authorization header
            },
        });
        console.log(response.data.data)
        setPostsArr(response.data.data)
       

    }
    useEffect(() => {
        getPosts();
    }, [])
    return (
        <>
            <div className="flex w-full flex-col mx-1  p-3 gap-10 " onClick={() => {

            }}>
                <div className="flex  ">
                    <button className="bg-orange-400 px-4 text-lg my-2 py-2 rounded-lg font-bold focus:scale-95 transition-all active:scale-90 active:bg-gray-200" onClick={openModal}>
                        Create
                    </button>

                </div>
                {posts?.map((post) => {
                    const belongsToUser = user.yourPosts.some((p)=>p==post._id)
                    const likedByUser = user.likedPosts.some((p)=>p==post._id)
                    
                        return <Post key={post._id} postInformation={post} userId={user?._id} belongsToUser={belongsToUser} likedByUser={likedByUser} deletePost={deletePost}/>;
                    

                    
                })}


            </div>
            {isModalOpen && <NewPostComp closeModal={closeModal} userId={user?._id} username={user?.username} addNewPost={addNewPost} updatePost={()=>{}} action="new"/>}

        </>
    )
}

export default PostComp
