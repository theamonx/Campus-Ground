// resources/js/hooks/use-auth.ts
import { usePage } from "@inertiajs/react";
export function useAuth() {
    const { auth } = usePage<{ auth: Auth }>().props;
    return { user: auth.user, /* ... */ };
}
