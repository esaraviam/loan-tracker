'use server'
import {prisma} from "@/infraestructure/database/prisma";
import {getCurrentUser} from "@/infraestructure/features/auth/session";
import {DataTable} from "@/components/shared/DataTable";
import {all_loans_columns} from "@/components/dashboard/all_loans_columns";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {differenceInHours} from "date-fns";
import {LOAN_STATES} from "@/infraestructure/types/loanTypes";

export default async function Dashboard() {
  const user = await getCurrentUser()

  const loans = await prisma.loan.findMany({
    where: {
      userId: user?.id
    }
  })

  const overdueLoans = loans.filter(loan => {
    return differenceInHours(loan.returnBy, Date.now()) <= 0 && loan.stateStart === LOAN_STATES.PRESTADO
  })


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
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
          <CardTitle>Prestamos vencidos</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={all_loans_columns} data={overdueLoans}/>
        </CardContent>

      </Card>

    </div>
  )
}
