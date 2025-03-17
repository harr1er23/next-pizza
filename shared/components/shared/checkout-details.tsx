import { cn } from "@/shared/lib/utils";
import { Skeleton } from "../ui";

interface Props {
    loading?: boolean;
    title?: React.ReactNode;
    value?: string;
    className?: string;
}

export const CheckoutDetails: React.FC<Props> = ({ title, loading, value, className }) => {
    return (
        <div className={cn('flex my-4', className)}>
            <span className="flex flex-1 text-lg text-neutral-500">
                {title}
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
            </span>
            {!loading ? <span className="font-bold text-lg">{value}</span> :  <Skeleton className="w-14 h-5" />}
        </div>
    )
}