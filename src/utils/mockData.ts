// src/utils/mockData.ts
import type { Employee } from '../types';

export const mockEmployees: Employee[] = [
  {
    id: 1,
    name: "Ana García",
    email: "ana.garcia@empresa.com",
    position: "Desarrolladora Frontend",
    department: "Tecnología",
    salary: 8500,
    hireDate: "2022-03-15",
    status: "active",
    role: "employee",
    avatarUrl: "https://i.pravatar.cc/64?img=1",
  },
  {
    id: 2,
    name: "Carlos Martínez",
    email: "carlos.martinez@empresa.com",
    position: "Gerente de RRHH",
    department: "Recursos Humanos",
    salary: 12000,
    hireDate: "2019-07-01",
    status: "active",
    role: "hr",
  },
  {
    id: 3,
    name: "María López",
    email: "maria.lopez@empresa.com",
    position: "Contadora Senior",
    department: "Finanzas",
    salary: 9500,
    hireDate: "2021-01-20",
    status: "on_leave",
    role: "employee",
  },
  {
    id: 4,
    name: "Roberto Silva",
    email: "roberto.silva@empresa.com",
    position: "Administrador del Sistema",
    department: "Tecnología",
    salary: 15000,
    hireDate: "2018-05-10",
    status: "active",
    role: "admin",
  },
  {
    id: 5,
    name: "Lucía Ramírez",
    email: "lucia.ramirez@empresa.com",
    position: "Analista de Operaciones",
    department: "Operaciones",
    salary: 7800,
    hireDate: "2023-02-01",
    status: "inactive",
    role: "employee",
  },
  {
    id: 6,
    name: "Diego Herrera",
    email: "diego.herrera@empresa.com",
    position: "Ejecutivo de Ventas",
    department: "Ventas",
    salary: 8200,
    hireDate: "2022-11-14",
    status: "active",
    role: "employee",
  },
  
];

import type { Department } from '../types';

export const mockDepartments: Department[] = [
  { id: 1, nombre: 'Tecnología', encargado: 'Roberto Silva', cantidadEmpleados: 12, presupuesto: 150000, ubicacion: 'Edificio A - Piso 3', estado: 'active' },
  { id: 2, nombre: 'Recursos Humanos', encargado: 'Carlos Martínez', cantidadEmpleados: 5, presupuesto: 60000, ubicacion: 'Edificio B - Piso 1', estado: 'active' },
  { id: 3, nombre: 'Finanzas', encargado: 'María López', cantidadEmpleados: 8, presupuesto: 90000, ubicacion: 'Edificio A - Piso 2', estado: 'active' },
  { id: 4, nombre: 'Operaciones', encargado: 'Lucía Ramírez', cantidadEmpleados: 20, presupuesto: 200000, ubicacion: 'Planta Baja', estado: 'inactive' },
  { id: 5, nombre: 'Ventas', encargado: 'Diego Herrera', cantidadEmpleados: 15, presupuesto: 120000, ubicacion: 'Edificio C - Piso 1', estado: 'active' },
];