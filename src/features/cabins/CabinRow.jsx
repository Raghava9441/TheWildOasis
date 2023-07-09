import styled from "styled-components";
import { formatCurrency } from '../../utils/helpers'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin, deleteCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { HiSquare2Stack } from "react-icons/hi2";
import { HiPencil } from "react-icons/hi2";
import { HiTrash } from "react-icons/hi2";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  4
  const [showForm, setshowForm] = useState(false)

  const { id: cabinId, name, maxCapacity, regularPrice, discount, image, description } = cabin
  const queryClint = useQueryClient()
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      queryClint.invalidateQueries({
        query: ["cabins"]
      })
      toast.success("Cabin deleted successfully")
    },
    onError: (error) => { toast.error(error.message) }

  })

  const { isLoading: isCopying, mutate: createCopy } = useMutation({
    mutationFn: () => createEditCabin({
      name: `${name} (Copy)`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image
    }),
    onSuccess: () => {
      queryClint.invalidateQueries({
        query: ["cabins"]
      })
      toast.success("Cabin duplicated successfully")
    },
    onError: (error) => { toast.error(error.message) }

  })
  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits ip tp {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{discount}</Discount>
        <div>

          <button onClick={() => setshowForm(show => !showForm)} disabled={isDeleting}><HiPencil /></button>
          <button onClick={() => mutate(cabinId)} disabled={isDeleting}><HiTrash /></button>
          <button onClick={() => createCopy()} disabled={isCopying}><HiSquare2Stack /></button>

        </div>
      </TableRow>
      {
        showForm && <CreateCabinForm cabinToEdit={cabin} />
      }
    </>
  )
}
