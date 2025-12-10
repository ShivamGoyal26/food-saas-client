"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useDeleteAddress } from "../hooks";
import { AddressResponse } from "../api";
import { useState } from "react";
import UpdateAddress from "./update-address";

type AddressItemProps = {
  address: AddressResponse;
};

export default function AddressItem({ address }: AddressItemProps) {
  const { mutate: deleteAddress, isPending } = useDeleteAddress();
  const [editOpen, setEditOpen] = useState(false);

  const handleDelete = () => {
    deleteAddress(address._id);
  };

  return (
    <div className="border p-4 rounded-md w-full">
      {editOpen && (
        <UpdateAddress address={address} onClose={() => setEditOpen(false)} />
      )}
      <div>
        <p>
          {address.street}, {address.city}, {address.state}, {address.country} -{" "}
          {address.pincode}
        </p>
        {address.primary && (
          <span className="text-green-500 text-sm">Primary</span>
        )}
      </div>
      <Button onClick={() => setEditOpen(true)}>Edit</Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Trash2 className="size-4 text-red-500" />
        )}
      </Button>
    </div>
  );
}
