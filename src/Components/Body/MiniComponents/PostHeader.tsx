
import userImg from '../../../assets/user.jpeg'

const PostHeader = ({username}:{username:string, userId?:string}) => {
  return (
    
       <div className="flex items-center">
          <div className="w-8 h-8 border m-2 rounded-full">
            <img src={userImg} alt="" className="w-full h-full rounded-full" />
          </div>
          <div className="flex-grow first-letter:uppercase font-bold">{username}</div>
        </div>
    
  )
}

export default PostHeader
