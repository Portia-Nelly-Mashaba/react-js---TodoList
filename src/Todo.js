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
    const [completedTodos, setCompletedTodos] = useState([]);
    const [currentEdit, setCurrentEdit] = useState("");
    const [currentEditedItem, setCurrentEditedItem] = useState({ title: "", describe: "" });

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
    };
     //delete function
    const handleDeleteTodo = (index)=>{
        let reducedTodo = [...allTodos];
        reducedTodo.splice(index, 1);

        localStorage.setItem('todolist', JSON.stringify(reducedTodo));
        setAllToDos(reducedTodo)
    };

    //check completed taks
    const handleComplete = (index)=>{
        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth();
        let yyyy = now.getFullYear();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':'+m+':' + s;

        let filterdItem = {
            ...allTodos[index],
            completedOn:completedOn
        }

        let updatedCompletedArr = [...completedTodos];
        updatedCompletedArr.push(filterdItem);
        setCompletedTodos(updatedCompletedArr);
        handleDeleteTodo(index);
        //store completed task to local storage
        localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr))
    };

    //delete completed task
    const handleDeleteCompletedTodo = (index)=>{
        let reducedTodo = [...completedTodos];
        reducedTodo.splice(index, 1);

        localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
        setCompletedTodos(reducedTodo)
    };

      // Edit function
      const handleEdit = (index, item) => {
        setCurrentEdit(index);
        setCurrentEditedItem({ title: item.title, describe: item.describe });
    };

    // Handle updates for title and description
    const handleUpdatedTitle = (value) => {
        setCurrentEditedItem(prev => ({ ...prev, title: value }));
    };

    const handleUpdatedDescription = (value) => {
        setCurrentEditedItem(prev => ({ ...prev, describe: value }));
    };

    const handleUpdatedPriority = (value) => {
        setCurrentEditedItem(prev => ({ ...prev, priority: value }));
    };

    // Save updated item
    const handleSaveEdit = () => {
        let updatedTodoArr = [...allTodos];
        updatedTodoArr[currentEdit] = currentEditedItem;
        setAllToDos(updatedTodoArr);
        localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
        setCurrentEdit(null); // Reset edit state
    };

    useEffect(() => {
        try {
            let savedTodo = JSON.parse(localStorage.getItem('todolist'));
            let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
            if (savedTodo && Array.isArray(savedTodo)) {
                setAllToDos(savedTodo);
            }
            if (savedCompletedTodo && Array.isArray(savedCompletedTodo)) {
                setCompletedTodos(savedCompletedTodo);
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
                   
                {isCompleteScreen===false && allTodos.map((item, index) => {
                        const priorityColor = item.priority === "high" ? "red" : item.priority === "medium" ? "yellow" : "green"; 
                        if (currentEdit === index) {
                            return (
                                <div className='edit_wrapper' key={index}>
                                    <input
                                        placeholder='Updated Title'
                                        onChange={(e) => handleUpdatedTitle(e.target.value)}
                                        value={currentEditedItem.title}
                                    />
                                    <textarea
                                        placeholder='Updated Description'
                                        onChange={(e) => handleUpdatedDescription(e.target.value)}
                                        value={currentEditedItem.describe}
                                    />
                                    <select
                                        className='priority'
                                        value={currentEditedItem.priority}
                                        onChange={(e) => handleUpdatedPriority(e.target.value)}
                                    >
                                        <option value="" disabled>Select priority</option>
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
                                    </select>
                                    <button className='primaryBtn' onClick={handleSaveEdit}>Save</button>
                                </div>
                            );
                        }
                        return (
                        <div className='todo-list-item' key={index}>
                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.describe}</p>
                                </div>
                                <div className='icon'>
                                    <FaCircle className='priority-icon' style={{ color: priorityColor }} />
                                    <BiEditAlt className='edit-icon' onClick={() => handleEdit(index, item)} title="Edit?" />
                                    <AiOutlineDelete className='delete-icon' onClick={()=>handleDeleteTodo(index)} title="Delete?" />
                                    <FaCheck className='check-icon' onClick={()=>handleComplete(index)} title="Complete?" />
                                </div>
                            </div>
                        )
                   })}

                {isCompleteScreen===true && completedTodos.map((item, index) => {
                        const priorityColor = item.priority === "high" ? "red" : item.priority === "medium" ? "yellow" : "green"; 
                        return (
                        <div className='todo-list-item' key={index}>
                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.describe}</p>
                                <p><small>Completd on: {item.completedOn}</small></p>
                                </div>
                                <div className='icon'>
                                    <FaCircle className='priority-icon' style={{ color: priorityColor }} />
                                    <AiOutlineDelete className='delete-icon' onClick={()=>handleDeleteCompletedTodo(index)} title="Delete?" />
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
