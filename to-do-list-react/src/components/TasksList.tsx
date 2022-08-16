import { ChangeEvent, useState } from "react";
import { Trash } from "phosphor-react";

import { Tasks, TasksProps } from "./Tasks";

import clip from "../assets/clipboard.png";

import styles from "./TasksList.module.css";
import { NewTask } from "./NewTask";

export interface TasksListProps {
  // content: string;
  tasks: TasksProps[];
  onDeleteTask: (taskId: string) => void;
  onSelectTask: (taskId: string) => void;
}

export function TasksList({
  tasks,
  onDeleteTask,
  onSelectTask,
}: TasksListProps) {
  const counter = tasks.length;
  const completeTasksCount = tasks.filter(
    (task: TasksProps) => task.isComplete === true
  ).length;

  /*   function handleChecked(event: ChangeEvent<HTMLInputElement>) {
    setCheck(event.target.checked);
  } */
  function handleDeleteTask(taskId: string) {
    onDeleteTask(taskId);
  }

  function handleSelectTask(taskId: string) {
    onSelectTask(taskId);
  }

  return (
    <>
      <header className={styles.headerTasks}>
        <p>
          Tarefas criadas
          <span>{counter}</span>
        </p>
        <p>
          Concluídas
          <span>
            {completeTasksCount} de {counter}
          </span>
        </p>
      </header>
      {tasks.length === 0 ? (
        <div className={styles.emptyTasks}>
          <img src={clip} alt="" />
          <p>
            <strong>Você ainda não tem tarefas cadastradas</strong>
          </p>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
      ) : (
        <>
          {tasks.map(({ content, id, isComplete }: TasksProps) => (
            <NewTask
              onDeleteTask={handleDeleteTask}
              onSelectTask={handleSelectTask}
              key={`${id}-${content}`}
              idTask={id}
              content={content}
              isComplete={isComplete}
            ></NewTask>
          ))}
        </>
      )}
    </>
  );
}
