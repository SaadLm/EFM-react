import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell  } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios"
import { useEffect , useState} from "react"


export default function Projects() {

  const [tasks,setTasks] = useState([])
  const [users,setUsers] = useState([])
  const [projects,setProjects] = useState([])



  useEffect(()=>{

  const loadData = async () => {
    try {
      await loadProjects();  
      await loadUsers();
      await loadTasks();
    } catch (error) {
      
        console.error("Erreur lors du chargement des données :", error);
      
    }
  };

  loadData();
  
}, []);
useEffect(() => {
  console.log("Tâches mises à jour :", tasks);
}, [tasks]);
useEffect(() => {
  console.log("Projets mis à jour :", projects);
}, [projects]);
useEffect(() => {
  console.log("Utilisateurs mis à jour :", users);
}, [users]);
  
  const loadTasks = async ()=>{
    try {
      const response = await axios.get("http://localhost:8080/tasks")
      setTasks(response.data)
    }catch (error) {
      console.error("Erreur lors du chargement des tâches :", error);
    }
  }
  const loadProjects= async()=>{
    try {
      const response = await axios.get("http://localhost:8080/projets")
      setProjects(response.data)
    }catch(error){
      console.log("Erreur lors du chargement des projets :",error);
    }
  }
  const loadUsers = async ()=>{
    try{
      const response = await axios.get("http://localhost:8080/users")
      setUsers(response.data)
    }catch(error){
      console.log("Erreur lors du chargement des utilisateurs :",error)
    }
  }

  const findProjetName = (idPro) => {
    const projet = projects.find(pro => pro.id === idPro);
    return projet ? projet.name : "Projet inconnu";
  };
  const findTaskUser = (idUser)=>{
    const user = users.find(user => user.id === idUser)
    return user ? user.name : "Non assigné";
  }


  const [visibleTables, setVisibleTables] = useState({});
  // Toggle visibility for a specific project table
  const toggleTable = (projectId) => {
    setVisibleTables((prev) => ({
      ...prev,
      [projectId]: !prev[projectId], // Toggle visibility
    }));
  };


// Ajout de Dialog state
const [open, setOpen] = useState(false)
const [newProject, setNewProject] = useState({
  name: "",
  description: ""
})

  // Ajouter un projet
  const addProject = async (e) => {
    e.preventDefault()
    try {
      console.log('Informations du nouveau projet : ',newProject)
      await axios.post("http://localhost:8081/projets", newProject)
      await loadProjects() // Refresh projects list
      setOpen(false)
      setNewProject({ name: "", description: "" })
    } catch (error) {
      console.error("Erreur lors de l'ajout du projet :", error)
    }
  }

  const handleDeleteProjet =async (id)=>{
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
    try{
      await axios.delete(`http://localhost:8081/projets/${id}`)
      await loadProjects();
    }
    catch(error){
      console.log("Erreur lors de la suppression du projet :", error)
    }
  }
  }
    


  return (
    <div className="container mx-auto p-4">
       <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Liste des Projets</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Ajouter un nouveau projet</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer un nouveau projet</DialogTitle>
            </DialogHeader>
            <form onSubmit={addProject} className="space-y-4 text-white">
              <div>
                <label htmlFor="name">Nom du projet</label>
                <Input
                  id="name"
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <Input
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  required
                />
              </div>
              <Button type="submit">Créer le projet</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

       
       
       
       
            {/* ///////////////                  La Partie des Tableaux               ////////  ////////////*/}
       <h1 className="text-2xl font-bold text-center mb-6">Liste des Projets</h1>
       {projects.map((projet) => (
        <div key={projet.id} className="mt-5">
          {/* Clickable caption to toggle table */}
          <div className="w-full" >
            
            <div className="text-center">
              <span className="cursor-pointer text-blue-500 font-semibold" onClick={() => toggleTable(projet.id)}>Projet : {projet.name}</span>
            </div>

            <div className="text-end">
                    <div>
                      <Button 
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteProjet(projet.id)}
                      >
                        Supprimer
                      </Button>
                    </div>
            </div>
          </div>

          {/* Show table only if the project is visible */}
          {visibleTables[projet.id] && (
            <Table>
              <TableHeader>
                <TableRow>
                <TableCell style={{ width: '150px' }}>Titre</TableCell>
                <TableCell style={{ width: '250px' }}>Description</TableCell>
                <TableCell style={{ width: '100px' }}>Statut</TableCell>
                <TableCell style={{ width: '150px' }}>Assigné à</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks
                  .filter((task) => task.projetId === projet.id)
                  .map((task) => (
                    <TableRow key={task.id}>
                      <TableCell style={{ width: '150px' }}>{task.title}</TableCell>
                      <TableCell style={{ width: '250px' }}>{task.description}</TableCell>
                      <TableCell style={{ width: '100px' }}>
                        {task.completed ? (
                          <svg
                            className="text-green-500"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        ) : (
                          <svg
                            className="text-yellow-500"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        )}
                      </TableCell>
                      {/* <TableCell>{isDone(task.completed)}</TableCell> */}
                      <TableCell>{findTaskUser(task.userId)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </div>
      ))}
    </div>
  )
}