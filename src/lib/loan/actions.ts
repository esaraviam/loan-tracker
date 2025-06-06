'use server'

import {redirect} from "next/navigation";

const LOAN_STATES = {
  PRESTADO: "PRESTADO",
  DEVUELTO: "DEVUELTO"
};

import {prisma} from '@/lib/prisma'
import {getCurrentUser} from "@/lib/auth/session";
import mime from 'mime';

import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import {randomUUID} from "node:crypto";

const s3 = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function createLoan(prevState: never, formData: FormData) {

  const user = await getCurrentUser()
  if (user) {
    const files = formData.getAll('files');
    const loan = await prisma.loan.create({
      data: {
        userId: user.id,
        recipientName: formData.get('recipientName') as string,
        itemName: formData.get('itemName') as string,
        description: formData.get('description') as string || undefined,
        quantity: parseInt(formData.get('quantity') as string),
        borrowedAt: new Date(formData.get('borrowedAt') as string),
        returnBy: new Date(formData.get('returnBy') as string),
        stateStart: LOAN_STATES.PRESTADO,
        updatedAt: new Date()
      },
      include: {
        photos: true
      }
    })
    if (loan) {
      for (const file of files) {
        const url = await UploadImage(file)
        await prisma.loanPhoto.create({
          data: {
            loanId: loan.id,
            url: url,
            type: 'BEFORE'
          }
        })
      }
      redirect('/dashboard')


    }
    return {error: 'error al crear el prestamo'}

  } else {
    return {error: 'no hay usuario logueado'}

  }


}

export async function UploadImage(file: FormDataEntryValue): Promise<string> {
  try {
    if (!file) {
      throw new Error('Archivo o nombre de carpeta no especificado');
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const extension = mime.getExtension(file.type);
    const filename = `${process.env.AWS_BUCKET_FOLDER!}/${randomUUID()}.${extension}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET!,
      Key: filename,
      Body: buffer,
      ContentType: file.type
    });

    await s3.send(command);
    return `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${filename}`;

  } catch (error: unknown) {
    if (error instanceof Error) {
      return error.message;
    }
    return "error al subir la imagen"
  }
}

export async function returnLoan(loanId: string) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { error: 'Usuario no autorizado' }
    }

    console.log(loanId)
    const loan = await prisma.loan.update({
      where: {
        id: loanId.loanId
      },
      data: {
        stateStart: LOAN_STATES.DEVUELTO,
        returnedAt: new Date(),
        updatedAt: new Date()
      }
    })

    return { success: true }
  } catch (error) {
    //console.log(error)
    return { error: 'Error al procesar la devolución' }
  }
}
