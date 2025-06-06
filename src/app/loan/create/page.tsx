'use client'

import {createLoan} from '@/lib/loan/actions'
import {ChangeEvent, useActionState, useState, useTransition} from 'react'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import Image from "next/image";

export default function CreateLoanForm() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const [state, formAction] = useActionState(createLoan, null)
  const [images, setImages] = useState<[{ file: [], preview: string }] | null>(null)
  const [isPending, startTransition] = useTransition()


  const hangleUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Object.entries(e.target.files)
    const allFiles = files.map(file => {
      return {file: file[1], preview: URL.createObjectURL(file[1])}
    })
    setImages(allFiles)
  }


  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      formAction(formData)
      setImages(null)
    })
  }
  const validateDate = (e: ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value)
    if (date < new Date()) {
      e.target.setCustomValidity('La fecha no puede ser anterior a la fecha actual')
    } else {
      e.target.setCustomValidity('')
    }
  }


  return (
    <div className="flex h-dvh items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Crear Prestamo</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="flex flex-col gap-4">
            <Input
              name="recipientName"
              type="text"
              placeholder="Nombre del destinatario"
              required
            />
            <Input
              name="itemName"
              type="text"
              placeholder="Nombre del artículo"
              required
            />
            <Input
              name="quantity"
              type="number"
              placeholder="Cantidad"
              required
            />

            <Label htmlFor="returnBy">Hasta</Label>
            <Input
              name="returnBy"
              type="date"
              required
              className="w-[150px]"
              onChange={e => validateDate(e)}
            />

            <Input
              name="description"
              placeholder="Descripción"
            />
            <Input type="file" name="files" id="files" multiple accept="image/*"
                   onChange={e => hangleUploadChange(e)}/>

            {images && (
              <div className="grid grid-cols-3 gap-4">
                {images.map((files) => {
                  return (
                    <div key={files.file.name} className="flex items-center justify-center">
                      <Image src={files.preview} width={200} height={200} alt="Image"/>
                    </div>
                  )
                })}
              </div>
            )}


            <Button type="submit" variant="outline">{isPending ? 'Cargando...' : 'Crear Préstamo'}</Button>


            {state?.error && (
              <div className="error">
                {state.error}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
