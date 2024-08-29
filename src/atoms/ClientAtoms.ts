import { atom } from 'jotai';

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  cpf: string;
  observations: string[];
}

export const clientListAtom = atom<Client[]>([]);
export const clientFilterAtom = atom<string>('');