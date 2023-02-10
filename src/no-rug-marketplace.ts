import { BigInt, Address,Bytes } from "@graphprotocol/graph-ts";
import {
  ItemBrought as ItemBroughtEvent,
  ItemCanceled as ItemCanceledEvent,
  ItemListed as ItemListedEvent,
  ItemRefunded as ItemRefundedEvent,
  PublicBrought as PublicBroughtEvent,
  PublicCanceled as PublicCanceledEvent,
  PublicItemListed as PublicItemListedEvent,
} from "../generated/NoRug_marketplace/NoRug_marketplace";
import {
  PublicActiveItem,
  ActiveItem,
  ItemBrought,
  ItemCanceled,
  ItemListed,
  ItemRefunded,
  PublicBrought,
  PublicCanceled,
  PublicItemListed,
} from "../generated/schema";

export function handleItemBrought(event: ItemBroughtEvent): void {
  let itemBrought = ItemBrought.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );

  let ActiveItemEntity = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );

  if (!itemBrought) {
    itemBrought = new ItemBrought(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  itemBrought.buyer = event.params.buyer;
  itemBrought.nftAddress = event.params.nftAddress;
  itemBrought.tokenId = event.params.tokenId;
  itemBrought.price = event.params.price;

  ActiveItemEntity!.buyer = event.params.buyer;

  itemBrought.save();
  ActiveItemEntity!.save();
}

export function handleItemCanceled(event: ItemCanceledEvent): void {
  let itemCanceled = ItemCanceled.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  if (!itemCanceled) {
    itemCanceled = new ItemCanceled(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  itemCanceled.seller = event.params.seller;
  itemCanceled.nftAddress = event.params.nftAddress;
  itemCanceled.tokenId = event.params.tokenId;
  activeItem!.buyer = Address.fromString(
    "0x000000000000000000000000000000000000dEaD"
  );

  itemCanceled.save();
  activeItem!.save();
}

export function handleItemListed(event: ItemListedEvent): void {
  let itemListed = ItemListed.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  if (!itemListed) {
    itemListed = new ItemListed(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  if (!activeItem) {
    activeItem = new ActiveItem(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  itemListed.seller = event.params.seller;
  activeItem.seller = event.params.seller;

  itemListed.nftAddress = event.params.nftAddress;
  activeItem.nftAddress = event.params.nftAddress;

  itemListed.tokenId = event.params.tokenId;
  activeItem.tokenId = event.params.tokenId;

  itemListed.price = event.params.price;
  activeItem.price = event.params.price;

  activeItem.buyer = Address.fromString(
    "0x0000000000000000000000000000000000000000"
  );

  itemListed.save();
  activeItem.save();
}

export function handleItemRefunded(event: ItemRefundedEvent): void {
  let itemRefunded = ItemRefunded.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );

  if (!itemRefunded) {
    itemRefunded = new ItemRefunded(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  
  itemRefunded.refunder = event.params.refunder;
  itemRefunded.nftAddress = event.params.nftAddress;
  itemRefunded.tokenId = event.params.tokenId;
  itemRefunded.price = event.params.price;
  itemRefunded.save();
}

export function handlePublicBrought(event: PublicBroughtEvent): void {
  let publicBrought = PublicBrought.load(
    getIdFromPublicEventParams(event.params.nftAddress, event.transaction.hash)
  );

  if (!publicBrought) {
    publicBrought = new PublicBrought(
      getIdFromPublicEventParams(event.params.nftAddress, event.transaction.hash)
    );
  }
  
  publicBrought.buyer = event.params.buyer;
  publicBrought.nftAddress = event.params.nftAddress;
  publicBrought.price = event.params.price;
  publicBrought.transactionHash = event.transaction.hash;
  publicBrought.save();
}

export function handlePublicCanceled(event: PublicCanceledEvent): void {
  let publicCanceled = PublicCanceled.load(
    getIdFromPublicEventParams(event.params.nftAddress, event.transaction.hash)
  );
  let publicActiveItem = PublicActiveItem.load(
    getIdFromAddressParams(event.params.nftAddress)
  );

  if (!publicCanceled) {
    publicCanceled = new PublicCanceled(
      getIdFromPublicEventParams(event.params.nftAddress, event.transaction.hash)
    );
  }
  if(publicActiveItem){
    publicActiveItem.status = "Null";
    publicActiveItem.save();
  } 
  publicCanceled.seller = event.params.seller;
  publicCanceled.nftAddress = event.params.nftAddress;
  publicCanceled.save();
  
}

export function handlePublicItemListed(event: PublicItemListedEvent): void {
  let publicItemListed = PublicItemListed.load(
    getIdFromSalesCounter(event.params.publicSaleCounter)
  );
  if (!publicItemListed) {
    publicItemListed = new PublicItemListed(
      getIdFromSalesCounter(event.params.publicSaleCounter)
    );
  }

  let publicActiveItem = PublicActiveItem.load(
    getIdFromAddressParams(event.params.nftAddress)
  );
  if (!publicActiveItem) {
    publicActiveItem = new PublicActiveItem(
      getIdFromAddressParams(event.params.nftAddress)
    );
  }

  publicItemListed.seller = event.params.seller;
  publicItemListed.publicSaleCounter = event.params.publicSaleCounter
  publicItemListed.nftAddress = event.params.nftAddress;
  publicItemListed.price = event.params.price;

  publicActiveItem.seller = event.params.seller;
  publicActiveItem.publicSaleCounter = event.params.publicSaleCounter
  publicActiveItem.nftAddress = event.params.nftAddress;
  publicActiveItem.price = event.params.price;
  publicActiveItem.status = "Active";

  publicItemListed.save();
  publicActiveItem.save();
}


function getIdFromEventParams(tokenId: BigInt, nftAddress: Address): string {
  return tokenId.toHexString() + nftAddress.toHexString();
}

function getIdFromPublicEventParams(userAddress: Address, transactionHash: Bytes): string {
  return userAddress.toHexString() + transactionHash.toHexString();
}

function getIdFromSalesCounter(salesCounter: BigInt): string {
  return salesCounter.toHexString();
}

function getIdFromAddressParams(userAddress: Address): string {
  return userAddress.toHexString();
}
