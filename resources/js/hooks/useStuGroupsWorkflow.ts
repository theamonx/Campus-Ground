import { useEffect, useMemo, useState } from "react";
import { CampusGroup, CreateGroupInput, GroupCategory, GroupJoinRequestProfile, GroupMemberProfile, GroupPrivacy } from "../types";
import { approveJoinRequest, createGroup, getGroupById, getGroupJoinRequests, getGroupMembers, joinGroup, leaveGroup, listGroups, rejectJoinRequest, requestJoinGroup } from "../services/mockGroupService";
import { currentCampusUser } from "../services/mockUserService";

const categories: GroupCategory[] = ["Academic", "Coding", "Placement", "Sports", "Gaming", "Music", "Photography", "Fitness", "Startup", "Clubs", "Others"];
const filterOptions = ["All", "Joined", "Public", "Private", "Academic", "Coding", "Placement", "Sports", "Gaming", "Music"] as const;
const recommendedInterests: GroupCategory[] = ["Academic", "Coding", "Placement", "Photography", "Music"];
const defaultCreateForm: CreateGroupInput = {
  name: "",
  description: "",
  category: "Academic",
  privacy: "public",
  coverImage: "",
};

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

export function useStuGroupsWorkflow() {
  const [groups, setGroups] = useState<CampusGroup[]>([]);
  const [groupsLoading, setGroupsLoading] = useState(true);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<CampusGroup | null>(null);
  const [groupMembers, setGroupMembers] = useState<GroupMemberProfile[]>([]);
  const [joinRequests, setJoinRequests] = useState<GroupJoinRequestProfile[]>([]);
  const [membersLoading, setMembersLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<(typeof filterOptions)[number]>("All");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState<CreateGroupInput>(defaultCreateForm);
  const [createError, setCreateError] = useState("");
  const [creating, setCreating] = useState(false);
  const [coverPreview, setCoverPreview] = useState("");
  const debouncedQuery = useDebouncedValue(query, 180);

  useEffect(() => {
    let active = true;

    const loadGroups = async () => {
      try {
        const items = await listGroups();
        if (active) {
          setGroups(items);
          setSelectedGroupId((current) => current ?? items[0]?.id ?? null);
          setSelectedGroup((current) => current ?? items[0] ?? null);
        }
      } finally {
        if (active) {
          setGroupsLoading(false);
        }
      }
    };

    void loadGroups();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedGroupId) {
      setSelectedGroup(null);
      setGroupMembers([]);
      setJoinRequests([]);
      return;
    }

    let active = true;
    setMembersLoading(true);

    const loadGroup = async () => {
      const [group, members, requests] = await Promise.all([
        getGroupById(selectedGroupId),
        getGroupMembers(selectedGroupId),
        getGroupJoinRequests(selectedGroupId),
      ]);
      if (!active) {
        return;
      }
      setSelectedGroup(group);
      setGroupMembers(members);
      setJoinRequests(requests);
      setMembersLoading(false);
    };

    void loadGroup();

    return () => {
      active = false;
    };
  }, [selectedGroupId]);

  const selectedGroupIds = useMemo(() => new Set(groups.filter((group) => group.joined).map((group) => group.id)), [groups]);

  const filteredGroups = useMemo(() => {
    const queryValue = normalize(debouncedQuery);

    return groups.filter((group) => {
      const searchHaystack = [group.name, group.description, group.category, group.ownerName, group.tags.join(" ")].join(" ").toLowerCase();
      const matchesSearch = !queryValue || searchHaystack.includes(queryValue);
      const matchesJoined = activeFilter !== "Joined" || group.joined;
      const matchesPrivacy = activeFilter !== "Public" || group.privacy === "public";
      const matchesPrivate = activeFilter !== "Private" || group.privacy === "private";
      const matchesCategory = !["Academic", "Coding", "Placement", "Sports", "Gaming", "Music"].includes(activeFilter) || group.category === activeFilter;

      return matchesSearch && matchesJoined && matchesPrivacy && matchesPrivate && matchesCategory;
    });
  }, [activeFilter, debouncedQuery, groups]);

  const recommendedGroups = useMemo(() => {
    return groups.filter((group) => !group.joined && recommendedInterests.includes(group.category)).slice(0, 3);
  }, [groups]);

  const selectGroup = (groupId: number) => {
    setSelectedGroupId(groupId);
  };

  const reloadSelectedGroup = async (groupId: number) => {
    const [group, members, requests] = await Promise.all([
      getGroupById(groupId),
      getGroupMembers(groupId),
      getGroupJoinRequests(groupId),
    ]);

    setSelectedGroup(group);
    setGroupMembers(members);
    setJoinRequests(requests);
  };

  const joinOrOpenGroup = async (group: CampusGroup) => {
    if (group.joined) {
      selectGroup(group.id);
      return;
    }

    if (group.privacy === "private") {
      const hasPendingRequest = group.joinRequests.some((request) => request.userId === currentCampusUser.id);
      if (!hasPendingRequest) {
        const updatedGroup = await requestJoinGroup(group.id);
        setGroups((current) => current.map((item) => (item.id === updatedGroup.id ? updatedGroup : item)));
        await reloadSelectedGroup(updatedGroup.id);
      }
      selectGroup(group.id);
      return;
    }

    const updatedGroup = await joinGroup(group.id);
    setGroups((current) => current.map((item) => (item.id === updatedGroup.id ? updatedGroup : item)));
    setSelectedGroup(updatedGroup);
    setSelectedGroupId(updatedGroup.id);
  };

  const leaveCurrentGroup = async (groupId: number) => {
    const updatedGroup = await leaveGroup(groupId);
    setGroups((current) => current.map((item) => (item.id === updatedGroup.id ? updatedGroup : item)));
    setSelectedGroup(updatedGroup);
    await reloadSelectedGroup(groupId);
  };

  const approveRequest = async (userId: number) => {
    if (!selectedGroupId) {
      return;
    }

    const updatedGroup = await approveJoinRequest(selectedGroupId, userId);
    setGroups((current) => current.map((item) => (item.id === updatedGroup.id ? updatedGroup : item)));
    await reloadSelectedGroup(selectedGroupId);
  };

  const rejectRequest = async (userId: number) => {
    if (!selectedGroupId) {
      return;
    }

    const updatedGroup = await rejectJoinRequest(selectedGroupId, userId);
    setGroups((current) => current.map((item) => (item.id === updatedGroup.id ? updatedGroup : item)));
    await reloadSelectedGroup(selectedGroupId);
  };

  const openCreateModal = () => {
    setCreateForm(defaultCreateForm);
    setCreateError("");
    setCoverPreview("");
    setIsCreateOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateOpen(false);
    setCreateError("");
    setCreateForm(defaultCreateForm);
    setCoverPreview("");
  };

  const updateCreateForm = (next: Partial<CreateGroupInput>) => {
    setCreateForm((current) => ({ ...current, ...next }));
  };

  const submitCreateGroup = async () => {
    const name = createForm.name.trim();
    if (!name || !createForm.category || !createForm.privacy) {
      setCreateError("Group name, category, and privacy are required.");
      return false;
    }

    setCreating(true);
    setCreateError("");

    try {
      const created = await createGroup({
        ...createForm,
        name,
        description: createForm.description.trim(),
        coverImage: coverPreview || createForm.coverImage,
      });

      setGroups((current) => [created, ...current]);
      setSelectedGroup(created);
      setSelectedGroupId(created.id);
      closeCreateModal();
      return true;
    } catch (error) {
      setCreateError(error instanceof Error ? error.message : "Unable to create group.");
      return false;
    } finally {
      setCreating(false);
    }
  };

  const refreshGroups = async () => {
    const items = await listGroups();
    setGroups(items);
  };

  return {
    groups,
    groupsLoading,
    selectedGroup,
    groupMembers,
    joinRequests,
    membersLoading,
    selectedGroupIds,
    filteredGroups,
    recommendedGroups,
    query,
    setQuery,
    activeFilter,
    setActiveFilter,
    filterOptions,
    selectedGroupId,
    selectGroup,
    joinOrOpenGroup,
    leaveCurrentGroup,
    approveRequest,
    rejectRequest,
    isCreateOpen,
    openCreateModal,
    closeCreateModal,
    createForm,
    updateCreateForm,
    createError,
    creating,
    submitCreateGroup,
    coverPreview,
    setCoverPreview,
    categories,
    refreshGroups,
  };
}
