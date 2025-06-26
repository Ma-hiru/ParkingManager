interface LoginFormPassword {
  username: string;
  password: string;
}

interface LoginFormEmail {
  email: string;
  code: string;
}

interface UserProfile extends Omit<LoginFormPassword, "password">, Omit<LoginFormEmail, "code"> {
  token: string;
  avatar: string;
  userId: number;
}

interface LoginResponse extends Omit<UserProfile, "avatar"> {
  profilePicture: string;
  phone: string;
  name: string;
}
