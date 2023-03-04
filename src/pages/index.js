import React,{useEffect} from 'react';
import { Connection, LAMPORTS_PER_SOL,PublicKey, Transaction } from '@solana/web3.js';
import styles from '../styles/Home.module.css';
import Successful from '../Components/Successful';

const index = () => {

  const [publicKey,setPublicKey] = React.useState("");
  const [transaction, setTransaction] = React.useState(false);

  // useEffect(() => {
  //   console.log(publicKey);
  // },[publicKey]);

  
  const changeHandler = (e) => {
    setPublicKey(e.target.value);
  }

  const homeHandler = () => {
    setTransaction(!Transaction);
  }

  const getSolana = async () => {
    // const api_endPoint = 'https://silent-fragrant-mound.solana-devnet.discover.quiknode.pro/46540871a346be9dac9e4271afc950c97667652f/';

    const api_endPoint = 'https://damp-solemn-night.solana-devnet.discover.quiknode.pro/95af64c871d29d036fbaa6b1e4d7001b97e57ea9/';
    const solanaConnection = new Connection(api_endPoint);

    //console.log(publicKey); 

    const publicKeyObj = new PublicKey(publicKey);
    //console.log(publicKeyObj.toBase58());
    const airDropSignature = solanaConnection.requestAirdrop(
      publicKeyObj,
      LAMPORTS_PER_SOL,
    );


    try {
      const txId = await airDropSignature;
      console.log(`Transaction successful with ${txId} ID`);
      setTransaction(true);

    }
    catch(err) {
      console.log(err);
    }


  }

  {if(!transaction) 
    
    return (
      <div className={`container-fluid ${styles.main_container}`}>
      <div className={`${styles.input_container} input-group input-group-lg`}>
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-lg">Wallet address : </span>
        </div>
        <input type="text" className="form-control " aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" placeholder="Enter your wallet address here!" id="input" onChange={changeHandler}/>
      </div>
      <button className="btn btn-primary" onClick={getSolana}>Get Devnet Solana</button>
    </div>
  )
}
{if(transaction) 

  return (
    <div>
      <Successful homeHandler={homeHandler}/>
      
    </div>
  )

}
}

export default index
