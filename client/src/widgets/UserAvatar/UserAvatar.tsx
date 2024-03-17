import { User } from "@/shared/types/user";
import { Avatar } from "@mui/joy";

interface UserAvatar {
  className?: string;
  user: User | null;
}

export const UserAvatar = ({ className, user }: UserAvatar) => {
  return (
    <>
      {user && user.info.photo && (
        <Avatar
          src={user.info.photo}
          className={className}
          variant="outlined"
        />
      )}

      {user && !user.info.photo && (
        <Avatar className={className} variant="solid">
          {user.info.firstName[0]}
        </Avatar>
      )}

      {!user && (
        <Avatar variant="solid" color="neutral" className={className} />
      )}
    </>
  );
};
