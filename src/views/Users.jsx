import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Copy } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function Users() {

  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
    },
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users');
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingId) {
        await axios.put(`http://localhost:8082/users/${editingId}`, data);
      } else {
        await axios.post('http://localhost:8082/users', data);
      }
      loadUsers();
      form.reset();
      setEditingId(null);
      setOpen(false);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleEdit = (user) => {
    form.setValue('name', user.name);
    form.setValue('email', user.email);
    setEditingId(user.id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:8082/users/${id}`);
        loadUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleAddNew = () => {
    form.reset();  // Reset form values
    setEditingId(null);  // Reset editing state
    setOpen(true);  // Open dialog
  };

  return (
    <div className="container container-fluid mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={handleAddNew}>Ajouter</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit User' : 'Add New User'}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  {editingId ? 'Update User' : 'Add User'}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
        
    

    <Table className="w-full">
  {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow >
          <TableHead className="w-[100px] pl-6">Nom :</TableHead>
          <TableHead className="pl-10">Email :</TableHead>
          {/* <TableHead>Modifier</TableHead> */}
          {/* <TableHead className="text-right">Supprimer</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
          <TableCell className="font-medium pl-4">{user.name}</TableCell>
          <TableCell className="font-medium pl-8">{user.email}</TableCell>
          <TableCell>
            <Button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-500 px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </Button>
          </TableCell>
          <TableCell className="text-center">
            <Button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 px-2 py-1 rounded"
                      >
                      Suprimer
            </Button>
          </TableCell>
        </TableRow>
        ))}

      </TableBody>
    </Table>
    {/* <Dialog>
      <DialogTrigger className="ml-10">
        <Button variant="outline">Ajouter</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Copy />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog> */}

    </div>
  );
}
