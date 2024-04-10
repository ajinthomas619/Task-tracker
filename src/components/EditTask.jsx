import { useState,useEffect } from "react"


const EditTask = ({task,indedx,taskList,setTaskList}) =>{
    const [editModal,setEditModal] =useState(false)
    const [projectName,setProjectName] = useState("")
    const [taskDescription,setTaskDescription] = useState("")

    useEffect(() => {
        setProjectName(task.projectName)
        setTaskDescription(task.taskDescription)
    },[])
    
    const handleInput = e =>{
       const {name,value} = e.target  
       
       if(name === 'projectName') setProjectName(value)
       if(name === 'taskDescription') setTaskDescription(value)
    } 

    const handleUpdate = e =>{
        e.preventDefault()
        let taskIndex = taskList.indexOf(task)
        taskList.splice(taskIndex,1,{
            projectName: projectName,
            taskDescription:taskDescription,
            timestamp:task.timestamp,
            duration:task.duration
        })
     localStorage.setItem("taskList",JSON.stringify(taskList))
     window.location.reload()
        setEditModal(false)
       
    }
    return(
        <>
        <button className="bg-gray-400 text-white
         text-sm font-semibold py-1.5 px-3 rounded-lg"
         onClick={()=> setEditModal(true)}>Edit</button>
         {editModal ? (
            <>
             <div className=" flex items-center justify-center overflow-x-hidden 
            overflow-y-auto fixed inset-0 z-100">
                <div className=" w-9/12 bg-white  rounded-lg shadow-md relative 
                flex flex-col ">

                <div className=" flex flex-row justify-between p-5 border-b
                 border-slate-200 rounded-t ">

                <h3 className=" text-3xl font-semibold">Edit Task</h3>

                <button className="px-1 text-gray-400float-right
                 text-3xl leading-none font-semibold block"
                 onClick={()=> setEditModal(false)}>x</button>
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
                   uppercase text-sm  px-6 py-3 hover:opacity-70 " onClick={handleUpdate}>
                        Update Task
                        </button>
                </div>
            </form>
                </div>
                </div>
            </>
         ):null}
        </>
    )
}
export default EditTask