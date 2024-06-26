import AddTask from "./components/AddTask";
import { useState,useEffect } from "react";
import { useDrop } from 'react-dnd';
import ToDo from "./components/ToDo";

function App() {
  const [taskList,setTaskList] = useState([])
  const [completed,setCompleted] = useState([])
useEffect(() => {
  let array = localStorage.getItem("taskList")
  if(array){
    setTaskList(JSON.parse(array))
  }
},[])

const [{isOver},drop] = useDrop(() => ({
  accept: "todo",
  drop:(item) => addToCompleted(item.id,item.projectName,item.taskDescription,item.timestamp,item.duration),
  collect:(monitor) => ({
    isOver: !!monitor.isOver(),
  })
}))

const addToCompleted = (id,projectName,taskDescription,timestamp,duration) => {
const moveTask = taskList.filter((task) => id === task.id)
setCompleted((completed) => [...completed,{moveTask,projectName,taskDescription,timestamp,duration}])
}
  return (
<>
  <h1 className="text-2xl font-bold py-2 pl-6"> The Task Tracker </h1>
  <p className="text-xl pl-6">Hi there!</p>
<div className="flex flex-row items-center">

  <p className="text-xl pl-6">Click</p>
  <AddTask taskList={taskList} setTaskList={setTaskList}/>
  <p className="text-xl my-2">to add a new task</p>

</div>
<div className="flex flex-row">
<div className="w-full">
  <h2 className="ml-6 text-xl w-3/4 my-4 py-2 px-4 font-semibold bg-gray-300">ToDo</h2>

{taskList.slice(0).reverse().map((task,i) => 
  <>
  <ToDo key={task.timestamp} task={task} index={i} taskList={taskList} setTaskList={setTaskList}/>
  </>
    
)}
</div>
<div className="w-full" ref={drop}>
<h2 className="ml-6 text-xl w-3/4 my-4 py-2 px-4 font-semibold bg-gray-300">Completed</h2>

{completed.slice(0).reverse().map((task,i) => 
  <>
  <ToDo key={task.timestamp} task={task} index={i} taskList={taskList} setTaskList={setTaskList}/>
  </>
    
)}

</div>
</div>
</>
  );
}

export default App;
