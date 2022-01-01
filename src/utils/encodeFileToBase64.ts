export async function encodeFileToBase64(targetFile: File): Promise<string> {

  const fileReader: FileReader = new FileReader();

  fileReader.readAsDataURL(targetFile);

  return new Promise<string>((resolve: (encodedFile: string) => void, reject: (error: Error) => void): void => {

    fileReader.onload = (filedHasBeenReadEvent: ProgressEvent<FileReader>): void => {

      if (filedHasBeenReadEvent.target === null || filedHasBeenReadEvent.target.result === null) {
        reject(new Error("Failed to encode the file."));
        return;
      }

      resolve(String(filedHasBeenReadEvent.target.result));
    };
  });
}
