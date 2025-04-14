import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Task } from "../types/task";

const STORAGE_KEY = "tasks";

const useTasks = () => {
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({
    TO_DO: [],
    IN_PROGRESS: [],
    DONE: [],
  });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isNewTask, setIsNewTask] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    if (!modalOpen) {
      resetForm();
    }
  }, [modalOpen]);

  const resetForm = () => {
    setSelectedTask(null);
    setIsNewTask(false);
  };

  const getTasks = () => {
    try {
      const storedTasks = localStorage.getItem(STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Error al obtener tareas del localStorage", error);
    }
  };

  const handleEdit = (task: Task) => {
    setSelectedTask({ ...task });
    setIsNewTask(false);
    setModalOpen(true);
  };

  const handleNewTask = () => {
    setSelectedTask({
      id: "",
      title: "",
      description: "",
      status: "TO_DO",
      createdAt: "",
    });
    setIsNewTask(true);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const newTasks = { ...tasks };
      Object.keys(newTasks).forEach((status) => {
        newTasks[status] = newTasks[status].filter((task) => task.id !== id);
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
      setTasks(newTasks);
      toast.success("¡Tarea eliminada!");
    } catch (error) {
      console.error("Error al eliminar la tarea", error);
      toast.error("¡Error al eliminar la tarea!");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTask = async () => {
    if (!selectedTask) return;
    setLoading(true);
    try {
      const newTasks = { ...tasks };

      if (isNewTask) {
        const newTask = {
          ...selectedTask,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };

        newTasks[newTask.status].push(newTask);
      } else {
        Object.keys(newTasks).forEach((status) => {
          newTasks[status] = newTasks[status].filter((t) => t.id !== selectedTask.id);
        });

        newTasks[selectedTask.status].push(selectedTask);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
      setTasks(newTasks);
      setModalOpen(false);
      toast.success(`¡Tarea ${isNewTask ? "creada" : "actualizada"} correctamente!`);
    } catch (error) {
      console.error("Error al guardar la tarea", error);
      toast.error(`¡Error al ${isNewTask ? "crear" : "actualizar"} la tarea!`);
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    selectedTask,
    modalOpen,
    isNewTask,
    setModalOpen,
    handleEdit,
    handleNewTask,
    handleDelete,
    handleSaveTask,
    setSelectedTask,
    loading,
  };
};

export default useTasks;
