import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initialsFullName } from "@/lib/user-formatter";
import { cn } from "@/lib/utils";
import type { User } from "@/types/user";

interface Props {
	user: User | null;
	imageUrl?: string;
	className?: string;
}

export const UserAvatar = ({ user, imageUrl, className }: Props) => (
	<Avatar className={cn("size-8", className)}>
		<AvatarImage src={imageUrl} alt={user?.fullName || user?.email || ""} />
		<AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
			{initialsFullName(user)}
		</AvatarFallback>
	</Avatar>
);
