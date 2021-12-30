// - ライブラリー =========================================================================================================
import React, {memo, useCallback, VFC} from "react";
import { useDropzone } from "react-dropzone";

// - アセット ============================================================================================================
import styles from "./ImageUploader.module.scss";
import { ImageAddingIcon } from "../../../assets/icons/ImageAddingIcon";

// - 補助関数 ============================================================================================================
import isUndefined from "../../../utils/isUndefined";

type Props = {
  label?: string;
  required: boolean;
  guidance?: string;
  disabled?: boolean;
  defaultValue?: string;
  accept?: string;
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
    maximalImagesCount,
    inputProps
  } = props;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    console.log(file);
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })


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

        {guidance && <p className={styles.guidance}>{guidance}</p>}
        </div>
      </div>
    </>
  );
});
