<script>
    import { bBusy } from "./stores.js";

    let busy = false;
    let busyRunning = false;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    async function updateBusy(x) {
        if (busyRunning) {
            setTimeout(updateBusy, 50,x );
            return;
        }

        busy = x;

        if (busy) {
            busyRunning = true;
            await sleep(500);
            busyRunning = false;
        }
    }

    bBusy.subscribe(updateBusy);
</script>

{#if busy}
    <div class:LoadingIndicator={busy}>Querying Blockchain</div>
{/if}

<style>
    .LoadingIndicator {
        display: flex;
        background: rgba(0, 0, 0, 0.2);
        justify-content: center;
        align-items: center;
        text-align: center;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 20;
        font-size: xx-large;
    }
</style>
