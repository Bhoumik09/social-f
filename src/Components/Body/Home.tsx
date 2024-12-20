import { PostUser } from "../../App"
import Navbar from "../Header/Navbar"
import PeopleComp from "./People/PeopleComp"
import PostComp from "./Posts/PostComp"

function Home({ user }: { user:PostUser }) {
    return (
        <div>
            <Navbar user={user} />
            <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] h-full ">
                <div className="h-full max-w-full">
                    <PostComp user={user} />
                </div>
                <div className="  hidden md:block">
                    <PeopleComp />
                </div>
            </div>
        </div>
    )
}

export default Home
