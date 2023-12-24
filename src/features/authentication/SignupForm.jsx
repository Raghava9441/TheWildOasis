import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from '../../services/apiAuth';
import { toast } from "react-hot-toast";
import { useSignup } from "./useSignup";

function SignupForm() {
    const { register, formState, getValues, handleSubmit, reset } = useForm();
    const { errors } = formState;
    const { signup, isLoading } = useSignup();

    const onSubmit = (formData) => {
        const { fullName, email, password } = formData
        signup({ fullName, email, password }, {
            onSettled: () => reset(),
        });
    };


    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Full name" error={errors?.fullName?.message}>
                <Input type="text" id="fullName" {...register("fullName", { required: "this field is required" })} disabled={isLoading} />
            </FormRow>

            <FormRow label="Email address" error={errors?.email?.message}>
                <Input type="email" id="email" {...register("email", { required: "this field is required", pattren: { value: " /\S+@\S+\.\S+/", message: "please Provide valid email adress" } })} disabled={isLoading} />
            </FormRow>

            <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
                <Input type="password" id="password" {...register("password", { required: "this field is required", minLength: { value: 8, message: "password needs a minimum of 8 characters" } })} disabled={isLoading} />
            </FormRow>

            <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
                <Input type="password" id="passwordConfirm" {...register("passwordConfirm", { required: "this field is required", validate: (value) => value === getValues().password || "passwords needs to match" })} disabled={isLoading} />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button type="submit" isLoading={isLoading}>Create new user</Button>
            </FormRow>
        </Form>
    );
}

export default SignupForm;
