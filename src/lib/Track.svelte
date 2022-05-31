<script>
    import { api, account, bBusy } from "./stores.js";
    import Busy from "./Busy.svelte";
    import Modal from "./Modal.svelte";

    let routes = [];
    let ownerIndex = 0;
    let showModal = false;
    let error = "";
    let shipId = "",
        status = "",
        origin = "",
        destination = "";
    let title;

    const handleToggleModal = () => {
        showModal = !showModal;
    };
    let sResult = "";
    async function trackShipment() {
        //const now = await api.query.timestamp.now();
        console.log(typeof shipId, api.query.assetTracking.uidToShipment);

        await bBusy.update((x) => true);

        const result = await api.query.assetTracking.uidToShipment(shipId);

        await bBusy.update((x) => false);

        sResult = result.toString();

        if (sResult.length == 0) {
            routes = [];
            ownerIndex = 0;
            origin = "";
            destination = "";
            status = "";

            //Show alert
            showModal = true;
            title="Error!";
            error = "Shipment not found";

            return;
        }
        const oRes = JSON.parse(result.toString());

        routes = oRes.route;
        ownerIndex = oRes.ownerIndex;
        origin = oRes.creator;
        destination = oRes.destination;
        status = oRes.status;
    }
</script>

<Busy />

<Modal
    open={showModal}
    content={error}
    {title}
    on:close={() => handleToggleModal()}
>
</Modal>

<div class="relative">
    <label for="name-with-label" class="text-gray-700"> Shipment ID </label>
    <input
        type="text"
        bind:value={shipId}
        id="name-with-label"
        class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        placeholder="Shipment ID"
    />
    <!-- <input type="button"  value="track Shipment" /> -->

    <a
        on:click={trackShipment}
        class="cursor-pointer py-2 px-4 bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
    >
        Track Shipment
    </a>
</div>
{#if sResult.length > 0}
<div class="text-base font-bold grid grid-cols-2 gap-4">
    <div class="my-4">
        Status <span
            class:bg-yellow-200={status === "InTransit"}
            class:bg-green-200={status === "Delivered"}
            class="px-4 py-2 m-3 text-base rounded-full    "
        >
            {status}
        </span>
    </div>
    <div />
    <div>Origin <span class="font-normal">{origin}</span></div>
    <div>Destination <span class="font-normal"> {destination}</span></div>
</div>

<div class="w-1/2 my-5 text-base font-bold">
    Trasist Points
    <div
        class="container flex flex-col mx-auto items-start justify-center bg-white  rounded-lg shadow"
    >
        <ul class="flex my-3 flex-col divide divide-y">
            {#each routes as route, i}
                <li
                    class:bg-indigo-100={ownerIndex - 1 == i}
                    class="flex  flex-row"
                >
                    <div class="select-none flex flex-1 items-center p-4">
                        <div class="flex-1 pl-1 ">
                            <div class="font-medium ">
                                <span>
                                    ( {i + 1} )
                                </span>
                                {route}
                            </div>
                            {#if ownerIndex - 1 == i}
                                <div class="text-base">
                                    <span />
                                    Item is here
                                </div>
                            {/if}
                            <!-- {#if ownerIndex == 0 && i == routes.length - 1}
                            <div class="text-sm">Item delivered</div>
                            {/if} -->
                        </div>
                    </div>
                </li>
            {/each}
        </ul>
    </div>
</div>
{/if}