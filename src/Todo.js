import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";

function Todo() {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    //handle form values
    const [allTodos, setAllToDos] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newPriority, setNewPriority] = useState("");

    //add button function
    const handleAddToDo = ()=>{
        let newTodoItem = {
            title:newTitle,
            describe:newDescription,
            priority:newPriority
        }

        let updatedTodoArr = [...allTodos];
        updatedTodoArr.push(newTodoItem);
        setAllToDos(updatedTodoArr);

        //store to local storage
        localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))
    }

    const handleDeleteTodo = (index)=>{
        let reducedTodo = [...allTodos];
        reducedTodo.splice(index, 1);

        localStorage.setItem('todolist', JSON.stringify(reducedTodo));
        setAllToDos(reducedTodo)
    }

     useEffect(()=>{
        try {
            let savedTodo = JSON.parse(localStorage.getItem('todolist'));
            if (savedTodo && Array.isArray(savedTodo)) {
                setAllToDos(savedTodo);
            }
        } catch (error) {
            console.error("Error parsing local storage item:", error);
        }
    }, []);

    return (
        <div className='App'>
            <h1>My Todos</h1>
            <div className='todo-wrapper'>
                <div className='todo-input'>
                    <div className='todo-input-item'>
                        <label>Title</label>
                        <input type='text' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="What's the task title?" />
                    </div>
                    
                    <div className='todo-input-item'>
                        <label>Description</label>
                        <input type='text' value={newDescription} onChange={(e)=>setNewDescription(e.target.value)}  placeholder="What's the task description?" />
                    </div>
                    
                    <div className='todo-input-item'>
                        <label>Priority</label>
                        <select className='priority' value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
                            <option value="" disabled>Select priority</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    
                    <div className='todo-input-item'>
                        <button type='button' className='primaryBtn' onClick={handleAddToDo}>Add</button>
                    </div>
                    
                </div>

                <div className='btn-area'>
                    <button className={`secondaryBtn ${isCompleteScreen === false ? 'active' : ''}`} onClick={() => setIsCompleteScreen(false)}>To do</button>
                    {/* <button className='secondaryBtn'>Priority</button> */}
                    <button className={`secondaryBtn ${isCompleteScreen === true ? 'active' : ''}`} onClick={() => setIsCompleteScreen(true)}>Completed</button>
                </div>

                <div className='todo-list'>
                   
                {allTodos.map((item, index) => {
                        const priorityColor = item.priority === "high" ? "red" : item.priority === "medium" ? "yellow" : "green"; 
                        return (
                        <div className='todo-list-item' key={index}>
                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.describe}</p>
                                </div>
                                <div className='icon'>
                                    <FaCircle className='priority-icon' style={{ color: priorityColor }} />
                                    <BiEditAlt className='edit-icon' onClick={''} title="Edit?" />
                                    <AiOutlineDelete className='delete-icon' onClick={()=>handleDeleteTodo(index)} title="Delete?" />
                                    <FaCheck className='check-icon' title="Complete?" />
                                </div>
                            </div>
                        )
                   })}

                </div>
            </div>
        </div>
    )
}

export default Todo
