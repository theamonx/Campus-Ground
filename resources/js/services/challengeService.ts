import { duels as seedDuels } from "../data/mockData";
import { CreateChallengeInput, Duel } from "../types";
import { getCampusUserById } from "./mockUserService";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const challengerAvatar = "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&auto=format";

let duelStore: Duel[] = seedDuels.map((duel) => ({ ...duel }));

export async function listChallenges() {
  await delay(350);
  return duelStore.map((duel) => ({ ...duel }));
}

export async function createChallenge(input: CreateChallengeInput) {
  await delay(500);

  const opponent = await getCampusUserById(input.opponentUserId);

  if (!opponent) {
    throw new Error("Selected student could not be found.");
  }

  const duel: Duel = {
    id: Date.now(),
    challenger: "You",
    challengerAvatar,
    challengerId: 0,
    opponent: opponent.fullName,
    opponentAvatar: opponent.avatar ?? "",
    opponentId: opponent.id,
    topic: input.topic,
    category: input.category,
    status: "pending",
    votes: [0, 0],
  };

  duelStore = [duel, ...duelStore];

  return { ...duel };
}
