import axios from "axios";

export const handleRequest = async <T>(
  request: Promise<T>,
  setError: (msg: string | null) => void,
  setLoading?: (value: boolean) => void
): Promise<T | null> => {
  try {
    setLoading && setLoading(true);
    return await request;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      setError(
        err.response?.data?.error ??
        err.response?.data?.message ??
        err.message
      );
    } else if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Unknown error");
    }

    return null; // Return null so the hook knows not to proceed
  } finally {
    setLoading && setLoading(false);
  }
};