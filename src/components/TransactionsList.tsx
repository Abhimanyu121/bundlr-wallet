import { transactionDataKey } from "@/constants";
import React, { useState } from "react";

export function TransactionsList() {
    const getTrxList = (): Array<any> => {
        const txListStr = JSON.parse(localStorage.getItem(transactionDataKey) ?? `{
                "transactions": []
            }`);
        console.log(txListStr);
        let trxList;
        if (typeof txListStr === 'string') {
            trxList = JSON.parse(txListStr)['transactions'];

        } else {
            trxList = txListStr['transactions'];
        }
        return trxList;
    }
    const [transactionData, setTransactionData] = useState<Array<any>>(getTrxList());

    React.useEffect(() => {
        window.addEventListener('storage', () => {
            const txListStr = JSON.parse(localStorage.getItem(transactionDataKey) ?? `{
                "transactions": []
            }`);
            console.log(txListStr);
            const trxList = getTrxList()
            // const trxList = JSON.parse(txListStr)['transactions'];
            setTransactionData(trxList as Array<any>)
        })
    }, []);
    return <div>{JSON.stringify(transactionData)}</div>
}