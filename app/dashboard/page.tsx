// // "use client"

// // import { useEffect } from "react"
// // import { useRouter } from "next/navigation"
// // import { useAuth } from "@/context/auth-context"
// // import DashboardLayout from "@/components/dashboard-layout"
// // import DataTable from "@/components/data-table"

// // export default function Dashboard() {
// //   const { user, isAuthenticated } = useAuth()
// //   const router = useRouter()

// //   useEffect(() => {
// //     if (!isAuthenticated) {
// //       router.push("/")
// //     }
// //   }, [isAuthenticated, router])

// //   if (!isAuthenticated) {
// //     return null
// //   }

// //   return (
// //     <DashboardLayout>
// //       <div className="p-6">
// //         <h1 className="text-2xl font-bold mb-6">Details</h1>
// //         <DataTable />
// //       </div>
// //     </DashboardLayout>
// //   )
// // }

// "use client"

// import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { useAuth } from "@/context/auth-context"
// import DashboardLayout from "@/components/dashboard-layout"
// import DataTable from "@/components/data-table"

// export default function Dashboard() {
//   const { user, isAuthenticated } = useAuth()
//   const router = useRouter()

//   useEffect(() => {
//     if (!isAuthenticated || !user) {
//       router.push("/")
//     }
//   }, [isAuthenticated, user, router])

//   if (!isAuthenticated || !user) {
//     return <div className="flex justify-center p-6">Loading...</div>
//   }

//   return (
//     <DashboardLayout>
//       <div className="p-6">
//         <h1 className="text-2xl font-bold mb-6">Details</h1>
//         <DataTable />
//       </div>
//     </DashboardLayout>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import DashboardLayout from "@/components/dashboard-layout"
import DataTable from "@/components/data-table"

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")

    if (!storedUser) {
      router.push("/")
    } else {
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return <div className="flex justify-center p-6">Loading...</div>
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Details</h1>
        <DataTable />
      </div>
    </DashboardLayout>
  )
}
