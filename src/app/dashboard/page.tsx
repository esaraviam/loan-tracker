'use server'
import {prisma} from "@/lib/prisma";
import {getCurrentUser} from "@/lib/auth/session";
import {DataTable} from "@/components/shared/DataTable";
import {all_loans_columns} from "@/components/dashboard/all_loans_columns";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {differenceInDays, differenceInHours} from "date-fns";

export default async function Dashboard() {
  const user = getCurrentUser()
  const loans = await prisma.loan.findMany({
    where: {
      userId: user.id
    }
  })

  const filteredLoans = loans.filter(loan => {
    return differenceInDays(loan.returnBy, Date.now()) <= 3
  })

  const overdueLoans = loans.filter(loan => {
    console.log(loan.returnBy, Date.now(), differenceInHours(loan.returnBy, Date.now()))
    return differenceInHours(loan.returnBy, Date.now()) <= 0
  })


  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Todos los préstamos</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={all_loans_columns} data={loans}/>
        </CardContent>

      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Prestamos por vencer</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={all_loans_columns} data={filteredLoans}/>
        </CardContent>

      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Prestamos por vencidos</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={all_loans_columns} data={overdueLoans}/>
        </CardContent>

      </Card>

    </div>
  )
}
