import { Trash } from 'phosphor-react';

import styles from "./NewTask.module.css";

export interface NewTaskProps {
    content: string;
    idTask: string;
    isComplete: boolean;
    onDeleteTask: (isTask: string) => void;
    onSelectTask: (idTask: string) => void;  
}

export function NewTask({
    content,
    idTask,
    isComplete,
    onDeleteTask,
    onSelectTask,

}: NewTaskProps)  {
    function handleDeleteTask() {
        onDeleteTask(idTask);
      }
    
      function handleSelectTask() {
        onSelectTask(idTask);
      }
  return (
    <div  className={styles.filledTasks}>
    <input type="checkbox" onClick={handleSelectTask} />

    {isComplete === true ? (
      <p style={{ textDecoration: "line-through" }}>{content}</p>
    ) : (
      <p>{content}</p>
    )}

    <button  onClick={handleDeleteTask} title="Deletar Tarefa">
      <Trash size={24} />
    </button>
  </div>
  )
}
