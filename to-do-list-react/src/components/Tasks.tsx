import React, {
  ChangeEvent,
  FormEvent,
  InvalidEvent,
  useEffect,
  useState,
} from "react";
import { Check, PlusCircle } from "phosphor-react";

import styles from "./Tasks.module.css";
import { TasksList } from "./TasksList";

import { v4 as uuidv4 } from "uuid";

export interface TasksProps {
  content: string;
  id: string;
  isComplete: boolean;
}

const tasksList: TasksProps[] = [
  {
    content: "Estudar React",
    id: uuidv4(),
    isComplete: false,
  },
  {
    content: "Limpar a casa",
    id: uuidv4(),
    isComplete: false,
  },
];

export function Tasks() {
  const [tasks, setTasks] = useState<TasksProps[]>(tasksList);
  const [newTasks, setNewTasks] = useState<string>("");

  /*   function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    setTasks([...tasks, newTasks]);
    setNewTasks("");
  } */

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newTask = {
      content: newTasks,
      id: uuidv4(),
      isComplete: false,
    };

    const newTasksArray = [...tasks, newTask];

    setTasks(sortByIsComplete(newTasksArray));

    setNewTasks("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewTasks(event.target.value);
  }

  function deleteTasks(taskId: string) {
    const tasksWithoutDeleteOne = tasks.filter((task: TasksProps) => {
      return task.id !== taskId;
    });
    setTasks(tasksWithoutDeleteOne);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório");
  }

  function sortByIsComplete(newTasksArray: TasksProps[]) {
    const newTasksArraySorted = newTasksArray.sort((a, b) => {
      if (a.isComplete === false) return -1;

      if (a.isComplete === true) return 1;

      return 0;
    });

    return newTasksArraySorted;
  }

  function selectTask(taskId: string) {
    const newTasksArray = tasksList.map((task) => {
      if (task.id === taskId) task.isComplete = !task.isComplete;
      return task;
    });

    setTasks(sortByIsComplete(newTasksArray));
  }
  return (
    <div>
      <form onSubmit={handleCreateNewTask} className={styles.container}>
        <input
          type="text"
          name="task"
          id="newTask"
          placeholder="Adicione uma nova tarefa"
          value={newTasks}
          onInvalid={handleNewTaskInvalid}
          onChange={(e) => handleNewTaskChange(e)}
          required
        />
        <button>
          Criar
          <PlusCircle size={16} />
        </button>
      </form>

      <TasksList
        tasks={tasks}
        onDeleteTask={deleteTasks}
        onSelectTask={selectTask}
      />
    </div>
  );
}
