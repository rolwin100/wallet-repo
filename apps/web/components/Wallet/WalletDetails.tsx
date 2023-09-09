import Head from 'next/head';
import React, { useEffect } from 'react';
import { Typography, Spin, Button } from 'antd';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

interface WalletDetailsProps {
    loading: boolean;
    walletData: any;
}

const WalletDetails: React.FC<WalletDetailsProps> = ({ loading, walletData }) => {

    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }
    const { push } = useRouter();
    const transaction = () => {
        push(`/${walletData?.id}/transaction`);
    }
    return (
        <div>
            <Title level={3}>Wallet Details</Title>
            {!loading ? <div>
                <div>
                    <Text strong>Wallet name:</Text>
                    <Text>{walletData?.name}</Text>
                </div>
                <div>
                    <Text strong>Wallet balance:</Text>
                    <Text>{walletData?.balance}</Text>
                </div>
                <div>
                    <Text strong>Wallet Date:</Text>
                    <Text>{new Date(walletData?.date).toLocaleDateString("en-US", options)}</Text>
                </div>
                <Button type="primary" onClick={transaction}>Show transaction</Button>
            </div> : <Spin />}
        </div>
    )
}

export default WalletDetails;
