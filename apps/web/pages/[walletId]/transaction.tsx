import React from 'react';
import { Typography, Button } from 'antd';
import TransactionModal from '../../components/TransactionModal/TransactionModal';

const { Title } = Typography;
const Transaction: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    return (
        <div>
            <div style={{ display: "flex" }}>
                <Title level={3} style={{ flexGrow: 1 }}>Transaction</Title>
                <Button type="primary" onClick={()=> setIsModalOpen(true)}>Create Transaction</Button>
            </div>
            {isModalOpen && <TransactionModal
                isModalOpen={isModalOpen}
                handleOk={() => setIsModalOpen(false)}
                handleCancel={() => setIsModalOpen(false)}
            />}
        </div>
    );
}

export default Transaction;