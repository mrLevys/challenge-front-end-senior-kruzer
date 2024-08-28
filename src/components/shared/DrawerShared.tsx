import { useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row} from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 36 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 36 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 36, offset: 0 },
  },
};

const DrawerShared = () => {

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Cadastro cliente
      </Button>
      <Drawer
        title="Cadatro de Cliente"
        width={550}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form layout="vertical" hideRequiredMark onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nome"
                label="Nome"
                rules={[{ required: true, message: 'Por favor digite seu nome' }]}
              >
                <Input placeholder="Digite seu nome" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="sobreNome"
                label="Sobrenome"
                rules={[{ required: true, message: 'Por favor digite seu sobrenome' }]}
              >
                <Input placeholder="Digite seu sobrenome" />
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
                <Input placeholder="Digite seu CPF" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <strong>Lista de observações <small>(opcional)</small></strong>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.List
                  name="items"
                  rules={[
                    {
                      validator: async (_, items) => {
                        if (!items || items.length >= 2) {
                          return Promise.reject(new Error('Digite as observações ou exclua o campo adicional.'));
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field, index) => (
                        <Form.Item
                          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                          label={index === 0 ? 'observação 1' : `observação ${index+1}`}
                          required={false}
                          key={field.key}
                        >
                          <Form.Item
                            {...field}
                            validateTrigger={['onChange', 'onBlur']}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message: "Insira a observação ou exclua este campo.",
                              },
                            ]}
                            noStyle
                          >
                            <Input placeholder="Digite sua observação" style={{ width: '80%', marginRight: '10px' }} />
                          </Form.Item>
                          {fields.length > 1 ? (
                            <MinusCircleOutlined
                              className="dynamic-delete-button"
                              onClick={() => remove(field.name)}
                            />
                          ) : null}
                        </Form.Item>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          style={{ width: '100%' }}
                          icon={<PlusOutlined />}
                        >
                          adicionar observação
                        </Button>
                        <Form.ErrorList errors={errors} />
                      </Form.Item>
                    </>
                  )}
              </Form.List>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  )
}

export default DrawerShared;