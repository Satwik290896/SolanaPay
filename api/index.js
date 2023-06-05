//@ts-check

import { PublicKey, Keypair, Connection, Transaction, TransactionInstruction, SystemProgram } from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount, ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID  } from '@solana/spl-token';
import bs58 from 'bs58';
import dotenv from 'dotenv';
import {sha256} from 'js-sha256';
import {encode, decode} from '@codec-bytes/base16';

dotenv.config();
const connection = new Connection('https://api.devnet.solana.com','confirmed');
const GOLD_TOKEN_MINT = new PublicKey('goLdQwNaZToyavwkbuPJzTt5XPNR3H7WQBGenWtzPH3');
//let array = (process.env.PAYER).split(/[.,!,?,;]/);
//console.log("Array: " + array);
//const payer_string = bs58.encode([130,144,40,101,123,55,184,214,65,21,219,157,157,157,58,52,89,189,244,208,194,93,117,205,195,60,161,36,166,7,173,147,196,164,102,187,97,172,30,114,211,234,5,205,133,99,167,160,61,49,237,231,117,145,164,62,83,12,65,22,208,62,142,244]);

const SEVEN_SEAS_PROGRAM = new PublicKey('2a4NcnkF5zf14JQXHAv39AsRf7jMFj13wKmTL6ZcDQNd');

/*If You are using Private key Array*/
//const payer = Keypair.fromSecretKey(Uint8Array.from(process.env.PAYER));

/*If You are using Private key string*/
const payer = Keypair.fromSecretKey(bs58.decode(process.env.PAYER));
//console.log("Payer: " + payer_string);
// api/index.js
/**
 * @typedef {import('@vercel/node').VercelResponse} VercelResponse
 * @typedef {import('@vercel/node').VercelRequest} VercelRequest
 *
 * @param {VercelRequest} request
 * @param {VercelResponse} response
 * @returns {Promise<VercelResponse>}
 * */

/**
 * @param {VercelResponse} response
 */
function handleGet(response) {
  console.log(sha256("global:cthulhu").slice(0,16));
  console.log("BS58 Decode - " + decode(sha256("global:cthulhu").slice(0,16)));
  console.log("Buffer.from: " + Buffer.from(sha256.digest("global:cthulhu")).slice(0, 8));
  return response.status(200).json({
    label: 'Chutulu Fire!',
    icon: 'https://github.com/solana-developers/pirate-bootcamp/blob/main/assets/kraken-1.png?raw=true',
  });
}

/**
 * @param {VercelRequest} request
 * @param {VercelResponse} response
 */
async function handlePost(request, response) {
  //console.log('account', request.body .account);

  const player = new PublicKey(request.body.account);
  const chutuluIX = await createChutuluIx(player);
  const transaction = await prepareTx(chutuluIX);

  return response.status(200).json({
    transaction,
    message: 'Chutulu Fire!',
  });
}



export default async function handler(request, response) {
  console.log('handling request', request.method);

  if (request.method === 'GET') {
    return handleGet(response);
  }
  else if (request.method === 'POST') {
      return handlePost(request, response);
  }
  else{
    return response.status(405).json({ error: 'Method not allowed' });
  }
  //return response.status(200).json({});
}


/**
 * @param {TransactionInstruction} ix
 */
async function prepareTx(ix) {
  let tx = new Transaction().add(ix);
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
  tx.feePayer = payer.publicKey;

  tx.partialSign(payer);

  tx = Transaction.from(
      tx.serialize({
        verifySignatures: false,
        requireAllSignatures: false,
      }),
    );
  
    const serializedTx = tx.serialize({
      verifySignatures: false,
      requireAllSignatures: false,
    });
    // end: dance
  
    return serializedTx.toString('base64');
}


/**
 * @typedef {import('@solana/spl-token').Account} Account
 *
 * @param {PublicKey} player
 * @returns {Promise<TransactionInstruction>}
 */
async function createChutuluIx(player) {
  // get player's GOLD token account
  const playerTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    GOLD_TOKEN_MINT,
    player
  );
  // get accounts for chutuluIX
  // start: get program derived addresses
  const [level] = PublicKey.findProgramAddressSync([Buffer.from('level')], SEVEN_SEAS_PROGRAM);
  const [chestVault] = PublicKey.findProgramAddressSync(
    [Buffer.from('chestVault')],
    SEVEN_SEAS_PROGRAM,
  );

  const [gameActions] = PublicKey.findProgramAddressSync(
      [Buffer.from('gameActions')],
      SEVEN_SEAS_PROGRAM,
    );

  let [tokenAccountOwnerPda] = await PublicKey.findProgramAddressSync(
    [Buffer.from('token_account_owner_pda', 'utf8')],
    SEVEN_SEAS_PROGRAM,
  );

  let [tokenVault] = await PublicKey.findProgramAddressSync(
    [Buffer.from('token_vault', 'utf8'), GOLD_TOKEN_MINT.toBuffer()],
    SEVEN_SEAS_PROGRAM,
  );
  // end: get program derived addresses


  const send_t = (sha256.digest('global:cthulhu').slice(0, 8));
  send_t.push(1);
  const send_buf = Buffer.from(send_t);
  // return the instruction
  return new TransactionInstruction({
      programId: SEVEN_SEAS_PROGRAM,
      keys: [
        {
          pubkey: chestVault,
          isWritable: true,
          isSigner: false,
        },
        {
          pubkey: level,
          isWritable: true,
          isSigner: false,
        },
        {
          pubkey: gameActions,
          isWritable: true,
          isSigner: false,
        },
        {
          pubkey: player,
          isWritable: true,
          isSigner: true,
        },
        {
          pubkey: SystemProgram.programId,
          isWritable: false,
          isSigner: false,
        },
        {
          pubkey: player,
          isWritable: false,
          isSigner: false,
        },
        {
          pubkey: playerTokenAccount.address,
          isWritable: true,
          isSigner: false,
        },
        {
          pubkey: tokenVault,
          isWritable: true,
          isSigner: false,
        },
        {
          pubkey: tokenAccountOwnerPda,
          isWritable: true,
          isSigner: false,
        },
        {
          pubkey: GOLD_TOKEN_MINT,
          isWritable: false,
          isSigner: false,
        },
        {
          pubkey: TOKEN_PROGRAM_ID,
          isWritable: false,
          isSigner: false,
        },
        {
          pubkey: ASSOCIATED_TOKEN_PROGRAM_ID,
          isWritable: false,
          isSigner: false,
        },
      ],
      data: send_buf, //Buffer.from(sha256("global:cthulhu").slice(0,16)),
    });
}


