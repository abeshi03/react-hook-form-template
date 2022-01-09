## react-hook-formのcomponent-template

### inputField
- [InputField](src/components/molecules/control/InputField)

- 使用例

```tsx
<InputField
    type="email"
    required={userValidations.email.required}
    label="メールアドレス"
    placeholder="メールアドレスを入力してください"
    inputProps={register("email",{
      required: userValidations.email.required,
      pattern: userValidations.email.regexp
    })}
    autoComplete="email"
/>
{errors.email && emailErrorMessages(errors.email)}
```

### textarea
- [Textarea](src/components/molecules/control/Textarea)

- 使用例

```tsx
<Textarea
  rows={10}
  required={postValidations.description.required}
  label="投稿内容"
  placeholder="投稿を入力してください"
  inputProps={register("description", {
    required: postValidations.description.required,
    minLength: postValidations.description.minLength,
    maxLength: postValidations.description.maxLength,
  })}
/>
{errors.description && descriptionErrorMessage(errors.description)}
```


### imageUploader
- [ImageUploader](src/components/molecules/control/ImageUploader)

- 使用例

```tsx
<ImageUploader
  label="画像"
  required={postValidations.image.required}
  accept={postValidations.image.accept}
  saveStorageDirectory={imageUploadedStorage.posts}
  supportedImagesFileExtensions={postValidations.image.supportedImagesFileExtensions}
  maximalImagesCount={postValidations.image.maximalImagesCount}
  inputProps={register("image", {
    required: postValidations.image.required
  })}
/>
{errors.image && imageErrorMessage(errors.image)}
```

### selectField

- react-selectを使用
- [react-selectとreact-hook-formの組み合わせ](src/components/organism/controlGroup/SignUpControlGroup/SignUpControlGroup.tsx)

- 使用例

```tsx
<Controller
  control={control}
  name="gender"
  rules={{ required: userValidations.gender.required }}
  render={({ field: { onChange, onBlur, ref } }) => (
    <Select
      placeholder="性別を選択"
      options={getGendersSelectOptions()}
      theme={selectCustomTheme}
      styles={selectCustomStyles}
      onBlur={onBlur}
      ref={ref}
      onChange={onChange}
    />
  )}
/>
{errors.gender && genderErrorMessages(errors.gender)}
```


### error-message-template

[error-message-files](src/config/validations/userValidations.tsx)
