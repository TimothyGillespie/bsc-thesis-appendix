import React from "react";
import {useForm} from "react-hook-form";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Panel} from "primereact/panel";

const StructuralInductionProofs: React.FC = () => {
    const {register, handleSubmit} = useForm();

    const onSubmit = (data: any) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Panel header={"Statement"} toggleable>
                <span className="p-float-label">
                    <InputText id="statement" {...register('')}/>
                    <label htmlFor="statement">Statement</label>
                </span>
            </Panel>
            <Panel header={"Function Definitions"} toggleable>

            </Panel>
            <Panel header={"Variable Definitions"} toggleable>
            </Panel>
            <Button type={"submit"} label={"Submit"}/>
        </form>
    );
};

export default StructuralInductionProofs;