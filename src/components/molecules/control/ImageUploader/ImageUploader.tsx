// - ライブラリー =========================================================================================================
import React, { memo, useState, VFC } from "react";
import { useDropzone } from "react-dropzone";
import { storage } from "../../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// - グローバルstate =====================================================================================================
import { useDispatch } from "react-redux";
import { displayFloatingNotificationBar } from "../../../../features/floatingNotificationBar/floatingNotificationBarSlice";

// - アセット ============================================================================================================
import styles from "./ImageUploader.module.scss";
import { ImageAddingIcon } from "../../../../assets/icons/ImageAddingIcon";
import { ImageDeletingIcon } from "../../../../assets/icons/ImageDeletingIcon";

// - 子コンポーネント =====================================================================================================
import { InputLabel } from "../../../atoms/InputLabel/InputLabel";

// - 補助関数 ============================================================================================================
import { isUndefined } from "../../../../utils/isUndefined";
import { isNotUndefined } from "../../../../utils/isNotUndefined";
import { isNull } from "../../../../utils/isNull";


type Props = {
  label?: string;
  required: boolean;
  guidance?: string;
  disabled?: boolean;
  defaultValue?: string;
  accept?: string;
  supportedImagesFileExtensions: string[];
  saveStorageDirectory: string;
  maximalImagesCount?: number;
  minimalImagesCount?: number;
  inputProps: React.HTMLAttributes<HTMLInputElement>;
}


const getImageUploadGuidance = (maximalImagesCount: number | undefined): string => {

  if (isUndefined(maximalImagesCount)) {
    return "画像をアップロードしてください(ドラック&ドロップ可)";
  }

  if (maximalImagesCount === 1) {
    return `画像を${maximalImagesCount}枚アップロードしてください(ドラック&ドロップ可)`;
  }

  return `画像を${maximalImagesCount}枚までアップロードしてください(ドラック&ドロップ可)`;
}

const isMultipleFiles = (maximalImagesCount: number | undefined): boolean => {
  return isUndefined(maximalImagesCount) || maximalImagesCount > 1;
}


export const ImageUploader: VFC<Props> = memo((props) => {

  const {
    label,
    required,
    guidance,
    disabled,
    defaultValue,
    accept,
    supportedImagesFileExtensions,
    saveStorageDirectory,
    maximalImagesCount,
    inputProps
  } = props;


  const dispatch = useDispatch();

  const [ isDisplayOverlay, setIsDisplayOverlay ] = useState(false);
  const [ imagesURI, setImagesURI ] = useState<string[]>([]);


  // - 画像選択時の処理(ドラッグ&ドロップ可) =================================================================================
  const onDrop = async (acceptedFiles: File[]): Promise<void> => {

    if (acceptedFiles.length === 0) return;

    const file: File = acceptedFiles[0];

    if (isNull(file)) {
      dispatch(displayFloatingNotificationBar({
        notification: {
          type: "ERROR",
          message: "アップロードに失敗いたしました。再度お試しください。"
        }
      }))
      return;
    }

    const isDisallowedFileType: boolean = !new RegExp(
      `^[^.]+?.(?<filenameExtension>${supportedImagesFileExtensions.join("|")})$`, "ui"
    ).test(file.name);

    if (isDisallowedFileType) {
      dispatch(displayFloatingNotificationBar({
        notification: {
          type: "ERROR",
          message: `アップロードの画像の拡張子が許可されておりません。${supportedImagesFileExtensions.join(", ")}が選択可能です。`
        }
      }));
      return
    }


    if (isNotUndefined(maximalImagesCount) && maximalImagesCount <= imagesURI.length) {
      dispatch(displayFloatingNotificationBar({
        notification: {
          type: "ERROR",
          message: `画像は${maximalImagesCount}枚のみ選択可能です`
        }
      }));
      return;
    }


    setIsDisplayOverlay(true);

    const storageRef = ref(storage, `${saveStorageDirectory}/${file.name}`)

    // - 画像アップロード処理 ==============================================================================================
    try {

      await uploadBytes(storageRef, file);
      const getUploadURI: string = await getDownloadURL(ref(storage, `${saveStorageDirectory}/${file.name}`));

      setImagesURI([ ...imagesURI, getUploadURI ]);

    } catch (error: unknown) {

      console.log(error);
      console.log("uploadBytes, getDownloadURL: アップロード処理に失敗いたしました。")

      dispatch(displayFloatingNotificationBar({
        notification: {
          type: "ERROR",
          message: "ファイルアップロード中不具合が発生いたしました。"
        }
      }));

    } finally {

      setIsDisplayOverlay(false);
    }
  }
  const { getRootProps, getInputProps } = useDropzone({ onDrop });


  // - 画像削除処理 ======================================================================================================
  const deleteImage = (targetImageIndex: number): void => {
    setImagesURI(prevArray => prevArray.splice(targetImageIndex, 1));
  }


  return (
    <>
      <InputLabel
        required={required}
        label={label}
      />

      <div className={styles.imageUploadArea} {...getRootProps()}>

        <div className={styles.uploadButton} role="button">
          <div className={styles.icon}>
            <ImageAddingIcon/>
          </div>
          <p className={styles.uploadGuidance}>{getImageUploadGuidance(maximalImagesCount)}</p>

          {/*labelでinputを囲って全体をクリックできるようにしている*/}
          <label className={styles.inputClickFlag}>
            <input
              { ...inputProps }
              {...getInputProps()}
              className={styles.inputFiles}
              type="file"
              defaultValue={defaultValue}
              accept={accept}
              multiple={isMultipleFiles(maximalImagesCount)}
              disabled={disabled}
            />
          </label>

          {/*ローディング処理 ================================================ */}
          {isDisplayOverlay &&
            <div className={styles.blockingLoadingOverlay}>
              <div className={styles.loadingIndicator}></div>
            </div>
          }
        </div>
      </div>

      {imagesURI.length > 0 &&
        <div className={styles.uploadImagesFlow}>
          {imagesURI.map((imageFileURI: string, index: number) => (
            <div
              className={styles.uploadedImageThumbnail}
              key={`UPLOAD_IMAGE-${index}`}
              style={{backgroundImage: `url(${imageFileURI})`}}
              role="img"
            >
              <div
                className={styles.deleteButton}
                role="button"
                aria-label="画像を削除する"
                onClick={() => deleteImage(index)}
              >
                <ImageDeletingIcon/>
              </div>
            </div>
          ))}
        </div>
      }

      {guidance && <p className={styles.guidance}>{guidance}</p>}
    </>
  );
});
