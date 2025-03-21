import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './views/Projects'
import Tasks from './views/Tasks'
import Users from './views/Users'
// import { Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider ,SidebarTrigger } from './components/ui/sidebar'
import { AppSidebar } from './components/app-sidebar'

function App() {
  return (
    <BrowserRouter>
      <div className='flex'>
        <main className='ml-64 w-full'>
        
        {/* <SidebarProvider>
          <Sidebar>
            <SidebarHeader className='text-xl font-bold'>Gestion Des Projets</SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className='font-bold'>Gestion des projets</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          <SidebarTrigger />
          </SidebarProvider> */}
          <Routes >
            <Route exact path="/" element={<Home/>} />
            <Route path="/tasks" element={<Tasks/>} />
            <Route path="/users" element={<Users/>} />

            {/* Add other routes here */}
          </Routes>
          <AppSidebar className="relative top-0 left-0"/>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
