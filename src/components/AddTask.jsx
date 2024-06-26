import { useState } from "react"



const AddTask = ({taskList,setTaskList}) => {
    const [addModal,setAddModal] = useState(false)
    const [projectName,setProjectName] = useState("")
    const [taskDescription,setTaskDescription] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    
    const handleInput = e =>{
       const {name,value} = e.target  
       
       if(name === 'projectName') {
        setProjectName(value)
       setErrorMessage("")
    }
       if(name === 'projectName' && value === ''){
        setErrorMessage("Enter project name to continue")
       }
       if(name === 'taskDescription') setTaskDescription(value)
    } 

    const handleAdd = e =>{
        e.preventDefault()
        if(!projectName){
            setErrorMessage("Enter project name to continue")
        }
        else{
            let timestamp = new Date().getTime()
            let tempList = taskList
            tempList.push({
                projectName,
                taskDescription,
                timestamp:timestamp,
                duration:0
            })
            localStorage.setItem("taskList",JSON.stringify(tempList))
            window.location.reload()
        setTaskList(
            [...taskList,{projectName,taskDescription,timestamp:timestamp}]
        )
        setAddModal(false)
        setProjectName("")
        setTaskDescription("")
    }
    }
  return (
    <>
    <button className="bg-blue-500 text-white uppercase text-sm
     font-semibold py-1 mx-1.5 pl-2 pr-2.5 rounded hover:opacity:70"
     type="button"
     onClick={(() => setAddModal(true))}>
        +New
        </button>
        {addModal?(
            

            <>
            <div className=" flex items-center justify-center overflow-x-hidden 
            overflow-y-auto fixed inset-0 z-100">
                <div className=" w-9/12 bg-white  rounded-lg shadow-md relative 
                flex flex-col ">

                <div className=" flex flex-row justify-between p-5 border-b
                 border-slate-200 rounded-t ">

                <h3 className=" text-3xl font-semibold">Add New Task</h3>

                <button className="px-1 text-gray-400float-right
                 text-3xl leading-none font-semibold block"
                 onClick={()=> setAddModal(false)}>x</button>
            </div>
            <form   className="p-6">
                <div>

                <label htmlFor="project-name" className="track-wide
                uppercase text-gray-700 text-xs font-semibold mb-2">Project Name</label>
                <input id="project-name"
                className="w-full bg-gray-200 text-gray-700 border border-gray-200
                rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
                 type="text" 
                 name="projectName"
                 placeholder="project name"
                 value={projectName}
                 onChange={handleInput}
                 required/>
                 <p className="text-red-500 text-center mt-2 mb-5">{errorMessage}</p>
                </div>
                <div>
                    <label htmlFor="task-description"
                    className="track-wide
                    uppercase text-gray-700 text-xs font-semibold mb-2">Task Description</label>
                    <textarea 
                      className="w-full bg-gray-200 text-gray-700 border border-gray-200
                      rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
                    id="task-description"
                    rows={5}
                    placeholder="enter task description"
                    name="taskDescription"
                    value={taskDescription}
                    onChange={handleInput}

                    />
                </div>
                <div className="flex justify-end p-6 border-t border-slate-200 rounded-b ">
                    <button className="bg-blue-500 text-white font-semibold rounded-lg
                   uppercase text-sm  px-6 py-3 hover:opacity-70 " onClick={handleAdd}>
                        Add Task
                        </button>
                </div>
            </form>
                </div>
                </div>
            
            </>

        ):(

         
            <>
            
            
            </>

        )}
    </>
  )
}

export default AddTask