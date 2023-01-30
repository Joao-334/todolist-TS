import React, { useState } from 'react';

//Components
import Footer from './components/Footer';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import Tasklist from './components/TaskList';
import Modal from './components/Modal';

//CSS
import styles from './App.module.css'

//Interface
import {ITask} from '../src/interfaces/Task';


function App() {

  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskToUpdate, setUpdatedTask] = useState<ITask | null>(null);

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter(task => {
        return task.id !== id;
      })
    )
  }

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector('#modal');
    if (display) modal!.classList.remove('hide');
    else modal!.classList.add('hide');
  }

  const editTask = (task: ITask): void => {
    hideOrShowModal(true);
    setUpdatedTask(task);
  }

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updateTask: ITask = {id, title, difficulty};

    const tasks = taskList.map((task) => {
      return task.id === updateTask.id ? updateTask : task;
    })

    setTaskList(tasks);
    hideOrShowModal(false);
  }

  return (
    <div>
      <Modal children={<TaskForm btnText='Edit Work' taskList={taskList} task={taskToUpdate} handleUpdate={updateTask}/>}/>
      <Header/>
      <main className={styles.main}>
        <div>
          <h2>O que você vai fazer?</h2>
          <TaskForm btnText='Create Work' taskList={taskList} setTaskList={setTaskList}/>
        </div>
        <div>
          <h2>Suas Tarefas:</h2>
          <Tasklist taskList={taskList} handleDelete={deleteTask} handleEdit={editTask}/>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
