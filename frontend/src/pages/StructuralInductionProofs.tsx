import React from "react";
import {useForm} from "react-hook-form";
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import {Button} from "primereact/button";

const StructuralInductionProofs: React.FC = () => {
    const {register, handleSubmit, formState: {errors} } = useForm();

    const onSubmit = (data: any) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <span className="p-float-label">
                <InputText id="username" {...register('test')}/>
                <label htmlFor="username">Username</label>
            </span>
            <Button type={"submit"} label={"Submit"}/>
        </form>
    );
};

export default StructuralInductionProofs;