// Este arquivo não deve ser atingido — o middleware redireciona antes.
// Fallback de segurança.
import { redirect } from 'next/navigation';
export default function RootPage() {
  redirect('/');
}
