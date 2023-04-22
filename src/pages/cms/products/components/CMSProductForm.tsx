import {Product} from "@/model/product";
import {useCloudinary} from "@/shared/";
import clsx from "clsx";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";

export interface CMSProductFormProps {
    activeItem: Partial<Product> | null;
    onClose: () => void;

    onAdd: (product: Partial<Product>) => void,
    onEdit: (product: Partial<Product>) => void
}

const initialState: Partial<Product> = {
    name: '',
    cost: 0,
    description: '',
    tmb: '',
    img: ''
}

export function CMSProductForm(props: CMSProductFormProps) {

    const [formData, setFormData] = useState(initialState);
    const [dirty, setDirty] = useState<boolean>(false);

    const { openWidget } = useCloudinary();

    useEffect(() => {
        if (props.activeItem?.id) {
            setFormData({...props.activeItem,})
        } else {
            setFormData(initialState);
        }

    }, [props.activeItem]);


    function changeHandler(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        const value = e.currentTarget.value;
        const name = e.currentTarget.name;

        setFormData(state => ({...state, [name]: value}));
        setDirty(true);
    }

    function saveHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (props.activeItem?.id) {
            // EDIT
            props.onEdit(formData);
        } else {
            // ADD
            props.onAdd(formData);
        }
        console.log(formData)

    }

    function uploadHandler() {
        openWidget()
            .then(res => {
                // update state
                setFormData( state => ({ ...state, ...res}));
            })
    }

    const isNameValid = formData.name?.length;
    const isCostValid = formData.cost! > 0;
    const isDescriptionValid = formData.description?.length;

    const isValid = isNameValid && isCostValid && isDescriptionValid;

    return (
        <div className=
                 {clsx("fixed bg-slate-200 z-10 text-black top-0 w-96 h-full transition-all  overflow-auto",
                     {'-right-96': !props.activeItem, 'right-0': props.activeItem}
                 )}>


            <form onSubmit={saveHandler}>
                <div className="flex justify-around h-16">
                    <button
                        className="text-white w-1/2 bg-green-500 hover:bg-green-600 disabled:opacity-30 uppercase"
                        disabled={!isValid}
                        type="submit"
                    >save
                    </button>
                    <button
                        className="text-white w-1/2 bg-slate-500 hover:bg-slate-600 uppercase"
                        onClick={props.onClose}
                        type="button"
                    >close
                    </button>
                </div>

                {
                    formData.img &&
                    <img src={formData.img} alt={formData.name} className="w-full"/>
                }
                <div className="flex flex-col gap-3 mx-3 mt-16">
                    Product Name:
                    <input type="text" name="name" value={formData?.name} onChange={changeHandler}
                           className={clsx({'error': !isNameValid && dirty})}
                    />
                    Product Cost:
                    <input type="number" name="cost" value={formData?.cost} onChange={changeHandler}
                           className={clsx({'error': !isCostValid && dirty})}
                    />
                    Product Description:
                    <textarea
                        value={formData.description}
                        name="description"
                        onChange={changeHandler}
                        className={clsx({'error': !isDescriptionValid} && dirty)}
                    />

                    <button className="btn primary" type="button" onClick={uploadHandler}>Upload image</button>
                </div>


            </form>

            <pre>{JSON.stringify(formData, null, 2)}</pre>

        </div>
    )
}