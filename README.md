# sub-tracker-frontend
Front end 🖥️ for Shipment tracking system built on top of blockchain powered by **Substrate** . 

**Built using**
- [PolkadotJS](https://polkadot.js.org/docs/)
- [Svelte](https://svelte.dev)

## Pre-requisite
PolkadotJS extention 
- [Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd) 
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/)

## How To Use

### Adding Transit Nodes 
New nodes can only be added via Sudo. Adding of nodes require two input arguments:
1. Account Id of the transit node to be added
2. Vector of Account Id and Cost pairings. This vector defines the cost of the route between the new node and existing nodes. i.e. The neighbours of the node to be added
Note: This function will fail on multiple scenarios:
    a. Call is not made by sudo
    b. Node has already been added
    c. Account Id of node to be added is included in the vector
    d. Account Id of any node in vector has not been added as a transit node

### Removing Transit Nodes
Nodes can only be removed via Sudo. Removing of nodes require one input argument:
1. Account Id of transit node to be removed
Note: This function will fail on multiple scenarios:
    a. Call is not made by sudo
    b. Node has not been added as a transit node

### Updating Neighbour Costs
Updating of neighbouring nodes cost can only be done via Sudo. Updating of neighbours require three input arguments:
1. Account Id of first transit node
2. Account Id of second transit node
3. Cost of route between the two specified nodes
Note: This function will fail if any one of the account ids have not been added as a transit node

### Creating Shipments
Shipments can be created via signed transactions by any transit node. Shipment routes are defaulted to begin at the transit node that created the shipment. Creating of shipments require one input argument:
1. Destination of the shipment. The most cost efficient route will then be computed based on the source and destination of the shipment
![Create Shipment](./docs/images/Sc1.png)


### Track Shipment
Shipment current status with trasist routes can be checked by track shipment tab. User need to provide the Shipment UID.
![Track Shipment](./docs/images/sc2.png)

### Updating Shipments
Shipments can be updated via signed transactions by the current receiver of a shipment.In order to receive shipment need to pass Key along with Shipment UID. Key is fetched for the user in back-ground from front-end so user only need to enter Shipment UID.
1. Shipment UID
Note: This function will fail on multiple scenarios:
    a. Call is not made by current receiver of shipment
    b. Shipment UID could not be found



## App Screen shots


**Create Shipment**


**Track Shipment**



## Installation

`
npm i
`

## Run

`
npm run dev
`