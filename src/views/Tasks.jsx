import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { Label } from "@/components/ui/label";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [newTask, setNewTask] = useState({ 
    title: "", 
    description: "",
    completed: false, 
    userId: "",
    projetId: "" 
  });
  const [editingTask, setEditingTask] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadUsers();
    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      loadTasks(selectedProject);
    }
  }, [selectedProject]);

  const loadTasks = async (projectId) => {
    try {
      const response = await axios.get(`http://localhost:8080/tasks/projet/${projectId}`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const loadProjects = async () => {
    try {
      const response = await axios.get("http://localhost:8080/projets");
      setProjects(response.data);
    } catch (error) {
      console.error("Error loading projects:", error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  // Create
  const handleAddTask = async () => {
    if (newTask.title.trim() && newTask.userId && selectedProject) {
      try {
        const taskToAdd = {
          ...newTask,
          projetId: selectedProject
        };
        await axios.post("http://localhost:8083/tasks", taskToAdd);
        await loadTasks(selectedProject);
        setNewTask({ 
          title: "", 
          description: "", 
          completed: false, 
          userId: "", 
          projetId: "" 
        });
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  // Update
  const handleUpdateTask = async () => {
    if (editingTask && editingTask.title.trim()) {
      try {
        await axios.put(`http://localhost:8083/tasks/${editingTask.id}`, editingTask);
        await loadTasks(selectedProject);
        setEditingTask(null);
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  // Delete
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8083/tasks/${id}`);
      await loadTasks(selectedProject);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Gestion des Tâches</h1>
          <select
            className="p-2 border rounded"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="">Sélectionner un Projet</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={!selectedProject}>Ajouter une Nouvelle Tâche</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingTask ? "Modifier la Tâche" : "Ajouter une Nouvelle Tâche"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-white">
              <Input
                placeholder="Task title"
                value={editingTask ? editingTask.title : newTask.title}
                onChange={(e) =>
                  editingTask
                    ? setEditingTask({ ...editingTask, title: e.target.value })
                    : setNewTask({ ...newTask, title: e.target.value })
                }
              />
              <Input
                placeholder="Description"
                value={editingTask ? editingTask.description : newTask.description}
                onChange={(e) =>
                  editingTask
                    ? setEditingTask({ ...editingTask, description: e.target.value })
                    : setNewTask({ ...newTask, description: e.target.value })
                }
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={editingTask ? editingTask.completed : newTask.completed}
                  onChange={(e) =>
                    editingTask
                      ? setEditingTask({ ...editingTask, completed: e.target.checked })
                      : setNewTask({ ...newTask, completed: e.target.checked })
                  }
                  className="h-4 w-4"
                />
                <Label>Completed</Label>
              </div>
              <select
                className="w-full p-2 border rounded"
                value={editingTask ? editingTask.userId : newTask.userId}
                onChange={(e) =>
                  editingTask
                    ? setEditingTask({ ...editingTask, userId: e.target.value })
                    : setNewTask({ ...newTask, userId: e.target.value })
                }
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <Button
                onClick={editingTask ? handleUpdateTask : handleAddTask}
                className="w-full"
              >
                {editingTask ? "Modifier la Tâche" : "Ajouter une Nouvelle Tâche"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {selectedProject ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Titre</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigné à</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded ${
                      task.completed
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {task.completed ? "Completed" : "Pending"}
                  </span>
                </TableCell>
                <TableCell className='fw-bold'>
                  {users.find(user => user.id === task.userId)?.name || 'Unassigned'}
                </TableCell>
                <TableCell>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingTask(task);
                        setIsDialogOpen(true);
                      }}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Supprimer
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-10 text-gray-500">
          Veuillez sélectionner un projet pour voir ses tâches
        </div>
      )}
    </div>
  );
};

export default Tasks;
