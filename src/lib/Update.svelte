<script>
    import { web3FromAddress } from "@polkadot/extension-dapp";
    import { api, account } from "./stores.js";
    import Modal from "./Modal.svelte";

    let shipId = "",
        oAccount;

    let showModal = false,
        error = "",
        title = "Error!";

    account.subscribe((sAccount) => {
        if (!!sAccount) oAccount = JSON.parse(sAccount);
        else return;
        origin = oAccount.address;

        console.log(oAccount);
    });

    const handleToggleModal = () => {
        showModal = !showModal;
    };

    async function res(data) {
        console.log("result", data);
        if (data.status.isFinalized) 
          showDialog("Success","Shipment updated successfully");
    }

    function showDialog(stitle, sContent) {
        showModal = true;
        title = stitle || "Error";
        error = sContent || "Transaction Failed, Try again or connect with Admin";
    }

    const txErrHandler = (err) => {
        throw new Error(`😞 Transaction Failed: ${err.toString()}`);
    };

    async function fetchKey() {
        const result = await api.query.assetTracking.uidToKey(shipId);

        let sResult = result.toString();

        if (sResult.length === 0) {
            showDialog("Error", "Key not found")
            return false ;
        }

        return sResult;
    }

    async function updateShipment() {
        let key = await fetchKey();

        if(!key) return;

        const ctxn = api.tx.assetTracking.updateShipment(shipId, key);

        const SENDER = oAccount.address;

        // finds an injector for an address
        const injector = await web3FromAddress(SENDER);

        ctxn.signAndSend(SENDER, { signer: injector.signer }, res).catch(
            txErrHandler
        );
    }
</script>

<Modal
    open={showModal}
    content={error}
    {title}
    on:close={() => handleToggleModal()}
/>

<div class="relative">
    <label for="name-with-label" class="text-gray-700"> Shipment ID </label>
    <input
        type="text"
        bind:value={shipId}
        id="name-with-label"
        class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        placeholder="Shipment ID"
    />
    <a
        on:click={updateShipment}
        class="cursor-pointer py-2 px-4 bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
    >
        Update Shipment
    </a>
</div>
