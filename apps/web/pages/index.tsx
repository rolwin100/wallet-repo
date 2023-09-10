import Head from 'next/head';
import React, { useEffect } from 'react';
import { Spin } from 'antd';
import WalletDetails from '../components/Wallet/WalletDetails';
import WalletForm from '../components/Wallet/WalletForm';
import { NEXT_PUBLIC_API_URL } from '../constants';


const Home: React.FC = () => {
  const [state, setState] = React.useState<any>({
    loading: true,
    walletId: '',
    walletData: null
  });
  const { walletId, walletData, loading } = state;

  useEffect(() => {
    const walletIdLocalStorage = localStorage.getItem('walletId');
    console.log(walletIdLocalStorage, "walletIdLocalStorage")
    if (walletIdLocalStorage) {
      setState((prevState) => ({ ...prevState, loading: true }));
      fetch(`${NEXT_PUBLIC_API_URL}/wallet/${walletIdLocalStorage}`).then((res) => res.json()).then(({ data }) => {
        if (data)
          setState((prevState) => ({ ...prevState, walletId: walletIdLocalStorage, walletData: data }));
      }).finally(() => {
        setState((prevState) => ({ ...prevState, loading: false }));
      });
    }
    else{
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }, [])
  return (
    <div>
      <Head>
        <title>Create next app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!loading ? <>
        {walletId && <WalletDetails loading={loading} walletData={walletData} />}
        {!walletId && <WalletForm />}
      </> : <Spin />}
    </div>
  )
}

export default Home;
