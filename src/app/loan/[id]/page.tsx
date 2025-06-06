import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {prisma} from "@/lib/prisma";
import Image from "next/image";
import {format} from "date-fns";
import {Button} from "@/components/ui/button";
import ReturnLoanButton from "@/components/loan/returnLoanButton";

function IconTrendingUp() {
  return null;
}

export default async function LoanPage({params}: { params: { id: string } }) {
  const {id} = await params
  const loan = await prisma.loan.findUnique({
    where: {
      id: id
    },
    include: {
      photos: true,
    },

  })


  return (
    <div className="flex h-dvh m-auto items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loan.itemName}
          </CardTitle>
          <CardDescription className="text-sm">Fucha creación:
            <span className="font-bold">{format(loan.createdAt, 'dd/MM/yyyy hh:mm:ss')}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  Estado actual: {loan.stateStart}
                </CardTitle>
                <CardDescription>Comentarios del prestamo: {loan.description}</CardDescription>

              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  Prestado a:<span className="font-bold ">{loan.recipientName}</span>
                </div>
                <div className="text-muted-foreground">
                  Devolver hasta: {format(loan.returnBy, 'dd/MM/yyyy')}
                </div>
                <div className="flex gap-2 flex-col items-end w-full" >
                  <ReturnLoanButton loanId={loan.id}/>
                </div>
              </CardFooter>
            </Card>
            <div className="grid grid-cols-3 gap-4">
              {loan?.photos.map(image => (
                <div key={image.id}>
                  <Image src={image.url} alt="" width={200} height={200}
                         className="rounded-md object-cover aspect-square"/>
                </div>
              ))}
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
