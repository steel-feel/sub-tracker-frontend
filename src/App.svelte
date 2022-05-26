<script>
  import { init,selectedTab } from "./lib/stores.js";
  import Tailwind from "./lib/tailwind.svelte";
  import Nav from "./lib/Nav.svelte";
  import Create from "./lib/Create.svelte";
  import Track from "./lib/Track.svelte";

  import { onMount } from "svelte";

  import { web3Enable } from "@polkadot/extension-dapp";

  // this call fires up the authorization popup
let selTab = 'c';
  selectedTab.subscribe(tab => {
    selTab = tab;
  })

  onMount(async () => {
    const extensions = await web3Enable("sub tracker dapp");

    if (extensions.length === 0) {
      // no extension installed, or the user did not accept the authorization
      // in this case we should inform the use and give a link to the extension
      return;
    }

    await init();
  });
</script>

<Tailwind />

<main class="max-w mx-auto ">
  <Nav />
  <div class="pt-4 px-10 pb-12">
    {#if selTab === "c"}
    <Create />
    {:else if selTab === "t"}
    <Track />
    {/if}
  </div>
</main>
