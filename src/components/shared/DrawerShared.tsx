import { useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Space} from 'antd';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
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
  observations: { value: string }[];
}

const DrawerShared = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [clientList, setClientList] = useAtom(clientListAtom);

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      cpf: '',
      observations: [{ value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'observations',
  });

  const onSubmit = (data: FormData) => {
    setClientList([
      ...clientList,
      {
        id: Date.now(),
        firstName: data.firstName,
        lastName: data.lastName,
        cpf: data.cpf,
        observations: data.observations.map((obs) => obs.value),
      },
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
        title="Cadastro de Cliente"
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
                  <Form.Item label="Nome">
                    <Controller
                      name="firstName"
                      control={control}
                      rules={{ required: 'Por favor digite seu nome' }}
                      render={({ field }) => <Input placeholder="Digite seu nome" {...field} />}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Sobrenome">
                    <Controller
                      name="lastName"
                      control={control}
                      rules={{ required: 'Por favor digite seu sobrenome' }}
                      render={({ field }) => <Input placeholder="Digite seu sobrenome" {...field} />}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="CPF">
                    <Controller
                      name="cpf"
                      control={control}
                      rules={{ required: 'Por favor digite seu CPF' }}
                      render={({ field }) => <Input placeholder="Digite seu CPF" {...field} />}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
          {currentStep === 1 && (
            <>
              <Row gutter={16}>
                <Col span={24}>
                  <strong>Lista de observações <small>(opcional)</small></strong>
                </Col>
              </Row>
              {fields.map((field, index) => (
                <Row gutter={16} key={field.id} style={{marginBottom: '5px'}}>
                  <Col span={20}>
                    <Form.Item label={`Observação ${index + 1}`}>
                      <Controller
                        name={`observations.${index}.value`}
                        control={control}
                        render={({ field }) => <Input placeholder="Digite sua observação" {...field} />}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={4} style={{display:'flex', alignItems:'flex-end', paddingBottom: '24px'}}>
                    <Button style={{marginTop: '30'}} onClick={() => remove(index)} icon={<MinusCircleOutlined />} />
                  </Col>
                </Row>
              ))}
              <Button
                type="dashed"
                onClick={() => append({ value: '' })}
                style={{ width: '100%' }}
                icon={<PlusOutlined />}
              >
                adicionar observação
              </Button>
            </>
          )}
        </Form>
      </StyledDrawer>
    </>
  );
};

export default DrawerShared;
