import { useCallback, useState } from "react";

export const useUploader = ({
  upload,
  onUploaded,
  onError,
  onEnded,
}: {
  upload: (file: File) => Promise<void>;
  onUploaded?: () => void;
  onError?: (error: Error) => void;
  onEnded?: () => void;
}) => {
  const [uploading, setUploading] = useState<boolean>();
  const [error, setError] = useState<Error | undefined>(undefined);

  const handleFileChange = useCallback(
    async (file: File) => {
      setUploading(true);
      setError(undefined);

      try {
        await upload(file);

        if (onUploaded) {
          onUploaded();
        }
      } catch (_error) {
        const error =
          _error instanceof Error
            ? _error
            : new Error("Unexpected upload error.");

        setError(error);

        if (onError) {
          onError(error);
        }
      } finally {
        setUploading(false);

        if (onEnded) {
          onEnded();
        }
      }
    },
    [onEnded, onError, upload, onUploaded]
  );

  return {
    handleFileChange,
    uploading,
    error,
  };
};
