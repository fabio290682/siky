'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AppLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
  >
    <path
      d="M26.25 21L21 15.75L15.75 21L21 26.25L26.25 21Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 8C11.7909 8 10 9.79086 10 12V14C10 15.1046 10.8954 16 12 16H14C15.1046 16 16 15.1046 16 14V12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12V30C8 32.2091 9.79086 34 12 34H14C15.1046 34 16 33.1046 16 32V29"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M34 8C36.2091 8 38 9.79086 38 12V14C38 15.1046 37.1046 16 36 16H34C32.8954 16 32 15.1046 32 14V12C32 9.79086 33.7909 8 36 8C38.2091 8 40 9.79086 40 12V30C40 32.2091 38.2091 34 36 34H34C32.8954 34 32 33.1046 32 32V29"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <AppLogo />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              III Brasil
            </CardTitle>
            <CardDescription>
              Tecnologia que conecta e transforma.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button asChild type="submit" className="w-full">
                <Link href="/dashboard">Login</Link>
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Não tem uma conta?{' '}
              <Link href="/register" className="underline">
                Cadastre-se
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
