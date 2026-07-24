// resources/js/components/user-avatar.tsx

import { User } from '@/types';

export function UserAvatar({ user, size = 40 }: { user: User; size?: number }) {
    if (user.avatar_url) {
        return (
            <img
                src={user.avatar_url}
                alt={user.name}
                className="rounded-full object-cover"
                style={{ width: size, height: size }}
            />
        );
    }

    const initials = user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div
            className="flex items-center justify-center rounded-full bg-neutral-200 text-neutral-700 font-medium dark:bg-neutral-700 dark:text-neutral-200"
            style={{ width: size, height: size }}
        >
            {initials}
        </div>
    );
}
