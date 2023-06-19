import { transactionDataKey } from "@/constants";

const getTransactions = () => {
    const txList = JSON.parse(localStorage.getItem(transactionDataKey) ?? `{
	    "transactions": []
    }`);
    return txList;

}
const pushTransation = (transaction: any) => {
    const txList: {
        "transactions": []
    } = getTransactions();

    (txList['transactions'] as Array<any>).push(transaction);

    localStorage.setItem(transactionDataKey, JSON.stringify(txList));
    window.dispatchEvent(new Event("storage"));
}

const clearList = (transaction: any) => {
    const txList: {
        "transactions": []
    } = getTransactions();

    (txList['transactions'] as Array<any>).push(transaction);

    localStorage.setItem(transactionDataKey, JSON.stringify({
        "transactions": []
    }))
    window.dispatchEvent(new Event("storage"));
}

const removeElement = (index: number) => {
    const txList: {
        "transactions": []
    } = getTransactions();

    txList.transactions.splice(index, 1);
    localStorage.setItem(transactionDataKey, JSON.stringify(txList))
    window.dispatchEvent(new Event("storage"));
}