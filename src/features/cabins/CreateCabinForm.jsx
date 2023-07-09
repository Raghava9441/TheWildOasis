import { toast } from "react-hot-toast";
import { DevTool } from "@hookform/devtools";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { createEditCabin } from "../../services/apiCabins";

function CreateCabinForm({ cabinToEdit = {} }) {
    const { id: editId, ...editValues } = cabinToEdit

    const isEditSession = Boolean(editId)

    const { register, handleSubmit, control, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValues : {}
    })

    const { errors } = formState
    const queryClint = useQueryClient()


    const { isLoading: isCreating, mutate: createCabin } = useMutation({
        mutationFn: (newCabin) => createEditCabin(newCabin),
        onSuccess: () => {
            queryClint.invalidateQueries({
                query: ["cabins"]
            }),
                reset()
            toast.success("Cabin Created successfully")
        },
        onError: (error) => { toast.error(error.message) }
    })

    const { isLoading: isEditing, mutate: EditCabin } = useMutation({
        mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
        onSuccess: () => {
            queryClint.invalidateQueries({
                query: ["cabins"]
            }),
                reset()
            toast.success("Cabin successfully Edited")
        },
        onError: (error) => { toast.error(error.message) }
    })

    const isWorking = isEditing || isCreating
    function onSubmit(data) {
        const image = typeof data.image === "string" ? data.image : data.image[0];

        if (isEditSession) EditCabin({ newCabinData: { ...data, image }, id: editId })
        else createCabin({ ...data, image: image })
    }


    function onError(errors) {
        // console.log("errors:", errors)

    }
    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit, onError)}>
                <FormRow label="Cabin name" error={errors?.name?.message}>
                    <Input type="text" id="name" disabled={isWorking} {...register('name', {
                        required: "name field is required",
                    })} />
                </FormRow>

                <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
                    <Input type="number" id="maxCapacity" disabled={isWorking} {...register('maxCapacity', {
                        required: "maxCapacity field is required",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1"
                        }
                    })} />
                </FormRow>

                <FormRow label="Regular price" error={errors?.regularPrice?.message}>
                    <Input type="number" id="regularPrice" disabled={isWorking} {...register("regularPrice", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },
                    })}
                    />
                </FormRow>

                <FormRow label="Discount" error={errors?.discount?.message}>
                    <Input type="number" id="discount" defaultValue={0} disabled={isWorking} {...register("discount", {
                        required: "This field is required",
                        validate: (value) =>
                            value <= getValues().regularPrice ||
                            "Discount should be less than regular price",
                    })}
                    />
                </FormRow>

                <FormRow label="Description for website" error={errors?.description?.message}>
                    <Textarea type="number" id="description" defaultValue="" disabled={isWorking}  {...register('description', {
                        required: "description field is required"
                    })} />
                </FormRow>

                <FormRow label="Cabin photo" error={errors?.image?.message} >
                    <FileInput id="image" accept="image/*" {...register('image', {
                        required: isEditSession ? false : "This field is required"
                    })} />
                </FormRow>

                <FormRow>
                    <Button variation="secondary" type="reset">
                        Cancel
                    </Button>
                    <Button disabled={isWorking}>{isEditSession ? "Edit cabin" : "Create New Cabin"}</Button>
                </FormRow>
            </Form>
            <DevTool control={control} />
        </>
    );
}

export default CreateCabinForm;
