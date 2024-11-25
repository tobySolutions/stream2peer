import { ProjectDetails } from "./types";
import { create } from "zustand";

interface Stream2PeerState {
  projectsData: ProjectDetails[];
  loading: boolean;
  liveStreamData: any[];
  currentStream: any;
  setProjectData: (data: ProjectDetails[]) => void;
  setLoading: (loading: boolean) => void;
  setLiveStreamData: (data: any[]) => void;
  setCurrentStream: (data: any) => void;
}

export const useAppStore = create<Stream2PeerState>((set) => ({
  projectsData: [],
  loading: false,
  liveStreamData: [],
  currentStream: {},

  setProjectData: (data) => set(() => ({ projectsData: data })),
  setLoading: (loading) => set(() => ({ loading })),
  setLiveStreamData: (data) => set(() => ({ liveStreamData: data })),
  setCurrentStream: (data) => set(() => ({ currentStream: data })),
}));
