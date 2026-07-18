import { useEffect, useMemo, useState } from "react";
import { CampusUser, Duel } from "../types";
import { createChallenge, listChallenges } from "../services/challengeService";
import { getCampusUsers } from "../services/mockUserService";

const defaultCategory = "Coding";

function useDebouncedValue<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function useStuDuelWorkflow() {
  const [duels, setDuels] = useState<Duel[]>([]);
  const [duelsLoading, setDuelsLoading] = useState(true);
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);
  const [users, setUsers] = useState<CampusUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState(defaultCategory);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    const loadChallenges = async () => {
      try {
        const items = await listChallenges();
        if (active) {
          setDuels(items);
        }
      } finally {
        if (active) {
          setDuelsLoading(false);
        }
      }
    };

    void loadChallenges();

    return () => {
      active = false;
    };
  }, []);

  const loadUsers = async () => {
    if (usersLoaded || usersLoading) {
      return;
    }

    setUsersLoading(true);

    try {
      const items = await getCampusUsers();
      setUsers(items);
      setUsersLoaded(true);
    } finally {
      setUsersLoading(false);
    }
  };

  const openChallenge = () => {
    setIsChallengeOpen(true);
    void loadUsers();
  };

  const closeChallenge = () => {
    setIsChallengeOpen(false);
    setSearchValue("");
    setSelectedUserId(null);
    setTopic("");
    setCategory(defaultCategory);
  };

  const selectedUser = useMemo(
    () => users.find((user) => user.id === selectedUserId) ?? null,
    [selectedUserId, users]
  );

  const updateSearchValue = (value: string) => {
    setSearchValue(value);
    setSelectedUserId(null);
  };

  const debouncedSearchValue = useDebouncedValue(searchValue, 180);

  const filteredUsers = useMemo(() => {
    const query = normalize(debouncedSearchValue);

    if (!query) {
      return users;
    }

    return users.filter((user) => {
      const haystack = [user.username, user.studentId, user.fullName, user.department, user.year]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [debouncedSearchValue, users]);

  const selectUser = (user: CampusUser) => {
    setSelectedUserId(user.id);
    setSearchValue(user.username);
  };

  const submitChallenge = async () => {
    if (!selectedUser || !topic.trim()) {
      return false;
    }

    setSubmitting(true);

    try {
      const duel = await createChallenge({
        opponentUserId: selectedUser.id,
        topic: topic.trim(),
        category,
      });

      setDuels((current) => [duel, ...current]);
      closeChallenge();
      return true;
    } finally {
      setSubmitting(false);
    }
  };

  const accept = (id: number) => setDuels((current) => current.map((duel) => (duel.id === id ? { ...duel, status: "active" as const, endsIn: "2h 0m" } : duel)));
  const decline = (id: number) => setDuels((current) => current.filter((duel) => duel.id !== id));

  return {
    duels,
    duelsLoading,
    isChallengeOpen,
    openChallenge,
    closeChallenge,
    usersLoading,
    filteredUsers,
    searchValue,
    updateSearchValue,
    selectedUser,
    selectUser,
    topic,
    setTopic,
    category,
    setCategory,
    submitting,
    submitChallenge,
    accept,
    decline,
  };
}
