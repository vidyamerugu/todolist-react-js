import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons';

import './App.css';

function App() {

  // initiate Todolist state

  const [toDo, setToDo] = useState([]);

  //initiate Tempo state of addTodo and updateTodo

  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  //Addtask function

  const addTask = () => {
    if(newTask) {
      let num = toDo.length + 1; //id will add new uniqe id every time we created a task
      let newEntry = {id: num, title:newTask, status: false};
      setToDo([...toDo, newEntry]);
      setNewTask('');

    }

  }

  //DeleteTask function

  const deleteTask = (id) => {
    let newTasks = toDo.filter((task)=> task.id !== id)
    setToDo(newTasks)

  }

  //markDoneTask function

  const markDone = (id) => {
    const newTasks = toDo.map((task)=>{
      if(task.id === id) {
        return ({...task, status: !task.status})
      }
      return task
    });
    setToDo(newTasks)

  }

  //cancelUpdateTask function

  const cancelUpdate = () => {
    setUpdateData('');

  }

  //changeTask Function

  const changeTask =(e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry)

  }

  //updateTask Function 

  const updateTask = () => {
    let filterRecords = [...toDo].filter(task=>task.id !== updateData.id)
    let updatedObject = [...filterRecords, updateData]
    setToDo(updatedObject)
    setUpdateData('')

  }


  return (
    //using bootstrap class name Container
    <div className="container App"> 

      <br></br>

      <h2 className="heading">Todos List</h2>

      <br></br>

      {updateData && updateData ? (
        <>
        <div className="row">
          <div className="col">
            <input value={updateData && updateData.title} 
            onChange={(e) => changeTask(e)} 
            className="form-control form-control-lg" />
            
          </div>
          <div className="col-auto">
            <button className="btn btn-lg btn-success mr-20" onClick={updateTask}>Update</button>
            <button className="btn btn-lg btn-warning" onClick={cancelUpdate}>Cancel</button>
          </div>
        </div>
        <br />
        </>
      ) : (
        <>
        <div className="row">
          <div className="col">
            <input value={newTask} onChange={e => setNewTask(e.target.value)} 
            className="form-control form-control-lg" />

          </div>
          <div className="col-auto">
            <button className="btn btn-lg btn-success" onClick={addTask}>Add Task</button>
          </div>

        </div>
        <br />
        
        </>
      )}

      {/*if there are no task then it will show the No tasks text */}
      {toDo && toDo.length ? '' : 'No tasks yet...add new task here'}

      {/*show todo list */}

      {toDo && toDo 
      .sort((a, b)=>a.id>b.id ? 1 : -1)
      .map((task, index) => {

        return (
          <React.Fragment key={task.id}>
            <div className="col taskBg">
              <div className={task.status ? 'done' : ''} id="display">
                <span className="taskNumber">{index + 1}</span>
                <span className="taskText">{task.title}</span>
              </div>
              <div className="iconsWrap">
                <span onClick={(e)=> markDone(task.id)} title="Completed / Not Completed">
                  <FontAwesomeIcon icon={faCircleCheck} />
                </span>
                {task.status ? null : (
                  <span title="Edit" 
                  onClick={()=>setUpdateData({id: task.id, title: task.title, status: task.status ? true: false})}>
                  <FontAwesomeIcon icon={faPen} />
                  </span>
                )}
                <span 
                onClick={()=> deleteTask(task.id)} 
                title="Delete">
                <FontAwesomeIcon icon={faTrashCan} />
                </span>

              </div>

            </div>

          </React.Fragment>
        );
      })}
    </div>
  );
}

export default App;
