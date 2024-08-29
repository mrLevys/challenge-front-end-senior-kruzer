import { List } from 'antd';
import { useAtom } from 'jotai';
import { clientListAtom, clientFilterAtom } from '../../atoms/ClientAtoms';

const ClientList = () => {
  const [clientList] = useAtom(clientListAtom);
  const [clientFilter] = useAtom(clientFilterAtom);

  const filteredClients = clientList.filter(client => 
    `${client.firstName} ${client.lastName}`
    .toLowerCase()
    .includes(clientFilter.toLowerCase())
  );

  console.log('clients', clientList)

  return (
    <List
      itemLayout='horizontal'
      dataSource={filteredClients}
      renderItem={client => (
        <List.Item>
          <List.Item.Meta 
            title={`Cliente: ${client.firstName} ${client.lastName}`}
            description={`CPF: ${client.cpf}`}
          />
          {client.observations.length > 0 && (
            <div>
              <h4>Observações:</h4>
              <ol>
                {client.observations.map((obs, index) => (
                  <li key={index}>
                    {`${obs}`}
                  </li>
                ))}
              </ol>
            </div>            
          )}          
        </List.Item>
      )}
    />
  )
}

export default ClientList;
