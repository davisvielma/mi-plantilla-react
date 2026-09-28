import { ChevronDown, LogOut, type LucideIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fullNameFormat } from "@/lib/user-formatter";
import type { User } from "@/types/user";
import { UserAvatar } from "./UserAvatar";

interface Props {
	user: User | null;
	items: {
		label: string;
		href: string;
		icon: LucideIcon;
	}[];
	onLogout: () => void | Promise<void>;
}

export const UserMenu = ({ user, items, onLogout }: Props) => (
	<DropdownMenu>
		<DropdownMenuTrigger
			render={
				<Button
					variant="ghost"
					className="h-auto gap-2 rounded-lg px-2 py-1.5 hover:bg-accent"
				/>
			}
		>
			<UserAvatar user={user} />
			<ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end" className="w-56">
			<DropdownMenuGroup>
				<DropdownMenuLabel>
					<div className="flex flex-col gap-1">
						<span className="text-sm font-medium">{fullNameFormat(user)}</span>
						<span className="text-xs text-muted-foreground">{user?.email}</span>
					</div>
				</DropdownMenuLabel>
				{items.map((item) => (
					<DropdownMenuItem
						key={item.href}
						render={<Link to={item.href} />}
						className="cursor-pointer"
					>
						<item.icon className="mr-1 h-4 w-4" />
						{item.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuGroup>
			<DropdownMenuSeparator />
			<DropdownMenuItem
				onClick={onLogout}
				className="cursor-pointer text-destructive focus:text-destructive"
			>
				<LogOut className="mr-1 h-4 w-4" />
				Cerrar sesión
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
);
