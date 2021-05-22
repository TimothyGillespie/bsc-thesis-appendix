import React from "react";
import {Control, useForm, useWatch} from "react-hook-form";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Panel} from "primereact/panel";
import { For } from "react-loops";
import FormulaAnalyzer from "../utils/FormulaAnalyzer/FormulaAnalyzer";
import {UseFormRegister} from "react-hook-form/dist/types/form";
import { Dropdown } from 'primereact/dropdown';
import {Fieldset} from "primereact/fieldset";
import {Accordion, AccordionTab} from "primereact/accordion";

const StructuralInductionProofs: React.FC = () => {
    const {register, handleSubmit, control} = useForm<FormInputs>();

    const onSubmit = (data: any) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={"p-fluid"}>
                <Fieldset legend={"Statement"} className={"p-mt-2"} toggleable>
                    <span className="p-mt-3 p-field">
                        <label htmlFor="statement">Statement</label>
                        <InputText {...register('statement')}/>
                    </span>
                </Fieldset>
                <Fieldset legend={"Function Definitions"} className={"p-mt-2"} toggleable>
                    <FunctionDefinitions control={control} register={register}/>
                </Fieldset>
                <Fieldset legend={"Variable Definitions"} className={"p-mt-2"} toggleable>
                </Fieldset>
                <Button type={"submit"} label={"Submit"}/>
            </div>
        </form>
    );
};

type FormInputs = {
    statement: string;
    functionDefinitions: {
        name: string;
        parameterCount: number;
        parameterTypes: string[];
        returnType: string;
    }[],
    variableDefinitions: {
       name: string;
       type: string;
    }[]
}

function FunctionDefinitions ({ control, register }: { control: Control<FormInputs>, register: UseFormRegister<FormInputs>}) {
    const statement = useWatch({
        control,
        name: 'statement',
        defaultValue: '',
    });
    return (
        <div>
            <Accordion>
                <AccordionTab header={"depth: Binary Tree -> Integer"}>
                    <div className={"p-grid"}>
                        <div className={"p-col-5"}>
                            <Dropdown options={typeDropdownOptions} className={"p-mt-2"}/>
                            <Dropdown options={typeDropdownOptions} className={"p-mt-2"}/>
                            <Dropdown options={typeDropdownOptions} className={"p-mt-2"}/>
                        </div>
                        <div className={"p-col-2 p-d-flex p-justify-center p-align-center"} style={{fontSize: '33pt'}}>
                            &#x27FC;
                        </div>
                        <div className={"p-col-5"}>
                            <Dropdown options={typeDropdownOptions} className={"p-mt-2"}/>
                        </div>
                    </div>
                </AccordionTab>
            </Accordion>
        </div>

    );
}

const typeDropdownOptions = [
    {label: 'Integer', value: 'Int'},
    {label: 'Binary Tree', value: 'BTree'},
    {label: 'Non-Empty Binary Tree', value: 'NEBTree'},
];

export default StructuralInductionProofs;