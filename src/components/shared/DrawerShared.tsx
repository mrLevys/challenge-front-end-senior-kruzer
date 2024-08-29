import { useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Space} from 'antd';
import { useForm, useFieldArray, Controller} from 'react-hook-form';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { clientListAtom } from '../../atoms/ClientAtoms';

const StyledDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding-bottom: 80px;
  }
`;

interface FormData {
  firstName: string;
  lastName: string;
  cpf: string;
  observations: {value: string}[];
}

const DrawerShared = () => {

  const [currentStep, setCurrentStep] = useState(0);
  const [clientList, setClientList] = useAtom(clientListAtom);
  
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      cpf: '',
      observations: [{ value: ''}]
    }
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'observations'
  });

  const onSubmit = (data: FormData) => {
    console.log('dt ==>',data)
    setClientList([
      ...clientList,
      {
        id: Date.now(),
        firstName: data.firstName,
        lastName: data.lastName,
        cpf: data.cpf,
        observations: data.observations.map(obs => obs.value),
      }
    ]);
    reset();
    onClose();
  };

  const next = () => setCurrentStep(1);
  const prev = () => setCurrentStep(0);

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Cadastro cliente
      </Button>
      <StyledDrawer
        title="Cadatro de Cliente"
        width={480}
        onClose={onClose}
        open={open}
        footer={
          <Space>
            {currentStep > 0 && <Button onClick={prev}>Voltar</Button>}
            <Button onClick={onClose}>Cancelar</Button>
            {currentStep === 0 && <Button onClick={next}>Próximo</Button>}
            {currentStep === 1 && (
              <Button type="primary" onClick={handleSubmit(onSubmit)}>
                Salvar
              </Button>
            )}
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          {currentStep === 0 && (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="firstName"
                    label="Nome"
                    rules={[{ required: true, message: 'Por favor digite seu nome' }]}
                  >
                    <Controller 
                      name='firstName'
                      control={control}
                      render={(field) => <Input placeholder="Digite seu nome" {...field} />}
                    />                    
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="lastName"
                    label="Sobrenome"
                    rules={[{ required: true, message: 'Por favor digite seu sobrenome' }]}
                  >
                    <Controller 
                      name='lastName'
                      control={control}
                      render={(field) => <Input placeholder="Digite seu sobrenome" {...field} />}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="cpf"
                    label="cpf"
                    rules={[{ required: true, message: 'Por favor digite seu CPF' }]}
                  >
                    <Controller 
                      name='cpf'
                      control={control}
                      render={(field) => <Input placeholder="Digite seu CPF" {...field} />}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
          {currentStep === 1 && (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <strong>Lista de observações <small>(opcional)</small></strong>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  {fields.map((field, index) => (
                    <Form.Item label={`Observação ${index + 1}`} key={field.id}>
                      <Controller
                        name={`observations.${index}.value`}
                        control={control}
                        render={({ field }) => <Input placeholder="Digite sua observação" {...field} />}
                      />
                      <Button onClick={() => remove(index)}>
                        <MinusCircleOutlined className="dynamic-delete-button" />
                      </Button>
                    </Form.Item>
                  ))}
                  <Button 
                    type="dashed"
                    onClick={() => append({ value: '' })}
                    style={{ width: '100%' }}
                    icon={<PlusOutlined />}
                  >
                    adicionar observação
                  </Button>   
                </Col>
              </Row>
            </>
          )}
        </Form>
      </StyledDrawer>
    </>
  )
}

export default DrawerShared;