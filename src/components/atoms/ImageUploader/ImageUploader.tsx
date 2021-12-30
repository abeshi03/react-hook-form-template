// - フレームワーク =======================================================================================================
import React, { memo, VFC } from "react";

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


export const ImageUploader: VFC<Props> = memo((props) => {

  const {
    label,
    required,
    guidance,
    disabled,
    defaultValue,
    accept,
    maximalImagesCount,
    minimalImagesCount = 0,
    inputProps
  } = props;

  const isMultipleFiles = (): boolean => {
    return isUndefined(maximalImagesCount) || maximalImagesCount > 1;
  }

  return (
    <>
      <div className={styles.labelAndRequiredBadge}>
        {label && <label htmlFor={label} className={styles.label}>{label}</label>}
        {required && <span className={styles.requiredBadge}>必須</span>}
      </div>
      <div className={styles.imageUploaderButtonComposition}>

        <div className={styles.uploadButton} role="button">
          <div className={styles.icon}>
            <ImageAddingIcon/>
          </div>
          <p className={styles.uploadGuidance}>画像をアップロードしてください</p>
          <input
            { ...inputProps }
            className={styles.imageUploader}
            type="file"
            defaultValue={defaultValue}
            accept={accept}
            multiple={isMultipleFiles()}
            disabled={disabled}
          />
        {guidance && <p className={styles.guidance}>{guidance}</p>}
        </div>
      </div>
    </>
  );
});
