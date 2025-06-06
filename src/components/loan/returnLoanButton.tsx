'use client'
import {Button} from "@/components/ui/button";
import {useTransition} from "react";
import {redirect} from "next/navigation";
import {returnLoan} from "@/infraestructure/features/loan/actions";

export default function ReturnLoanButton( loanId:string) {
  const [isPending, startTransition] = useTransition()
  const handleReturn = () => {
    startTransition(async () => {
      const result = await returnLoan(loanId)
      if (result.success) {
        redirect('/dashboard')
      }
    })
  }

  return (
    <Button
      variant="outline"
      onClick={handleReturn}
      disabled={isPending}
    >
      {isPending ? 'Procesando...' : 'Realizar devolución'}
    </Button>

  )
}
