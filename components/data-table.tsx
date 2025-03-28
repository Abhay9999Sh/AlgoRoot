"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown } from "lucide-react"

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  company: {
    name: string
  }
}

export default function DataTable() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<keyof User | "company.name">("id")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const rowsPerPage = 10

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users?limit=100")
        const data = await response.json()
        setUsers(data.users)
        setTotalPages(Math.ceil(data.users.length / rowsPerPage))
        setLoading(false)
      } catch (error) {
        console.error("Error fetching users:", error)
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    const filtered = filterData(users)
    setTotalPages(Math.ceil(filtered.length / rowsPerPage))
  }, [users, searchTerm]) // Runs only when users or searchTerm change

  const handleSort = (field: keyof User | "company.name") => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortData = (data: User[]) => {
    return [...data].sort((a, b) => {
      let valueA, valueB

      if (sortField === "company.name") {
        valueA = a.company.name
        valueB = b.company.name
      } else {
        valueA = a[sortField]
        valueB = b[sortField]
      }

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      }

      return sortDirection === "asc" ? (valueA > valueB ? 1 : -1) : valueA < valueB ? 1 : -1
    })
  }

  const filterData = (data: User[]) => {
    if (!searchTerm) return data

    const term = searchTerm.toLowerCase()
    return data.filter(
      (user) =>
        user.firstName.toLowerCase().includes(term) ||
        user.lastName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.phone.toLowerCase().includes(term) ||
        user.company.name.toLowerCase().includes(term),
    )
  }

  const paginateData = (data: User[]) => {
    const startIndex = (currentPage - 1) * rowsPerPage
    return data.slice(startIndex, startIndex + rowsPerPage)
  }

  const processedData = () => {
    const filtered = filterData(users)
    const sorted = sortData(filtered)
    return paginateData(sorted)
  }

  const SortableHeader = ({ field, label }: { field: keyof User | "company.name"; label: string }) => (
    <div className="flex items-center cursor-pointer" onClick={() => handleSort(field)}>
      {label}
      <ArrowUpDown className="ml-1 h-4 w-4" />
    </div>
  )

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
          }}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <SortableHeader field="id" label="ID" />
              </TableHead>
              <TableHead>
                <SortableHeader field="firstName" label="First Name" />
              </TableHead>
              <TableHead>
                <SortableHeader field="lastName" label="Last Name" />
              </TableHead>
              <TableHead>
                <SortableHeader field="email" label="Email" />
              </TableHead>
              <TableHead>
                <SortableHeader field="phone" label="Phone" />
              </TableHead>
              <TableHead>
                <SortableHeader field="company.name" label="Company" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {processedData().map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.company.name}</TableCell>
              </TableRow>
            ))}
            {processedData().length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {processedData().length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0} to{" "}
          {Math.min(currentPage * rowsPerPage, filterData(users).length)} of {filterData(users).length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

