import React from "react";
import {Control, useForm, useWatch} from "react-hook-form";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Panel} from "primereact/panel";
import { For } from "react-loops";
import FormulaAnalyzer from "../utils/FormulaAnalyzer/FormulaAnalyzer";

const StructuralInductionProofs: React.FC = () => {
    const {register, handleSubmit, control} = useForm<FormInputs>();

    const onSubmit = (data: any) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={"p-fluid"}>
                <Panel header={"Statement"} toggleable>
                    <span className="p-mt-3 p-field">
                        <label htmlFor="statement">Statement</label>
                        <InputText {...register('statement')}/>
                    </span>
                </Panel>
                <Panel header={"Function Definitions"} toggleable>
                    <FunctionDefinitions control={control}/>
                </Panel>
                <Panel header={"Variable Definitions"} toggleable>
                </Panel>
                <Button type={"submit"} label={"Submit"}/>
            </div>
        </form>
    );
};

interface FormInputs {
    statement: string;
}

function FunctionDefinitions ({ control }: { control: Control<FormInputs> }) {
    const statement = useWatch({
        control,
        name: 'statement',
        defaultValue: '',
    });
    return (
        <div>
            <For of={Object.entries(new FormulaAnalyzer(statement).getFunctions())} as={([name, info]) =>
                <p>{name}: {info.parameterCount}</p>
            }/>
        </div>

    );
}

export default StructuralInductionProofs;