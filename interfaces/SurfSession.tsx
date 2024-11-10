import User from "./User";

interface Session {
  id: number;
  title: string;
  description: string;
  date: string;
  spot: string;
  level: string;
  user: User;
  image: string;
}

export default Session;
