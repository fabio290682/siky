

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { staticConventions, type Convention } from "@/lib/data";
import { ConventionsClientContent } from "@/components/conventions-client-content";

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'adimplente':
    case 'em execução':
      return 'default';
    case 'prestação de contas em análise':
    case 'aguardando prestação de contas':
      return 'secondary';
    case 'prestação de contas enviada para análise':
        return 'outline';
    case 'cancelado':
      return 'destructive';
    default:
      return 'outline';
  }
};

type ConventionsPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ConventionsPage({ searchParams }: ConventionsPageProps) {
    const allConventions: Convention[] = staticConventions;

    let filteredConventions = [...allConventions];
    
    Object.entries(searchParams).forEach(([key, value]) => {
        if (value && typeof value === 'string') {
            filteredConventions = filteredConventions.filter(item =>
                String(item[key as keyof Convention]).toLowerCase().includes(value.toLowerCase())
            );
        }
    });


  return (
    <Card>
      <CardHeader>
        <CardTitle>Convênios</CardTitle>
        <CardDescription>
          Uma lista de todos os convênios registrados no sistema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ConventionsClientContent
          conventions={filteredConventions}
          initialFilters={searchParams}
        />
      </CardContent>
    </Card>
  );
}
