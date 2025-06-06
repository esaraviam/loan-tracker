'use client'
import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown} from "lucide-react"
import {Button} from "@/components/ui/button";
import {format, formatDistance} from "date-fns";
import {es} from "date-fns/locale";
import Link from "next/link";
import {LOAN_STATES} from "@/infraestructure/types/loanTypes";

export type Loan = {
  id: string
  recipientName: string
  itemName: string
  description: string
  quantity: number
  stateStart: string
  borrowedAt: Date
  returnBy: Date
}
export const all_loans_columns: ColumnDef<Loan>[] = [

  {
    accessorKey: "recipientName",
    hasFilter: true,
    filterText: 'Prestado a',
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prestado a
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
  },
  {
    accessorKey: "itemName",
    hasFilter: true,
    filterText: 'Objeto Prestado',

    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Objeto Prestado
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },

  },
  {
    accessorKey: "returnBy",
    header: "Debe ser regresado para",
    cell: ({row}) => {
      const returnDate = row.getValue("returnBy")
      const formatted = formatDistance(returnDate, Date.now(), {
        addSuffix: true,
        locale: es
      }) + " el " + format(returnDate, 'dd/MM/yyyy')

      return <div className="text-right font-medium">{formatted}</div>
    },

  },
  {
    accessorKey: "stateStart",
    header: "Estado del prestamo",

  },
  {
    id: "options",
    header: "Options",
    cell: ({row}) => {
      const loan = row.original
      return (
        loan.stateStart === LOAN_STATES.PRESTADO && (
          <Link href={`/loan/${loan.id}`} variant="outline">Realizar Devolucion</Link>)
      )
    },
  }


]
