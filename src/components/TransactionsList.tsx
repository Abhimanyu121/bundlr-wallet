import { transactionDataKey } from "@/constants";
import React, { useState } from "react";

export function TransactionsList() {
    const [transactionData, setTransactionData] = useState<Array<any>>([]);
    React.useEffect(() => {
        window.addEventListener('storage', () => {
            const txListStr = JSON.parse(localStorage.getItem(transactionDataKey) ?? `{
                "transactions": []
            }`);
            const trxList = JSON.parse(txListStr)['transactions'];
            setTransactionData(trxList as Array<any>)
        })
    }, []);
    return <div>{JSON.stringify(transactionData)}</div>
}