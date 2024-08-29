/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Space } from 'antd';
import { useAtom } from 'jotai';
import { clientListAtom, clientFilterAtom } from '../../atoms/ClientAtoms';
import ClientFilterShared from './ClientFilterShared';

const ClientList = () => {
  const [clientList] = useAtom(clientListAtom);
  const [clientFilter] = useAtom(clientFilterAtom);

  const filteredClients = clientList.filter(client => 
    `${client.firstName} ${client.lastName}`
    .toLowerCase()
    .includes(clientFilter.toLowerCase())
  );

  const columns = [
    {
      title: 'Nome Completo',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (_: any, client: any) => `${client.firstName} ${client.lastName}`,
    },
    {
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf',
    },
    {
      title: 'Observações',
      dataIndex: 'observations',
      key: 'observations',
      render: (observations: string[]) => (
        observations.length > 0 ? (
          <div>
            <ol>
              {observations.map((obs, index) => (
                <li key={index}>
                  {`${obs}`}
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <span>Sem observações</span>
        )
      ),
    },
  ];

  console.log('clients', clientList)

  return (
    <>
    <Space style={{padding: '16', marginBottom: '30px'}}>
      Filtre pelo nome:
      <ClientFilterShared />
    </Space>
    <Table
        columns={columns}
        dataSource={filteredClients.map(client => ({
          ...client,
          fullName: `${client.firstName} ${client.lastName}`,
          key: client.id,
        }))}
      />
    </>
  )
}

export default ClientList;
