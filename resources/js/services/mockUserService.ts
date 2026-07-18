import { CampusUser } from "../types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const campusUsers: CampusUser[] = [
  { id: 1, username: "ananya.sharma", studentId: "CS21001", fullName: "Ananya Sharma", department: "Computer Science", year: "3rd Year", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&auto=format" },
  { id: 2, username: "rohan.mehta", studentId: "CS21002", fullName: "Rohan Mehta", department: "Computer Science", year: "3rd Year", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop&auto=format" },
  { id: 3, username: "priya.nair", studentId: "CS21003", fullName: "Priya Nair", department: "Information Technology", year: "2nd Year", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&auto=format" },
  { id: 4, username: "aditya.verma", studentId: "CS21004", fullName: "Aditya Verma", department: "Computer Science", year: "4th Year", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&auto=format" },
  { id: 5, username: "sneha.pillai", studentId: "CS21005", fullName: "Sneha Pillai", department: "Design & Multimedia", year: "2nd Year", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&auto=format" },
  { id: 6, username: "karan.singh", studentId: "CS21006", fullName: "Karan Singh", department: "Computer Science", year: "3rd Year", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&auto=format" },
  { id: 7, username: "meera.joshi", studentId: "CS21007", fullName: "Meera Joshi", department: "Electronics", year: "4th Year", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&auto=format" },
  { id: 8, username: "dev.patel", studentId: "CS21008", fullName: "Dev Patel", department: "Computer Science", year: "2nd Year", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&auto=format" },
  { id: 9, username: "faiz.khan", studentId: "ME22011", fullName: "Faiz Khan", department: "Mechanical Engineering", year: "3rd Year", avatar: null },
  { id: 10, username: "anya.rao", studentId: "EC22019", fullName: "Anya Rao", department: "Electronics", year: "1st Year" },
  { id: 11, username: "tanvi.garg", studentId: "CE23007", fullName: "Tanvi Garg", department: "Civil Engineering", year: "2nd Year", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&auto=format" },
  { id: 12, username: "arjun.iyer", studentId: "CS22021", fullName: "Arjun Iyer", department: "Computer Science", year: "4th Year", avatar: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=120&h=120&fit=crop&auto=format" },
];

export const currentCampusUser: CampusUser = campusUsers[0];

export async function getCampusUsers() {
  await delay(650);
  return campusUsers.map((user) => ({ ...user }));
}

export async function getCampusUserById(userId: number) {
  await delay(250);
  return campusUsers.find((user) => user.id === userId) ?? null;
}

export async function getCurrentCampusUser() {
  await delay(120);
  return { ...currentCampusUser };
}
