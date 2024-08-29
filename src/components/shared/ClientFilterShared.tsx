import { ChangeEvent, useEffect } from 'react';
import { Input } from 'antd';
import { useAtom } from 'jotai';
import { useSearchParams  } from 'react-router-dom';
import { clientFilterAtom } from '../../atoms/ClientAtoms';

const ClientFilterShared = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [clientFilter, setClientFilter] = useAtom(clientFilterAtom);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setClientFilter(value);
    setSearchParams({ filter: value });
  };

  useEffect(() => {
    const filter = searchParams.get('filter') || '';
    setClientFilter(filter);
  }, [searchParams, setClientFilter]);

  return (
    <Input
      placeholder="Filtre os clientes por nome"
      value={clientFilter}
      onChange={handleFilterChange}
    />
  );
};

export default ClientFilterShared;
