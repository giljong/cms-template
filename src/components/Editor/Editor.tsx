import React, { useCallback, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type Props = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

const Image = Quill.import('formats/image');
Image.className = 'img-width-100';
Quill.register(Image, true);

export function Editor({ state, setState }: Props) {
  const quillRef = useRef<ReactQuill>();

  // 이미지 업로드 있을 경우 사용
  const handleImage = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    // input.addEventListener('change', async () => {
    //   const file = input.files?.length ? input.files[0] : null;
    //   if (file) {
    //     await uploadNoticeImage({
    //       variables: {
    //         file,
    //       },
    //     });
    //   }
    // });
  }, []);

  const modules = {
    toolbar: {
      // 툴바에 넣을 기능들을 순서대로 나열하면 된다.
      container: [
        [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
          { align: [] },
        ],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image: handleImage,
      },
    },
  };

  // 이미지 업로드 있을 시 사용
  // const [uploadNoticeImage] = useMutation<
  //   UploadNoticeImageResponse,
  //   UploadNoticeImageParams
  // >(UPLOAD_NOTICE_IMAGE, {
  //   onCompleted: (data) => {
  //     const IMG_URL = `${process.env.REACT_APP_NOTICE_IMAGE_URL}/${data.uploadNoticeImage}`;
  //     const range = quillRef.current?.getEditor().getSelection()?.index ?? 0;
  //     if (range > -1) {
  //       let quill = quillRef.current?.getEditor();
  //       quill?.setSelection(range, 1);

  //       quill?.clipboard.dangerouslyPasteHTML(
  //         range,
  //         `<p class="ql-align-center"><img src=${IMG_URL} alt="이미지 태그가 삽입됩니다." /></p>`,
  //       );
  //     }
  //   },
  //   onError: (e) => {
  //     notification.error({ message: e.message });
  //   },
  // });

  return (
    <ReactQuill
      ref={(element) => {
        if (element !== null) {
          quillRef.current = element;
        }
      }}
      modules={modules}
      style={{
        width: '100%',
        height: '300px',
      }}
      value={state}
      onChange={setState}
    />
  );
}
