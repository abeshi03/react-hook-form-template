// - ライブラリー =========================================================================================================
import React, {memo, useEffect, useState, VFC} from "react";
import { useDropzone } from "react-dropzone";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// - グローバルstate =====================================================================================================
import { useDispatch } from "react-redux";
import { displayFloatingNotificationBar } from "../../../features/floatingNotificationBar/floatingNotificationBarSlice";

// - アセット ============================================================================================================
import styles from "./ImageUploader.module.scss";
import { ImageAddingIcon } from "../../../assets/icons/ImageAddingIcon";

// - 補助関数 ============================================================================================================
import { isUndefined } from "../../../utils/isUndefined";
import { isNull } from "../../../utils/isNull";

type Props = {
  label?: string;
  required: boolean;
  guidance?: string;
  disabled?: boolean;
  defaultValue?: string;
  accept?: string;
  supportedImagesFileExtensions: string[];
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
    maximalImagesCount,
    inputProps
  } = props;


  const dispatch = useDispatch();

  const [ isDisplayOverlay, setIsDisplayOverlay ] = useState(false);
  const [ imagesURI, setImagesURI ] = useState<string[]>([]);


  const onDrop = async (acceptedFiles: File[]): Promise<void> => {

    if (acceptedFiles.length === 0) return;

    let file: File = acceptedFiles[0];

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
      return;
    }

    setIsDisplayOverlay(true);

    const storageRef = ref(storage, `posts/${file.name}`)

    // - 画像アップロード処理 ==============================================================================================
    await uploadBytes(storageRef, file)
      .then(() => {
        console.log("成功しました")

        // - アップロードした画像URIの取得処理
        getDownloadURL(ref(storage, `posts/${file.name}`))
          .then((imageURI: string) => {
            setImagesURI([...imagesURI, imageURI ])
          })
          .catch((error: unknown) => {
            console.log(error);
            console.log("画像の取得に失敗しました")

            dispatch(displayFloatingNotificationBar({
              notification: {
                type: "ERROR",
                message: "ファイルアップロード中不具合が発生いたしました。"
              }
            }));
          })
      })
      .catch((error: unknown) => {
        console.log(error)
        console.log("アップロードに失敗しました")
        dispatch(displayFloatingNotificationBar({
          notification: {
            type: "ERROR",
            message: "ファイルアップロード中不具合が発生いたしました。"
          }
        }));
      })
      .finally(() => {
        setIsDisplayOverlay(false);
      })
  }
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    console.log(imagesURI)
  }, [imagesURI])

  return (
    <>
      <div className={styles.labelAndRequiredBadge}>
        {label && <label htmlFor={label} className={styles.label}>{label}</label>}
        {required && <span className={styles.requiredBadge}>必須</span>}
      </div>
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
        {guidance && <p className={styles.guidance}>{guidance}</p>}
        </div>
      </div>
    </>
  );
});
