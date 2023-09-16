import React from "react";
import { Modal, Radio, Form, Input, message } from 'antd';
import { NEXT_PUBLIC_API_URL } from "../../constants";
import { useRouter } from "next/router";
import { patch } from "../../utils/api";



const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

type FieldType = {
    transactionType?: any;
    amount?: string;
    description?: string;
};

interface PropTypes {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
}

const TransactionModal: React.FC<PropTypes> = ({
    isModalOpen,
    handleOk,
    handleCancel
}) => {
    const [form] = Form.useForm();
    const router = useRouter()
    const { walletId } = router.query
    const onOk = () => {
        form.submit();
    }

    const onFinish = (values: any) => {
        values.amount = Number(values.amount);
        if (values.transactionType === 'debit') {
            values.amount = -Math.abs(values.amount);
        }
        patch(`${NEXT_PUBLIC_API_URL}/wallet/${walletId}`,{
            amount: values.amount,
            description: values.description
        }).then((res) => res.json()).then(({ data }) => {
            if (data) {
                handleCancel()
                message.success('Transaction created successfully')
            }
        }).catch((e)=>{
            message.error(e.message)
        })
    };

    return (
        <Modal title="Create Transaction" open={isModalOpen} onOk={onOk} onCancel={handleCancel}>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                form={form}
            >
                <Form.Item<FieldType>
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input your description' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Amount"
                    name="amount"
                    rules={[{ required: true, message: 'Please input amount to credit or debit' }]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item label="Transaction Type"
                    name="transactionType"
                    rules={[{ required: true, message: 'Please select trancation type' }]}>
                    <Radio.Group>
                        <Radio value="credit"> Credit </Radio>
                        <Radio value="debit"> Debit </Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default TransactionModal;