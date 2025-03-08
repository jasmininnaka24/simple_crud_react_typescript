import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface UserDataType {
  id: number;
  name: string;
  age: number;
  isMarried: boolean;
}

interface UserContextType {
  users: UserDataType[] | undefined;
  setUsers: React.Dispatch<React.SetStateAction<UserDataType[]>>;
  fetchUsers: () => void;
  addUser: (user: UserDataType) => void;
  updateUser: (id: number, user: UserDataType) => void;
  deleteUser: (id: number) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = useQueryClient();

  // Fetch Users
  const { data: users, refetch: fetchUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("/api");
      return response.data;
    },
  });

  // Add User Mutation
  const addUserMutation = useMutation({
    mutationFn: async (user: UserDataType) => {
      const response = await axios.post("/api", user, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Update User Mutation (Fixed Parameter Issue)
  const updateUserMutation = useMutation({
    mutationFn: async ({ id, user }: { id: number; user: UserDataType }) => {
      const response = await axios.put(`/api/${id}`, user, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Delete User Mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`/api/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers: () => {}, // Placeholder, since React Query manages state
        fetchUsers,
        addUser: addUserMutation.mutate,
        updateUser: (id: number, user: UserDataType) =>
          updateUserMutation.mutate({ id, user }), // Fixed function signature
        deleteUser: deleteUserMutation.mutate,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
