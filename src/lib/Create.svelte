<script>
    import { web3FromAddress } from "@polkadot/extension-dapp";

    import { api, account } from "./stores.js";
    //5ELYpLZ1giTH1PCxzPTUrFdLKPShBkNedo3mTEcnL3me16FA
    //5Ek3sMQUcAnxJMEHWxQ2pagFbZSDeXabGSJMTkbcxyapvaRL
    //5FCtwmV2WVpJw72hVZt912gs3ddq3Y7xcLtM1ZLTEJu4duVk
    let routes = [
        // {from:"Delhi", to:"Seoul"}
    ];

    let origin = "",
        destination = "";

    let oAccount;

    //sample code
    let run = false;
    async function res(data) {
        console.log("result", data);
        if (data.status.isFinalized) alert("Shipment created successfully");
    }
    const txErrHandler = (err) => {
        throw new Error(`😞 Transaction Failed: ${err.toString()}`);
    };

    account.subscribe((sAccount) => {
        if (!!sAccount)
             oAccount = JSON.parse(sAccount);
        else
            return;
        origin = oAccount.address;
        
        console.log(oAccount);
    });

    async function checkApi() {
        if (!api) return;

        run = true;
    }

    if (!run) setTimeout(checkApi, 5000);

    async function handleSave() {
        if (!api || routes.length < 3 ) return;


        const ctxn = api.tx.assetTracking.createShipment(destination);

        const SENDER = oAccount.address;

        // finds an injector for an address
        const injector = await web3FromAddress(SENDER);

        ctxn.signAndSend(SENDER, { signer: injector.signer }, res).catch(
            txErrHandler
        );
    }

    async function calcRoute() {
        if(origin !== "5ELYpLZ1giTH1PCxzPTUrFdLKPShBkNedo3mTEcnL3me16FA"  || destination !== "5FCtwmV2WVpJw72hVZt912gs3ddq3Y7xcLtM1ZLTEJu4duVk") return;

        routes = [
            "5ELYpLZ1giTH1PCxzPTUrFdLKPShBkNedo3mTEcnL3me16FA",
            "5Ek3sMQUcAnxJMEHWxQ2pagFbZSDeXabGSJMTkbcxyapvaRL",
            "5FCtwmV2WVpJw72hVZt912gs3ddq3Y7xcLtM1ZLTEJu4duVk",
        ];

    }

</script>

<div class="mt-5 md:mt-0 md:col-span-2">
    <form >
        <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-4">
                        <label
                            for="email-address"
                            class="block text-sm font-medium text-gray-700"
                            >Shipment Name</label
                        >
                        <input
                            type="text"
                            name="name"
                            id="email-address"
                            autocomplete="email"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label
                            for="Origin"
                            class="block text-sm font-medium text-gray-700"
                            >Origin</label
                        >
                        <input
                            on:change={calcRoute}
                            bind:value={origin}
                            type="text"
                            name="Origin"
                            id="Origin"
                            autocomplete="given-name"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                        <label
                            for="Destination"
                            class="block text-sm font-medium text-gray-700"
                            >Destination</label
                        >
                        <input
                            on:change={calcRoute}
                            bind:value={destination}
                            type="text"
                            name="Destination"
                            id="Destination"
                            autocomplete="family-name"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <input
                    value="Create Shipment"
                    on:click={handleSave}
                    type="button"
                    class="cursor-pointer inline-flex justify-center py-2 px-4 border
          shadow-sm text-sm font-medium rounded-md text-black bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    />
            </div>
        </div>
    </form>
</div>
