import { useProcessContext } from "../context/ProcessContext";

export function useProcessManager() {
  return useProcessContext();
}

export default useProcessManager;
