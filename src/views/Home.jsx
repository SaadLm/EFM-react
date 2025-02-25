import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Age</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>20</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
