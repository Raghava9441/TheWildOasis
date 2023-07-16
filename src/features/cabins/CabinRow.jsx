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
import Model from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete"
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
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
            <Table.Row role="row">
                <Img src={image} />
                <Cabin>{name}</Cabin>
                <div>Fits ip tp {maxCapacity} guests</div>
                <Price>{formatCurrency(regularPrice)}</Price>
                <Discount>{formatCurrency(discount)}</Discount>
                <div>
                    <Model>
                        <Menus>
                            <Menus.Toggle id={cabinId} />
                            <Menus.List id={cabinId} >
                                <Menus.Button onClick={() => createCopy()} icon={<HiSquare2Stack />} >Duplicate</Menus.Button>

                                <Model.Open opens="edit">
                                    <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                                </Model.Open>

                                <Model.Open opens="delete">
                                    <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                                </Model.Open>
                            </Menus.List>
                        </Menus>

                        <Model.Window name="edit">
                            <CreateCabinForm cabinToEdit={cabin} />
                        </Model.Window>

                        <Model.Window name="delete">
                            <ConfirmDelete resourceName="cabin" disabled={isDeleting} onConfirm={() => mutate(cabinId)} />
                        </Model.Window>

                    </Model>

                </div>
            </Table.Row>
        </>
    )
}