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


export default function Home() {

  const [tasks,setTasks] = useState([])
  const [users,setUsers] = useState([])
  const [projects,setProjects] = useState([])



  useEffect(()=>{

  const loadData = async () => {
    try {
      await loadProjects();  
      await loadtUsers();
      await loadtTasks();
    } catch (error) {
      
        console.error("Error loading data:", error);
      
    }
  };

  loadData();
  
}, []);
useEffect(() => {
  console.log("Updated tasks:", tasks);
}, [tasks]);
useEffect(() => {
  console.log("Updated projects:", projects);
}, [projects]);
useEffect(() => {
  console.log("Updated users:", users);
}, [users]);
  // useEffect(()=>{
  //   loadtTasks();
  //   loadProjects();
  //   loadtUsers();
  // },[])
  
  const loadtTasks = async ()=>{
    try {
      const response = await axios.get("http://localhost:8080/tasks")
      // console.log(response.status)
      setTasks(response.data)
      // console.log(tasks)
      

    }catch (error) {
      console.error("Error loading tasks:", error);
    }
  }
  const loadProjects= async()=>{
    try {
      const response = await axios.get("http://localhost:8080/projets")
      setProjects(response.data)
    }catch(error){
      console.log("error loading projects",error);
    }
  }
  const loadtUsers = async ()=>{
    try{
      const response = await axios.get("http://localhost:8080/users")
      setUsers(response.data)
    }catch(error){
      console.log("error loaing users",error)
    }
  }


  // const findProjetName=(idPro)=>{
  //   console.log(idPro)
  //   let projet = {"id":null,"name":"","description":""}
  //   // console.log(projet)
  //   projet= projects.find(pro => idPro === pro.id);
  //   // return projet.name
  //   console.log(projects)
  //   console.log(projet)

  // }
  const findProjetName = (idPro) => {
    const projet = projects.find(pro => pro.id === idPro);
    return projet.name; // Use optional chaining
  };
  const findTaskUser = (idUser)=>{
    const user = users.find(user => user.id === idUser)
      return user.name
  }


  const isDone = (comp) => {
    if (comp === true) {
      return (
        <svg 
        className="ml-1"
    width="30px" 
    height="30px" 
    viewBox="0 -0.5 21 21" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <g 
      id="SVGRepo_bgCarrier" 
      strokeWidth="0"
    />
    <g 
      id="SVGRepo_tracerCarrier" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      <title>done [#1477]</title>
      <desc>Created with Sketch.</desc>
      <defs />
      <g 
        id="Page-1" 
        stroke="none" 
        strokeWidth="1" 
        fill="none" 
        fillRule="evenodd"
      >
        <g 
          id="Dribbble-Light-Preview" 
          transform="translate(-179.000000, -400.000000)" 
          fill="#28a441"
        >
          <g 
            id="icons" 
            transform="translate(56.000000, 160.000000)"
          >
            <path 
              d="M141.9,243 C141.9,242.448 141.4296,242 140.85,242 L126.15,242 C125.5704,242 125.1,242.448 125.1,243 L125.1,257 C125.1,257.552 125.5704,258 126.15,258 L140.85,258 C141.4296,258 141.9,257.552 141.9,257 L141.9,243 Z M144,242 L144,258 C144,259.105 143.06025,260 141.9,260 L125.1,260 C123.93975,260 123,259.105 123,258 L123,242 C123,240.895 123.93975,240 125.1,240 L141.9,240 C143.06025,240 144,240.895 144,242 L144,242 Z M137.72205,247.015 C138.1326,247.405 138.1326,248.039 137.72205,248.429 L133.63965,252.317 C133.0233,252.903 132.0258,252.903 131.40945,252.317 L129.5541,250.55 C129.1446,250.16 129.1446,249.527 129.5541,249.136 C129.96465,248.746 130.6293,248.746 131.0388,249.136 L131.7801,249.842 C132.19065,250.233 132.8574,250.233 133.269,249.842 L136.23735,247.015 C136.64685,246.624 137.31255,246.624 137.72205,247.015 L137.72205,247.015 Z" 
              id="done-[#1477]"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
      );
    }
    return <svg
    width="35px"
    height="37px"
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    fill="#e47711"
  >
    <path d="M52.303 8.563C53.24 8.563 54 7.74 54 6.729V3.833C54 2.82 53.24 2 52.303 2H11.697C10.759 2 10 2.82 10 3.833v2.896c0 1.011.759 1.833 1.697 1.833h1.053v46.875h-1.053c-.938 0-1.697.82-1.697 1.833v2.895c0 1.013.759 1.835 1.697 1.835h40.605C53.24 62 54 61.178 54 60.165V57.27c0-1.013-.76-1.833-1.697-1.833H51.25V8.563h1.053m-37.72 46.875V8.563h1.724c-.445 0-.807.335-.807.749v2.25c0 .414.358.747.802.75v.001c0 8.289 1.328 16.344 10.932 19.12l.474.15c.415.132.912.288 1.166.417c-.254.127-.745.283-1.158.413l-.453.145c-9.632 2.786-10.96 10.841-10.96 19.13v.001c-.443.003-.802.336-.802.748v2.25c0 .414.361.751.807.751h-1.725m21.163-21.233l.494.156c6.806 1.968 9.463 6.445 9.617 16.389H32.816c-.131-4.624-.459-16.433-.459-18.75c0-.785 1.452-1.886 2.12-2.279c2.819-1.665 6.445-4.959 6.445-8.387H23.076c0 3.428 3.626 6.722 6.445 8.387c.666.394 2.12 1.494 2.12 2.279c0 2.378-.327 14.138-.458 18.75h-13.04c.153-9.941 2.813-14.42 9.645-16.397l.469-.147c1.313-.414 2.553-.806 2.553-2.205c0-1.401-1.244-1.794-2.563-2.208l-.488-.155c-6.805-1.968-9.462-6.444-9.615-16.387h27.715c-.154 9.943-2.813 14.422-9.643 16.396l-.457.145c-1.32.414-2.567.807-2.567 2.209c-.002 1.398 1.24 1.79 2.554 2.204m13.67 21.233h-1.722c.444 0 .806-.337.806-.751v-2.25c0-.413-.36-.746-.803-.748v-.001c0-8.29-1.328-16.346-10.932-19.122l-.48-.152c-.412-.13-.905-.286-1.159-.413c.255-.129.753-.285 1.169-.417l.443-.141c9.631-2.784 10.959-10.84 10.959-19.13v-.001c.442-.002.803-.335.803-.75v-2.25c0-.414-.361-.749-.806-.749h1.722v46.875" />
  </svg>
  
  };




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
      console.log('infos de new projet : ',newProject)
      await axios.post("http://localhost:8080/projets", newProject)
      await loadProjects() // Refresh projects list
      setOpen(false)
      setNewProject({ name: "", description: "" })
    } catch (error) {
      console.error("Error adding project:", error)
    }
  }

    


  return (
    <div className="container mx-auto p-4">
       <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Liste Des Projets</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Add New Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <form onSubmit={addProject} className="space-y-4">
              <div>
                <label htmlFor="name">Project Name</label>
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
              <Button type="submit">Create Project</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

       
       
       
       
            {/* ///////////////                  La Partie des Tableaux               ////////  ////////////*/}
       <h1 className="text-2xl font-bold text-center mb-6">Liste Des Projets</h1>
       {projects.map((projet) => (
        <div key={projet.id} className="mt-5">
          {/* Clickable caption to toggle table */}
          <div className="w-full text-center cursor-pointer text-blue-500 font-semibold" onClick={() => toggleTable(projet.id)}>
            {/* <span>yes</span> */}
            <span>Projet : {projet.name}</span>
          </div>

          {/* Show table only if the project is visible */}
          {visibleTables[projet.id] && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Assigned To</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks
                  .filter((task) => task.projetId === projet.id)
                  .map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.description}</TableCell>
                      <TableCell>{isDone(task.completed)}</TableCell>
                      <TableCell>{findTaskUser(task.userId)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </div>
      ))}
      {/* <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Projet</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned To</TableHead>
            </TableRow>
          </TableHeader>
        <TableBody>
          {tasks.map((task)=>(
            <TableRow key={task.id}>

              <TableCell>{findProjetName(task.projetId)|| 'Unknown Project'}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{isDone(task.completed)}</TableCell>
              <TableCell>{findTaskUser(task.userId)}</TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table> */}
    </div>
  )
}
