import React, { useEffect, useState } from 'react';
import { Typography, Button, message } from 'antd';
import TransactionModal from '../../components/TransactionModal/TransactionModal';
import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { NEXT_PUBLIC_API_URL } from '../../constants';
import { useRouter } from 'next/router';
import { get } from '../../utils/api';
const { Title } = Typography;
interface DataType {
    name: {
        first: string;
        last: string;
    };
    gender: string;
    email: string;
    login: {
        uuid: string;
    };
}

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue>;
}
const Transaction: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [data, setData] = useState<DataType[]>();
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);
    const router = useRouter();
    const walletId = router.query.walletId;
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const skip = (tableParams.pagination?.current! - 1) * tableParams.pagination?.pageSize!;
    const columns: ColumnsType<DataType> = [
        {
            title: 'Description',
            dataIndex: 'description',
            sorter: true,
            width: '20%',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            width: '20%',
        },
    ];

    const fetchData = () => {
        if (!walletId) return;
        setLoading(true);
        get(`${NEXT_PUBLIC_API_URL}/wallet/transactions?walletId=${walletId}&skip=${skip}&limit=10`)
            .then((res) => res.json())
            .then(({ data, count }) => {
                setData(data);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: count,
                    },
                });
            }).catch((err) => { 
                message.error(err.message)
            });
    };

    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams), walletId, count]);

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue>,
        sorter: SorterResult<DataType>,
    ) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const exportCSV = () => {
        window.open(`${NEXT_PUBLIC_API_URL}/wallet/${walletId}/transactions/export`)
    };
    return (
        <div>
            <div style={{ display: "flex" }}>
                <Title level={3} style={{ flexGrow: 1 }}>Transaction</Title>
                <Button type="primary" onClick={() => exportCSV()} style={{marginRight: 12}}>Export CSV</Button>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>Create Transaction</Button>
            </div>
            {isModalOpen && <TransactionModal
                isModalOpen={isModalOpen}
                handleOk={() => setIsModalOpen(false)}
                handleCancel={() => { setIsModalOpen(false); setCount((prevCount) => (prevCount + 1)) }}
            />}
            <Table
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
            />
        </div>
    );
}

export default Transaction;