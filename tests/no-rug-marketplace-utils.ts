import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ItemBrought,
  ItemCanceled,
  ItemListed,
  ItemRefunded,
  PublicBrought,
  PublicCanceled,
  PublicItemListed,
  WithdrawSucceed
} from "../generated/NoRug_marketplace/NoRug_marketplace"

export function createItemBroughtEvent(
  buyer: Address,
  nftAddress: Address,
  tokenId: BigInt,
  price: BigInt
): ItemBrought {
  let itemBroughtEvent = changetype<ItemBrought>(newMockEvent())

  itemBroughtEvent.parameters = new Array()

  itemBroughtEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  itemBroughtEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  itemBroughtEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  itemBroughtEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return itemBroughtEvent
}

export function createItemCanceledEvent(
  seller: Address,
  nftAddress: Address,
  tokenId: BigInt
): ItemCanceled {
  let itemCanceledEvent = changetype<ItemCanceled>(newMockEvent())

  itemCanceledEvent.parameters = new Array()

  itemCanceledEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  itemCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  itemCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return itemCanceledEvent
}

export function createItemListedEvent(
  seller: Address,
  nftAddress: Address,
  tokenId: BigInt,
  price: BigInt
): ItemListed {
  let itemListedEvent = changetype<ItemListed>(newMockEvent())

  itemListedEvent.parameters = new Array()

  itemListedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return itemListedEvent
}

export function createItemRefundedEvent(
  refunder: Address,
  nftAddress: Address,
  tokenId: BigInt,
  price: BigInt
): ItemRefunded {
  let itemRefundedEvent = changetype<ItemRefunded>(newMockEvent())

  itemRefundedEvent.parameters = new Array()

  itemRefundedEvent.parameters.push(
    new ethereum.EventParam("refunder", ethereum.Value.fromAddress(refunder))
  )
  itemRefundedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  itemRefundedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  itemRefundedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return itemRefundedEvent
}

export function createPublicBroughtEvent(
  buyer: Address,
  nftAddress: Address,
  price: BigInt
): PublicBrought {
  let publicBroughtEvent = changetype<PublicBrought>(newMockEvent())

  publicBroughtEvent.parameters = new Array()

  publicBroughtEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  publicBroughtEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  publicBroughtEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return publicBroughtEvent
}

export function createPublicCanceledEvent(
  seller: Address,
  nftAddress: Address
): PublicCanceled {
  let publicCanceledEvent = changetype<PublicCanceled>(newMockEvent())

  publicCanceledEvent.parameters = new Array()

  publicCanceledEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  publicCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )

  return publicCanceledEvent
}

export function createPublicItemListedEvent(
  seller: Address,
  nftAddress: Address,
  publicSaleCounter: BigInt,
  price: BigInt
): PublicItemListed {
  let publicItemListedEvent = changetype<PublicItemListed>(newMockEvent())

  publicItemListedEvent.parameters = new Array()

  publicItemListedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  publicItemListedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  publicItemListedEvent.parameters.push(
    new ethereum.EventParam(
      "publicSaleCounter",
      ethereum.Value.fromUnsignedBigInt(publicSaleCounter)
    )
  )
  publicItemListedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return publicItemListedEvent
}

export function createWithdrawSucceedEvent(
  owner: Address,
  balance: BigInt
): WithdrawSucceed {
  let withdrawSucceedEvent = changetype<WithdrawSucceed>(newMockEvent())

  withdrawSucceedEvent.parameters = new Array()

  withdrawSucceedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  withdrawSucceedEvent.parameters.push(
    new ethereum.EventParam(
      "balance",
      ethereum.Value.fromUnsignedBigInt(balance)
    )
  )

  return withdrawSucceedEvent
}
