import React, { useState } from 'react';
import { Button, Typography, Form, Input } from 'antd';
import { NEXT_PUBLIC_API_URL } from '../../constants';


const { Title, Text } = Typography;
const onFinish = (values: any) => {
    console.log('Success:', values);
    values.balance = parseFloat(values.balance) || 0;
    // api call to create wallet
    fetch(`${NEXT_PUBLIC_API_URL}/wallet/setup`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then((res) => res.json()).then(({ data }) => {
        console.log(data);
        if (data) {
            localStorage.setItem('walletId', data.id);
            window.location.reload();
        }
    })
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

type FieldType = {
    name?: string;
    balance?: string;
};

const WalletForm: React.FC = () => (
    <div>

        <Title level={3}>Wallet Setup</Title>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout='vertical'
        >
            <Form.Item<FieldType>
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your wallet name' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Balance"
                name="balance"
            >
                <Input type="number" />
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </div>
);

export default WalletForm;