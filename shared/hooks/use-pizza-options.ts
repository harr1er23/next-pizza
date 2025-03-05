import React from "react";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { Variant } from "../components/shared/group-variants";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../lib";
import { ProductVariation } from "@prisma/client";

interface ReturnProps {
    size: PizzaSize;
    type: PizzaType;
    availableSizes: Variant[];
    selectedIngredients: Set<number>;
    setSize: (size: PizzaSize) => void;
    setType: (type: PizzaType) => void;
    addIngredient: (id: number) => void;
}

export const usePizzaOptions = (variations: ProductVariation[]): ReturnProps => {
    const [size, setSize] = React.useState<PizzaSize>(20);
    const [type, setType] = React.useState<PizzaType>(1);
    const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));
    const availableSizes = getAvailablePizzaSizes(type, variations);


    React.useEffect(() => {
        const isAvailableSize = availableSizes?.find(item => Number(item.value) === size && !item.disabled);
        const availableSize = availableSizes?.find(item => !item.disabled)

        if(availableSize && !isAvailableSize) {
            setSize(Number(availableSize.value) as PizzaSize);
        }
    }, [type])

    return {
        size,
        type,
        availableSizes,
        selectedIngredients,
        setSize,
        setType,
        addIngredient
    }
}