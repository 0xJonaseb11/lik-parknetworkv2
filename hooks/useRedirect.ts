import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useRedirect(pathname: string) {
    const router = useRouter();

    useEffect(() => {
        router.push(pathname)
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
}