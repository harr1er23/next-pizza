import { cn } from "@/shared/lib/utils";
import { Input } from "../../ui";
import { RequiredSymbol } from "../required-symbol";
import { ErrorText } from "../error-text";
import { ClearButton } from "../clear-button";

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export const FormInput: React.FC<Props> = ({
    name,
    className,
    label,
    required,
    ...props
}) => {
    const onClickClear = () => {
        console.log(1);
    }

    return (
        <div className={cn(className, '')}>
            {label && (
                <p className="font-medium mb-2">
                    {label} {required && <RequiredSymbol />}
                </p>
            )}

            <div className="relative">
                <Input className={cn('h-12 text-md', className)} {...props}/>

                <ClearButton onClick={onClickClear}/>
            </div>

            <ErrorText text="Поле обязательно для заполнения"  className="mt-2"/>
        </div>
    )
}