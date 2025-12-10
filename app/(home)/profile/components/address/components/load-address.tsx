"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddAddress from "./add-address";
import { AddressResponse } from "../api";
import AddressItem from "./address-item";

type LoadAddressProps = {
  addresses: AddressResponse[];
};

export default function LoadAddress({ addresses }: LoadAddressProps) {
  const [isAddAdressComponentVisible, setIsAddAddressComponentVisible] =
    useState(false);

  return (
    <div>
      <div>Address</div>
      {addresses.length > 0 ? (
        addresses.map((address: AddressResponse) => (
          <AddressItem key={address._id} address={address} />
        ))
      ) : (
        <div>No addresses found.</div>
      )}

      <div className="flex flex-col gap-4">
        <Button onClick={() => setIsAddAddressComponentVisible((pre) => !pre)}>
          Add Address
        </Button>
      </div>

      {isAddAdressComponentVisible && <AddAddress />}
    </div>
  );
}
