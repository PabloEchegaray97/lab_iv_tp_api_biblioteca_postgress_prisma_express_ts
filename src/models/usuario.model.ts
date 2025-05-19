export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  password: string;
}
export interface UsuarioCreateInput {
  nombre: string;
  email: string;
  password: string;
}
export interface UsuarioUpdateInput {
  nombre?: string;
  email?: string;
  password?: string;
} 