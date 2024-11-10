import User from "./User";
interface Session {
  id: number;
  title: string;
  location: string;
  date: string;
  description: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  max_participants: number;
  level_required: string;
  status: "open" | "closed";
  wave_height: number;
  meeting_point: string;
  user: User;
}

export default Session;
