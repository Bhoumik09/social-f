import People from './People'

const PeopleComp = () => {
    return (
        <div className='mt-10 top-10 sticky border max-w-[450px] p-3 bg-opacity-70  bg-white rounded-xl ba'>
            <h3 className='font-bold  text-2xl  bg-orange-400 rounded-t-lg p-2'>Suggested People </h3>
            <div className='flex flex-col mt-5 gap-2 overflow-y-scroll h-[400px] '>
                <People/>
                <People/>
                <People/>
                <People/>
                <People/> 
                <People/>
                
            </div>
        </div>
    )
}

export default PeopleComp
